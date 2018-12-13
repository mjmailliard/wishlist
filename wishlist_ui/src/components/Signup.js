import React, { Component } from 'react';
import Layout from './Layout';
import './Signup.css'
// import { Formik, Field, Form, ErrorMessage } from 'formik';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordVerify: ''

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
    const formData = JSON.stringify({...this.state})
     fetch('http://localhost:3050/users',  {
    method: 'POST',
    body: formData,
    headers: {
      "Content-Type":"application/json"
      
    }
    
  })

    console.log(formData)
    this.setState = {
      name: '',
      email: '',
      password: ''
    };
  
  }
  
  render() {
      return (
        <Layout>
        <div>
          <form onSubmit={this.handleSubmit}>
            <h2>Create an account</h2>
            <label> Name: </label><br/>
              <input type="text" name="name" onChange={event => this.setState({name: event.target.value})} id='nameInput' placeholder='Name'/><br/>
            <label>Email: </label><br/>
              <input type='email' name='email' onChange={event => this.setState({email: event.target.value})} id='emailInput' placeholder='email@email.com'/><br/>
            <label> Password: </label><br/>
              <input type="password" name="password" onChange={event => this.setState({password: event.target.value})}id='passwordInput' placeholder='password' autoComplete='new password'/><br/>
            <label> Re-Enter Password: </label><br/>
              <input type="password" name="passwordVerify" onChange={event => this.setState({passwordVerify: event.target.value})} id='passwordVerify' placeholder='Confirm password' autoComplete='new password again'/><br/>

            <input type="submit" value="Submit" />
          </form>

        </div>
        </Layout>
      );
    }
  }

export default Signup;