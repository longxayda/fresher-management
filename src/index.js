/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficiacreal/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import store from "./redux/store";
import {Provider} from "react-redux";
import AttendLayout from "layouts/Attend";
import {api} from "services/api";
import LoginLayout from "pages/Login/Login";

function PrivateRoute ({children, ...rest}){
  const user = api.getCache("user")
  return (
    <Route {...rest} render ={()=>{
      return user
        ? children
        : <Redirect to ='/login'/>
    }} />
  )
}


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
          <Route path="/login" render={() => <LoginLayout />} />
          <Route path="/attend" render={() => <AttendLayout />}></Route>
        <PrivateRoute>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/trainee" render={(props) => <AdminLayout {...props} />} />
          <Route exact path="/"><Redirect to="/admin/dashboard" /></Route>
        </PrivateRoute>
        <Redirect  from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
