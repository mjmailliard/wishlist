import React, { Component } from 'react';
import Layout from './Layout';
import './Login.css'




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
      // const formData = JSON.stringify({...this.state})

       fetch(`http://localhost:3050/users/email/${this.state.email}`, {
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
// redirect here
       }else {
        alert('you entered an incorrect password')
        }
       
       
      })
 

    })

  
     

    
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
                <input type="password" name="password" onChange={event => this.setState({password: event.target.value})} id='passwordInput' placeholder='password' autoComplete='password'/><br/>

              <input type="submit" value="Submit" />
            </form>
          
  
          </div>
          </Layout>
        );
      }
    }
  
  export default Login;