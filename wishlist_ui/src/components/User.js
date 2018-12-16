import React, { Component } from 'react';
import Layout from './Layout';

let db_user = 'not yet';
// let db_lists = ['declared']

class User extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        name: '',
        _id: this.props.location.state.state.db_id,
        lists: []

      };   
  }

  componentDidMount() {
  // retrieve user info by {_id: }
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
       email: db_user.email,
       
     },()=>{

     })
   
    })
  // retrieve user lists by {owner: }
  fetch(`http://localhost:3050/lists/${this.state._id}`, {
    headers: {"Content-Type":"application/json" }})
    .then(results => {
     return results.json() 
    })
    .then((data) => {
      this.setState({lists: data})

    })
    
  }


    render() {
let lists = this.state.lists
// let listItems = this.state.lists.listItems
      return (
          <Layout>
        <div>
 
 
  <label>Welcome{' ' + this.state.name}! <br/>
        
        Email: {this.state.email} 
  </label>
    
{lists.map(list => (
  <div key={list.name}> 
  {/* rewrite this to capture the unique list id as the key */}
    <table>
      <tbody>
      <tr>
       <td>{list.name}</td><td>-</td><td><label>{list.description} </label></td>
      </tr>
      <tr>
       <td colSpan="3"></td>
      </tr>
      </tbody>
    </table>
  </div>
))}

  
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