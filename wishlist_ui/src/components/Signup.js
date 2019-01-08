import React, { Component } from 'react';
import Layout from './Layout';
import '../App.css';
import { createBrowserHistory } from 'history';
import {apiURL} from '../App'
import { Fragment } from 'react';
import  Toggle  from './Toggle';

const history = createBrowserHistory();
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordVerify: '',
      db_id: '',
      dbEmail: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({});
  }

  handleSubmit(event) {
  event.preventDefault()
   if( this.state.password !== this.state.passwordVerify) {
    throw alert('Your passwords do not match.')
   } 
  const formData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password

    }
  
//check if account email is already in the db
fetch(`${apiURL}/users/verify/${this.state.email}`, {
  headers: {
    "Content-Type":"application/json"
  }
}).then(results => {
   return results.json()
}).then(data => {
  const db_data = data.reduce((acc, cur) => cur, 0)

this.setState({
  //  db_id: db_data._id,
   dbEmail: db_data.email
 },  ( async ()  => {  

   if ( this.state.email === this.state.dbEmail ) {
    alert(`${this.state.email} already has an account.`)
 } else { 
       await fetch(`${apiURL}/users`,  {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          "Content-Type":"application/json" 
         }  
      }) 
      await fetch(`${apiURL}/users/verify/${this.state.email}`, {
        headers: {
          "Content-Type":"application/json"
        }
      }).then(results => {
        return results.json()
     }).then(data => {
      const newUser = data.reduce((acc, cur) => cur, 0)

      this.setState({
         db_id: newUser._id,
         
       },(()=> { 
          history.push('/user', {state: {db_id: this.state.db_id}}) 
          history.go(0) 
       }))})
 }}))
})
 
  }
  
  render() {
      return (
        <Layout>
        <div>
          <Toggle>
          {({ on, off, toggle }) => ( 
          <Fragment>
          <form onSubmit={async e => {
              toggle(e)
              await this.handleSubmit(e) 
          }}>
            <h2>Create an account</h2>
              {off &&
               <Fragment>
                <label> Name: </label><br/>
                  <input type="text" name="name" onChange={event => this.setState({name: event.target.value})} id='nameInput' placeholder='Name'/><br/>
                <label>Email: </label><br/>
                  <input type='email' name='email' onChange={event => this.setState({email: event.target.value})} id='emailInput' placeholder='email@email.com'/><br/>
                <label> Password: </label><br/>
                  <input type="password" name="password" onChange={event => this.setState({password: event.target.value})}id='passwordInput' placeholder='password' autoComplete='new password'/><br/>
                <label> Re-Enter Password: </label><br/>
                  <input type="password" name="passwordVerify" onChange={event => this.setState({passwordVerify: event.target.value})} id='passwordVerify' placeholder='Confirm password' autoComplete='new password again'/><br/>
                <input type="submit" value="Submit" />
              </Fragment>
              }
           
          </form>
          
            {on &&
              <div className="loading-container">
                <div className="spinner"></div>
                <div className="spinner-center"></div>
              <div className="loading-text">Loading...</div>
            </div> 
            }
          </Fragment>
          )}
          </Toggle>
        </div>
        </Layout>
      );
    }
  }

export default Signup;