import React, { Component } from 'react'
import Input from './Input.js'

// example transactions
//  open = {
//   "name":"Bob",
//   "imageUrl":"www.sampleimage.com",
//   "status" : "Open",
//   "price" : "5.00",
//   "transaction": { }
// }

//  accepted = {
//   "name":"Bob",
//   "imageUrl":"www.sampleimage.com",
//   "status" : "Accepted",
//   "price" : "5.00",
//   "transaction": { }
// }

//  sold = {
//   "name":"Bob",
//   "imageUrl":"www.sampleimage.com",
//   "status" : "Sold",
//   "price" : "5.00",
//   "transaction": {
//     "buyerName" : "Jim",
//     "salePrice" : "3.50"
//     }
// }

function Buyer(props){
  if(props.filter === "Accepted"){ //if we are displaying an accepted status, then we allow edit of buyer and price
    return(
      <div className="field-group">
        <Input name={"buyerName"+props.id} /* name field of input control must be unique */
          field="buyerName" /* key into transaction object */
          field_type="field__buyer-name"
          label="Buyer&nbsp;:"
          text={props.sale.buyerName}/* editable content of the input */
          placeholder="Buyer Name"
          update={(t) => this.setState(t)} 
          {...props}/>
        <Input name={"salePrice"+props.id} 
          field="salePrice" /* key into transaction object */
          field_type="field__sale-price"
          label="Price&nbsp;:"
          text={props.sale.salePrice}
          placeholder="Sale Price"
          {...props}/>
      </div>
    ) // only show a Buyer footer if we have buyer data
  }else if(props.sale.transaction && props.sale.transaction.buyerName){
    return(
      <div>
        <span className="thumbnail__caption">Buyer : {props.sale.transaction.buyerName}</span>
        <span className="thumbnail__price">{props.sale.transaction.salePrice}    
          {props.button_label === "" ? "" : <button className="thumbnail__accept">{props.button_label}</button>}
        </span>
      </div>
    )
  }else return ""
}

function Seller(props){
  return(
    <div>
      <span className="thumbnail__caption">Seller : {props.sale.name}</span>
      <span className="thumbnail__price">{props.sale.price}    
      </span>
    </div>
  )
}

function Footer(props){
  return(
    <div className="thumbnail__footer">
      <Seller {...props}/>
      <Buyer {...props} />
    </div>
  )
}


export default class Transaction extends Component {
  constructor(props) {
    super(props);
    //state for Input text input control
    //use state to store status so the Accept/Sell button can update state
    this.state = {
      status: this.props.sale.status,
      transaction: {
        buyerName: "",
        salePrice: ""
      }
    }
  }


  outputSale(sale){
    let outputObj = Object.assign({}, sale); //clone obj because we need to remove the id
    delete outputObj.id
    console.log(JSON.stringify(outputObj)); // *** this is the challenge required output ***
  }

  //called when Accept/Sell button is clicked
  confirm(){
    //update transaction state
    //TODO UPDATE new state to server
    //for now we can console.log the new state
    let sale = Object.assign({}, this.props.sale, {status: this.props.nextStatus}); //make a new object with new status
    if(this.state.transaction.buyerName) //only add transaction if we have data for it
      Object.assign(sale.transaction, this.state.transaction);
    this.outputSale(sale);
    this.props.confirm(sale); //update display list with new sale state
  }

  render() {
    //TODO normally we would trust the storage to only send us transactions that should be displayed
    //TODO do we need to show a placeholder img if the imageUrl is invalid?
      return(
        <div className={"thumbnail"}>
          <div className="thumbnail__content">
            <img src={`${this.props.sale.imageUrl}`} alt="" /* I'd like to give the alt something more useful */
            />
            {
              this.props.button_label === "" ? "" : 
                <button className="thumbnail__confirm-button"
                onClick={() => this.confirm()} >
                {this.props.button_label}</button>
            }
          </div>
          <Footer onEnter={() => this.confirm()} /* this will bump state */
                  update={(t) => this.setState({transaction: Object.assign(this.state.transaction, t)})}
                  {...this.props}/>
        </div>
      )
  }
}
