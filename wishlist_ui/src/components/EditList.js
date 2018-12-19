import React, { Component } from 'react';

import Layout from './Layout';
import './Layout.css'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
let list_data
class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          _id: this.props.location.state.state._id,
         description: '',
         link: '',
         items: [],
         list: ''

        }; 
    }
    componentDidMount() {
        fetch(`http://localhost:3050/list/${this.state._id}`, {
    headers: {"Content-Type":"application/json" }})
    .then(results => {
     return results.json() 
    })
    .then((data) => {
        list_data = data.reduce((acc, cur) => cur, 0)
      this.setState({
        list: list_data,
        owner: list_data.owner,
        name: list_data.name,
        description: list_data.description,
        link: list_data.link,
        items: list_data.items

      })
    })
    }
    backHandler(){
        history.goBack(1)
    }

        render() {
 let listItems = this.state.items   

            return (
              <Layout> 
              <div>
                 
                <h2>Edit List Page</h2>
       id: {this.state._id}<br/>
       Name: {this.state.name}<br/>
       description: {this.state.description}<br/>
{listItems.map((item) => (
    <div key={item.item_id}>
        {item.itemName}<br/>
        {item.itemDescription}<br/>
        {item.link}
    </div>
))}

      
       <button onClick={e => this.backHandler(e)}>Back</button>
              </div>
              </Layout> 
            );
          }
        }
      export default EditList;