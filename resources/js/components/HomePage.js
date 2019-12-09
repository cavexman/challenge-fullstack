import React, { Component } from 'react'
import './App.css';

import SalesView from './SalesView'

function Header(props){
  return(
    <div className="Header">
      <img className="Header__logo" src="sw-logo-icon2x.png" alt="Snapwire"/><span className="Header__title">Snapwire</span>
    </div>
  )
}

//the control for showing active view and switching to another view
function Tab(props) {
  const isActive = props.current_tab === props.label ? "tab--active" : "tab--inactive";
  return(
    <div className={"column tab " + isActive} onClick={() => props.switchtab(props.label)}>
      <div><span className="tab__label">{props.label}</span></div>
    </div>
  )
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_tab: "Open"
    }
  }
  
  switchtab(target){
    this.setState({current_tab: target});
  }

  // TODO once I get the DB deployed I can switch to the laravel endpoint
  // `http://127.0.0.1:8000/api/transactions/Sold`
  render() {
    const views = {
      Open: {
        component: SalesView,
        endpoint: "/api/transactions/Open",
        filter: "Open",
        button_label: "Accept",
        nextStatus: "Accepted"
      },
      Accepted: {
        component: SalesView,    //react component as parent view
        endpoint: "/api/transactions/Accepted", //endpoint to load the view list
        filter: "Accepted",      //limit the view to transacations that match this status
        button_label: "Sell",    //to advance the transaction to next state, click this button
        nextStatus: "Sold"       //new state for transaction after clicking commit button
      },
      Sold: {
        component: SalesView,
        endpoint: "/api/transactions/Sold",
        filter: "Sold",
        button_label: "", //sold view has no accept/sell button
        nextStatus: "" //no button, so no new state
      },
      
    };
    const ContentClass = views[this.state.current_tab].component;
    return (
      <div>
        <Header/>

        <div className="App-main_container">

          <div className="App-tabs">
            <div className="row"> {/* create a tab for each view, use key as label text */}
              {Object.keys(views).map( e => 
                <Tab key={e} label={e} {...this.state} switchtab={(v) => this.switchtab(v)}/> /* pass in state so Tab knows which tab is active */
              )}
            </div>
          </div>

          <div className="Tab-content">
            <div>
              <ContentClass {...views[this.state.current_tab]}/>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
  
  
  
