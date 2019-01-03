import React, { Component } from 'react';

import Layout from './Layout';
import '../App.css';

class Welcome extends Component {
    render() {
      return (
        <Layout> 
        <div className="divMain">
           
          <h2>Welcome to Wishlists!</h2>
          <br/>
          <p>
          
            Sign up to keep track of everything you ever wanted!
          </p>
          <br/>
          <br/>
          <br/>
          <br/>
 
          <div className="buttonDiv">
            <a href="/signup"><button className="signUpButton">Sign Up</button></a>
            <a href="/login"><button className="loginButton">Login</button></a>
          </div>
        </div>
        </Layout> 
      );
    }
  }
export default Welcome;