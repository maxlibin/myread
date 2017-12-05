import React from 'react'
import {Route} from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"

import './App.css'

const App = () => (
  <div className="app">
    <Route exact path="/" component={Home}/>
    <Route path="/search" component={Search}/>
  </div>
);

export default App
