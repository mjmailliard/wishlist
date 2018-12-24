import React, { Component } from 'react';
import Layout from './Layout';
import '../App.css'
class Admin extends Component {
    render() {
      return (
        <Layout>
        <div>
  
  <p>Admin Page</p>
  <ul>
      <li>List all users</li>
      <li>Change users</li>
      <li>Delete users</li>
      
  </ul>
  
        </div>
        </Layout>
      );
    }
  }

export default Admin;