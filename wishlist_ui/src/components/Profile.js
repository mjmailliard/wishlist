import React, { Component } from 'react';
import Layout from './Layout';
import '../App.css';
import { createBrowserHistory } from 'history';
import Toggle from './Toggle'
import {apiURL} from '../App'

const history = createBrowserHistory();

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          name: '',
          _id: this.props.location.state.state._id,
         password: '',
         passwordVerify: '',
         newEmail: '',
         dbEmail: ''
        };   
    }
    handleSubmit = (e) => {
      e.preventDefault()
      if( this.state.password !== this.state.passwordVerify) {
        throw alert('Your passwords do not match.')
       } 
       //if email didn't change, patch the name and pw
      if(this.state.email === this.state.newEmail) {
        const formData = {
          name: this.state.name,
          password: this.state.password
        }
        fetch(`${apiURL}/users/${this.state._id}`, {
          method: 'PATCH',
          body: JSON.stringify(formData),
          headers: {
            "Content-Type":"application/json" 
           }
        })
        history.go(0) // refresh page

      } else { //if email changed, check if new email is already in db
         fetch(`${apiURL}/users/verify/${this.state.newEmail}`, {
          headers: {
            "Content-Type":"application/json"
          }})
          .then(results => {
            return results.json()
          })
          .then(data => {
            const db_data = data.reduce((acc, cur) => cur, 0)
            this.setState({ 
              dbEmail: db_data.email
            }, ( async ()=>{ //compare new email to search result
              if(this.state.newEmail === this.state.dbEmail) {
                alert(`${this.state.newEmail} already has an account.`) 
              } else { //if new email doesn't exist in db, then patch all data
                const formData = {
                  name: this.state.name,
                  password: this.state.password,
                  email: this.state.newEmail  
                }
                  await fetch(`${apiURL}/users/${this.state._id}`,{
                    method: 'PATCH',
                    body: JSON.stringify(formData),
                    headers: {
                      "Content-Type":"application/json"
                    }
                  })
                  history.go(0)
              }
            }))

          })


      } 
    }


    
backHandler(event){
        event.preventDefault()
        // history.push('/user', {state: {_id: this.state._id}}) 
        history.goBack(1)
    }
async handleDeleteProfile() {
  await fetch(`${apiURL}/users/${this.state._id}`,  {
    method: 'DELETE'
})
history.replace('/')
history.push('/')
history.go(0)
}

    componentDidMount() {
        // retrieve user info by {_id: }
        
          fetch(`${apiURL}/users/${this.state._id}`, {
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
             newEmail: db_user.email,
             password: db_user.password,
             passwordVerify: db_user.password
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
           
          <h2>{`${this.state.name}'s`} Profile</h2>
<form onSubmit={this.handleSubmit}>
 <Toggle>
 {({ on, off, toggle }) => ( 
<div className="userProfile">
{off && <button onClick={ toggle }>Edit</button>} <br/>

Name: {off && <label>{this.state.name}</label>}<br/>
{on && <input type="text" name="name" id="name" value={this.state.name} className="listName" onChange={event => this.setState({name: event.target.value})} autoComplete="username"></input>}<br/>
Email: {off && <label>{this.state.email}</label>}<br/>
{on && <input type="email" name="email" id="email" value={this.state.newEmail} className="listName" onChange={event => this.setState({newEmail: event.target.value})} autoComplete="email"></input>}<br/>
Password: {off && <label>*******</label>}<br/>
{on && <input type="password" name="password" id="password" value={this.state.password} className="listName" onChange={event => this.setState({password: event.target.value})} autoComplete="password"></input>}
{on && <label>Verify Password:</label>}
{on && <input type="password" name="passwordVerify" id="passwordVerify" defaultValue={this.state.password} className="listName" onChange={event => this.setState({passwordVerify: event.target.value})} autoComplete="password again"></input>}
{on && <button type="submit">Save</button>}



</div>
 )}
</Toggle>
 <br/>
</form>
<div className="buttonDiv">
<button className="deleteProfileBtn" onClick={() => { if (window.confirm('Are you sure you wish to delete this profile?\n (This process is irreversible, there is NO coming back from this...)')) this.handleDeleteProfile(this.state._id) }}>Delete Profile</button>
</div>
 <button className="backButton" onClick={e => this.backHandler(e)}>Back</button>
        </div>
        </Layout> 
      );
    }
  }
export default Profile;