import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';

import HomePage from './HomePage'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} /> 
    </Switch>
  )
}
