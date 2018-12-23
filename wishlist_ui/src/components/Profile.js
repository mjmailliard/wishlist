import React, { Component } from 'react';

import Layout from './Layout';
import './Layout.css'
import { createBrowserHistory } from 'history';
import Toggle from './Toggle'

const history = createBrowserHistory();

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          name: '',
          _id: this.props.location.state.state._id,
         password: '',
         passwordVerify: ''

        };   
    }
    handleSubmit(e){
      e.preventDefault()

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
<form onSubmit={this.handleSubmit}>
 <Toggle>
 {({ on, off, toggle }) => ( 

<div>
       <button onClick={ toggle }>Edit</button> <br/>

Name: {off && <label>{this.state.name}</label>}<br/>
{on && <input type="text" name="name" id="name" value={this.state.name} className="listName" onChange={event => this.setState({name: event.target.value})} autoComplete="username"></input>}<br/>
Email: {off && <label>{this.state.email}</label>}<br/>
{on && <input type="email" name="email" id="email" value={this.state.email} className="listName" onChange={event => this.setState({email: event.target.value})} autoComplete="email"></input>}<br/>
Password: {off && <label>*******</label>}<br/>
{on && <input type="password" name="password" id="password" value={this.state.password} className="listName" onChange={event => this.setState({password: event.target.value})} autoComplete="password"></input>}
{on && <label>Verify Password:</label>}
{on && <input type="password" name="passwordVerify" id="passwordVerify" defaultValue={this.state.password} className="listName" onChange={event => this.setState({passwordVerify: event.target.value})} autoComplete="password again"></input>}
<button type="submit">Save</button>


</div>
 )}
</Toggle>
 <br/>

</form>
 <button className="backButton" onClick={e => this.backHandler(e)}>Back</button>
        </div>
        </Layout> 
      );
    }
  }
export default Profile;