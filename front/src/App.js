import React from 'react';
////Import Middleware////
import { Switch, Route, BrowserRouter } from "react-router-dom";
////Import CSS////
import './App.css';
///Components///
import Homepage from "./component/Homepage"






function App() {
  return (
    <div className="App">
      <Homepage /> 
    </div>
  );
}

export default App;
