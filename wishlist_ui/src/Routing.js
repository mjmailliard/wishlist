import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Welcome  from './components/Welcome';
import  Admin  from './components/Admin';
import  User  from './components/User';
import Login from "./components/Login";
import Signup from "./components/Signup";

function Routing(){

return (

    <Router>
        <Switch>
   
        <Route exact path="/" component={Welcome} />
        <Route path="/admin" component={Admin} />
        <Route path="/user" component={User} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
     </Switch>
    </Router>
)
}


export default Routing;

