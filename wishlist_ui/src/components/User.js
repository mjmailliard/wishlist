import React, { Component } from 'react';
import Layout from './Layout';
import './User.css';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
let db_user = '';


class User extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        name: '',
        _id: this.props.location.state.state.db_id,
        lists: []
      };   
  
  this.handleProfile = this.handleProfile.bind(this);
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
  

      this.setState({
        lists: data,
      
       
      })

    })
    
  }
  handleProfile(event) {
    event.preventDefault()
    history.push('/profile', {state: {_id: this.state._id}}) 
    history.go(0)
  }

  handleNewListButton(event) {
    event.preventDefault()
    history.push('/newlist', {state: {_id: this.state._id}}) 
    history.go(0)
  }
  handleEditListButton(event) {
    // event.preventDefault()
    history.push('/editlist', {state: {_id: event}} )
    history.go(0)
  }
    render() {

      let lists = this.state.lists

      return (
          <Layout>
        <div>
 
 
Welcome{' ' + this.state.name}! <br/>
<button onClick={e => this.handleNewListButton(e)}>New List</button><button onClick={this.handleProfile}>Edit Profile</button>


 
    
{ lists.map((list) => (
  <div key={list._id}> 
   
    {list.name} <button id={`${list._id}`} onClick={() => this.handleEditListButton(list._id)}>Edit list</button><br/> 
    {list.description}<br/>
   
   {list.items.map(item => (
   <div key={item.itemName}>
   <a href={`${item.link}`} target="__blank">{item.itemName}</a> <br/> 
   {item.itemDescription}
   </div>))}






  </div>
 
))

}
 

<br/>

 <button className="logoutButton" onClick={ () => {
   this.setState({
     name: '',
     email: '',
     _id: '',
     lists: ''
   })
           history.replace('/')
           history.push('/')
           history.go(0)
 }}>Log Out</button>
  
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