import React, { Component } from 'react';
import Layout from './Layout';
import '../App.css';
import { createBrowserHistory } from 'history';
import Collapsible from 'react-collapsible';

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
  handleDeleteListButton(id) {
    fetch(`http://localhost:3050/list/${id}`,  {
        method: 'DELETE'
      //  body: formData,
        // headers: {
        //   "Content-Type":"application/json" 
        //  }  
      }) 
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
       <Collapsible trigger={(`${list.name} - ${list.description}`)} className="listName" openedClassName="openListName">
          
        {list.items.map(item => (
            <div key={item.itemName}>
          <a href={`${item.link}`} target="__blank">{item.itemName}</a> <br/> 
          <label>{item.itemDescription}</label> 
          
            </div>))}
            <button name="editListButton" id={`editBtn-${list._id}`} onClick={() => this.handleEditListButton(list._id)}>Edit list</button>
          <button name="deleteListButton" id={`delBtn-${list._id}`}  onClick={() => { if (window.confirm('Are you sure you wish to delete this item?\n (This process is irreversible)')) this.handleDeleteListButton(list._id) }}>Delete List</button>
          
 </Collapsible>
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
  



        </div>
       </Layout> 
      );
    }
  }

export default User;