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
      
      // const something = data.map(lists => lists)
      // console.log(something)


      this.setState({
        lists: data,
      
       
      })

    })
    
  }

    render() {
let lists = this.state.lists

console.log(lists)

// let listItems = this.state.lists.map(list => list.items)
// console.log(listItems)

      return (
          <Layout>
        <div>
 
 
  <label>Welcome{' ' + this.state.name}! <br/>
        
        Email: {this.state.email} 
  </label>
    
{ lists.map((list) => (
  <div key={list._id}> 
   
    {list.name} - {list.description}<br/>
    {list._id}<br/>
   {list.items.map(item => (<div key={item.itemName}>{item.itemName}</div>))}



    {/* {list.items.map(arrayItem => (<div key={arrayItem.itemName}>
      {arrayItem.itemName} - 
          {arrayItem.items[i].item_id} - {arrayItem.items[i].itemName} - {arrayItem.items[i].itemDescription} - {arrayItem.items[i].link}<br/>
          {arrayItem._id} </div> ))} */}


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