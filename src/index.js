import React from 'react';
import ReactDOM from 'react-dom';
import App from "./Component/App";
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter,Route,Switch} from "react-router-dom";


ReactDOM.render(
  <BrowserRouter>
  <App/>
  </BrowserRouter>, document.getElementById('root')
)


