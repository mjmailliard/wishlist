import React, { Component } from 'react';
import Layout from './Layout';
// import { Formik, Field, Form, ErrorMessage } from 'formik';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
   
     
    });
  }

  handleSubmit(event) {
    
   alert(event)
    event.preventDefault();
  }
  
  render() {
      return (
        <Layout>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Create an account</label><br/>
            <label> Name: <input type="text" name="name" onChange={this.handleChange} /></label><br/>
            <label>Email: <input type='email' name='email' onChange={this.handleChange}/></label><br/>
            <label> Password: <input type="text" name="password" onChange={this.handleChange}/></label><br/>
            <input type="submit" value="Submit" />
          </form>

        </div>
        </Layout>
      );
    }
  }

export default Signup;