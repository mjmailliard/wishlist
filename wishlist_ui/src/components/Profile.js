import React, { Component } from 'react';

import Layout from './Layout';
import './Layout.css'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          name: '',
          _id: this.props.location.state.state._id,
         password: ''

        };   
    }
    backHandler(event){
        event.preventDefault()
        // history.push('/user', {state: {_id: this.state._id}}) 
        history.goBack(1)
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
            let db_user = ''; 
          db_user = data.reduce((acc, cur) => cur, 0)
           this.setState({
             name: db_user.name,
             email: db_user.email,
             password: db_user.password
           },()=>{
      
           })
         
          })}

    render() {
      return (
        <Layout> 
        <div>
        <button className="logoutButton" onClick={ () => {
   this.setState({
     name: '',
     email: '',
     _id: '',
     password: ''
   })
           history.replace('/')
           history.push('/')
           history.go(0)
 }}>Log Out</button>       
           
          <h2>Profile Page</h2>
 Name: {this.state.name}<br/>
 Email: {this.state.email}<br/>
 Password: {this.state.password}<br/>

 <button onClick={e => this.backHandler(e)}>Back</button>
        </div>
        </Layout> 
      );
    }
  }
export default Profile;