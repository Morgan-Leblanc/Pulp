import React from 'react';
////Import Middleware////
import { Switch, Route, BrowserRouter } from "react-router-dom";
////Import CSS////
import './App.css';
///Components///
import Ludus from "./component/Ludus"
import Emperor from './component/Emperor';
import Homepage from "./component/Homepage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route exact path = "/" component={Homepage} /> 
      <Route path = "/ludus" component={Ludus} /> 
      <Route path="/emperor" component={Emperor}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
