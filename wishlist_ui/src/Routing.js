import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Welcome  from './components/Welcome';
import  Admin  from './components/Admin';
import  User  from './components/User';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import NewList from "./components/NewList";
import EditList from "./components/EditList";

function Routing(){

return (

    <Router>
        <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/admin" component={Admin} />
        <Route path="/user" component={User} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={Profile} />
        <Route path="/newlist" component={NewList} />
        <Route path="/editlist" component={EditList} />
     </Switch>
    </Router>
)
}


export default Routing;

