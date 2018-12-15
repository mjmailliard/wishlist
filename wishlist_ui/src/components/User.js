import React, { Component } from 'react';
import Layout from './Layout';

let db_user = 'not yet';
class User extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        name: '',
        _id: this.props.location.state.state.db_id,
        lists: ''
      };   
  }
  
  componentDidMount() {
  // retrieve user info by ID
    fetch(`http://localhost:3050/users/${this.state._id}`, {
      headers: {
        "Content-Type":"application/json"
      }
    }).then(results => {
     
       return results.json()
     
    }).then(data => {

    db_user = data.reduce((acc, cur) => cur, 0)
     this.setState({
       name: db_user.name,
       email: db_user.email
     },()=>{

     })
   
    })
  }

    render() {
      return (
          <Layout>
        <div>
  {/* <label>User ID: {this.props.location.state.state.db_id}</label> */}
  <label>User info: <br/>
        Name: {this.state.name} <br/>
        Email: {this.state.email} <br/>
  
  </label>
  
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