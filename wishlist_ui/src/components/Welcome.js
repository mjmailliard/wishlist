import React, { Component } from 'react';

import Layout from './Layout';
import './Welcome.css'

class Welcome extends Component {
    render() {
      return (
        <Layout> 
        <div>
           
         <h2>Welcome Page</h2>
<p>page info here</p>
<a href="/signup"><button className="signUpButton">Sign Up</button></a>
<a href="/login"><button className="loginButton">Login</button></a>

        </div>
        </Layout> 
      );
    }
  }
export default Welcome;