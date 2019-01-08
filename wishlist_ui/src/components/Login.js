import React, { Component } from 'react';
import Layout from './Layout';
import '../App.css';
import { createBrowserHistory } from 'history';
import{ apiURL } from '../App';
import  Toggle  from './Toggle';
import { Fragment } from 'react';
const history = createBrowserHistory();

  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        dbName: '',
        db_id: '',
        dbPassword: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    
    }
  
    handleChange(event) {
      this.setState({});
    }
    
    handleSubmit(event) {
    event.preventDefault()
 

       fetch(`${apiURL}/users/email/${this.state.email}`, {
      headers: {
        "Content-Type":"application/json"
      }
    }).then(results => {
     
       return results.json()
     
    }).then(data => {

      const db_data = data.reduce((acc, cur) => cur, 0)


     this.setState({
     
       dbName: db_data.name,
       db_id: db_data._id,
       dbPassword: db_data.password
 
     }, () => {
       if ( this.state.password === this.state.dbPassword) {
        history.push('/user', {state: {db_id: this.state.db_id}}) 
        history.go(0)
       }else {
        alert('Sorry, ' + this.state.dbName + ', you entered an incorrect password')
        }
      
       
      })
 

    })

  
     

    
    }
    
    render() {
        return (
          <Layout>
          <div>
            <Toggle>
            {({ on, off, toggle }) => ( 
              <div>
            
            <form onSubmit={async e => {
              toggle(e)
              await this.handleSubmit(e) 
            }}>
            
              <h2>Login</h2>
            {off &&  
              <Fragment>
                <label>Email: </label><br/>
                <input type='email' name='email' onChange={event => this.setState({email: event.target.value})} id='emailInput' placeholder='email@email.com'/><br/>
                <label> Password: </label><br/>
                <input type="password" name="password" onChange={event => this.setState({password: event.target.value})} id='passwordInput' placeholder='password' autoComplete='password'/><br/>
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
          </div>
            )} 
  </Toggle>
          </div>
          </Layout>
        );
      }
    }
  
  export default Login;