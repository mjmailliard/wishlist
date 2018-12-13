import React, { Component } from 'react';
import Layout from './Layout';
import './Login.css'

  // <h2>Login Form</h2>
  // <p>Email here</p>
  // <p>Password here</p>
  // <a href="/"><button>Forgot Password</button></a>  
  // <a href="/"><button>Login</button></a>
  
  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({});
    }
  
    handleSubmit(event) {
    event.preventDefault()
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
       
        email: '',
        password: ''
      };
    
    }
    
    render() {
        return (
          <Layout>
          <div>
            <form onSubmit={this.handleSubmit}>
              <h2>Login</h2>
              <label>Email: </label><br/>
                <input type='email' name='email' onChange={event => this.setState({email: event.target.value})} id='emailInput' placeholder='email@email.com'/><br/>
              <label> Password: </label><br/>
                <input type="password" name="password" onChange={event => this.setState({password: event.target.value})}id='passwordInput' placeholder='password' autoComplete='password'/><br/>

              <input type="submit" value="Submit" />
            </form>
  
          </div>
          </Layout>
        );
      }
    }
  
  export default Login;