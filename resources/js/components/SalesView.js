import React, { Component } from 'react'
import axios from 'axios'
import Transaction from './Transaction'

function Loading(props){
  if(props.err)
    return (
      <div className="loading">
      <p>Make sure the transaction file is named sales.json</p>
      <p>Make sure the transaction file is in the /public directory</p>
      <p>{props.err}</p>
      </div>
    )
  else
    return <div className="loading">Loading...</div>
}

// TODO setup websocket to listen for updates to transactions
export default class SalesView extends Component {
  constructor(props) {
    super(props);
    this.state = {  // keep arrays for a local cache of transactions
      Open: [],
      Accepted: [],
      Sold: [],
      err: "", //if set then show a message instead of Transaction component
      loading: true //show a busy indicator while we wait for data load
    }
  }

  //TODO handle progressive load/pagination
  loadTransactions(){
    axios.get(`${this.props.endpoint}`, {timeout: 30000}) //30 sec timeout
    .then(res => {
      // transform/validate data
      const transactions = res.data.map((e,i) => {
        // the sample json showed url without scheme, so I should anticipate a need to add the scheme, but feels goofy since it could be http or https, etc...
        //check if url starts with http
        if(e.imageUrl.substring(0,4) !== "http")
          e.imageUrl = "http://" + e.imageUrl;
        return Object.assign({}, e, {id :  e.status + "-" + i}); //add an id to all transactions
      });
      
      this.setState({ 
        Open: transactions.filter( sale => sale.status === "Open"),
        Accepted: transactions.filter( sale => sale.status === "Accepted"),
        Sold: transactions.filter( sale => sale.status === "Sold"),
        loading: false, //don't need the busy indicator, time to show the loaded data
       });
    })
    .catch( err => {
      console.log(err);
      this.setState({err: "No transactions found: " + err.message, loading: true}); //got an err, but loading has stopped
    });
  }

  componentDidMount() {
    this.loadTransactions(); //fetch transactions when component loaded
  }

  //when you switch tabs, you might switch endpoints and want to refresh the list
  componentDidUpdate(prevProps, prevState) {
    const { endpoint } = this.props;
    if(prevProps.endpoint !== endpoint){
      this.loadTransactions();
    }

  }

  //called when Accept/Sell button is clicked
  confirm(sale){
    //TODO normally we would now make a call to the storage to update the transaction record
    //update state to force redraw which will remove this item from the current view

    this.state[this.props.filter].splice(this.state[this.props.filter].findIndex( e => e.id === sale.id), 1);
    this.state[sale.status].push(sale); //order doesn't matter so stick it on the end


    this.setState({status : sale.status}); 
  }

  render() {
    if(this.state.loading){
      return <Loading err={this.state.err}/>
    }else{
      //all the photos fit into a "row"
      //let's try a two column layout
      //TODO if we want continous scroll, we would fetch a new page of images and then we would evenly append Transactions to the end of odds/evens arrays
      //we re-filter the list at render time just to rebalance the columns
      const evens = this.state[this.props.filter].filter( (sale, i) => i%2 && sale.status === this.props.filter); //the latter test for status coherency is probably not needed anymore
      const odds = this.state[this.props.filter].filter( (sale, i) => !(i%2) && sale.status === this.props.filter);
      return (
        <div>
          <div className="photo-container">
            <div className="photo-row">
              
              <div className="photo-column">
                { odds.map( (sale,i) => 
                  <Transaction key={sale.id} 
                    confirm={(sale) => this.confirm(sale)}
                    sale={sale} 
                    {...this.props}/> /* use the id to associate the input field with this object, if this was coming from the database I'd probably have a real id to use */
                )}
              </div>
              
              <div className="photo-column">
                { evens.map( (sale, i) => 
                <Transaction key={sale.id} 
                  confirm={(sale) => this.confirm(sale)}
                  sale={sale} 
                  {...this.props}/> /* use the id to associate the input field with this object */
                )}
              </div>

            </div>
          </div>
        </div>
      )
    }
  }
}


