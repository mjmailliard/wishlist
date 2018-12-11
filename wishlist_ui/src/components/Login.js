import React, { Component } from 'react';
import Layout from './Layout';

class Login extends Component {
    render() {
      return (
        <Layout>
        <div>
  
  <p>Login Form</p>
  <p>Email here</p>
  <p>Password here</p>
  
  <a href="#"><button>Login</button></a>
  
        </div>
        </Layout>
      );
    }
  }

export default Login;