import React, { Component } from 'react';

import Layout from './Layout';
import './Layout.css'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          name: '',
          _id: this.props.location.state.state._id,
         password: ''

        }; 
    }
    backHandler(){
        history.goBack(1)
    }
        render() {
            return (
              <Layout> 
              <div>
                 
                <h2>Edit List Page</h2>
       id: {this.state._id}<br/>

      
       <button onClick={e => this.backHandler(e)}>Back</button>
              </div>
              </Layout> 
            );
          }
        }
      export default EditList;