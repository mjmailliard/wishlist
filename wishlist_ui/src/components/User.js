import React, { Component } from 'react';
import Layout from './Layout';
class User extends Component {
    render() {
      return (
          <Layout>
        <div>
  
  <p>User Page</p>
  <ul>
      <li>view acct info</li>
      <li>change acct info</li>  
      <li>Delete acct</li>
      <li>create list</li>
      <li>View lists</li>
      <li>select list</li>
      <li>edit list</li>
      <li>logout</li>
  </ul>
        </div>
       </Layout> 
      );
    }
  }

export default User;