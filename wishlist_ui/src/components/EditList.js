import React, { Component } from 'react';
import Layout from './Layout';
import '../App.css';
import { createBrowserHistory } from 'history';
import uuid from "uuid";
import {apiURL} from '../App'

const history = createBrowserHistory();
let list_data
class EditList extends Component {
    constructor(props) {
        super(props);
        this.state = {
         owner: '',
          _id: this.props.location.state.state._id,
          name: '',
          description: '',
         items: [{item_id: '',
            itemName: '',
            itemDescription: '',
            link: ''
         }]
        }; 
    }
    componentDidMount() {

        fetch(`${apiURL}/list/${this.state._id}`, {
    headers: {"Content-Type":"application/json" }})
    .then(results => {
     return results.json() 
    })
    .then((data) => {
        list_data = data.reduce((acc, cur) => cur, 0)
      this.setState({
        owner: list_data.owner,
        name: list_data.name,
        description: list_data.description,
        items: list_data.items

      })
    })
    }
    addItem = (e)=> {
        e.preventDefault()
        this.setState((prevState) => ({
          items: [...prevState.items,
            {item_id: uuid.v1().substring(0,7),
            itemName: '',
            itemDescription: '',
            link: ''        }]
        }))
        
      }
    handleChange = (e) => {
        if (["item_id","itemName", "link","itemDescription"].includes(e.target.className) ) {
            let items = [...this.state.items]   
            items[e.target.dataset.id][e.target.className] = e.target.value
         
            this.setState({ items })
          } else {
            this.setState({ [e.target.name]: e.target.value })
          } 
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const formData = JSON.stringify({...this.state})
       
            await fetch(`${apiURL}/list/${this.state._id}`,  {
            method: 'PATCH',
            body: formData,
            headers: {
              "Content-Type":"application/json" 
             }  
          })
    history.push('/user', {state: {db_id: this.state.owner}}) 
    history.go(0)
    }
    handleDeleteItem = (e) => {
        e.preventDefault()
        
        const oldData = this.state.items.filter(item => item.item_id !== e.target.name)
        this.setState({items: oldData})
    }
    backHandler(){
        history.goBack(1)
    }

        render() {
 let listItems = this.state.items   

            return (
              <Layout> 
              <div>
                 
                <h2>Edit {this.state.name}</h2>
<form onChange={this.handleChange} onSubmit={this.handleSubmit}>               
      <input type="text" name="name" data-id="name" id="name" value={this.state.name} className="editListName" onChange={event => this.setState({name: event.target.value})}></input><br/>
       <textarea name="description" data-id="desc" id="desc" value={this.state.description} className="listDescription" onChange={event => this.setState({description: event.target.value})}></textarea><br/>
       <hr/>
{listItems.map((item,i) => (
    <div key={item.item_id} id={item.item_id} className="editList">
         <button name={item.item_id} value={item.item_id} onClick={e => this.handleDeleteItem(e)} className="deleteItemBtn">Delete</button><br/>
            
       <input type="text" data-id={i} id={item.item_id} placeholder="Item Name" name="itemName" value={item.itemName} className="itemName" onChange={event => this.setState({items:[{itemName: event.target.value}]})}></input>
       <input type="text" data-id={i} name="link" placeholder="Link" value={item.link} className="link" onChange={event => this.setState({items:[{link: event.target.value}]})}></input>
       <br/>
       
        <textarea name="itemDescription" placeholder="Description" data-id={i} id="itemDescID" value={item.itemDescription} className="itemDescription" onChange={event => this.setState({items:[{itemDescription: event.target.value}]})}></textarea>
   
    </div>
 
))}
<div className="buttonDiv">
        <button onClick={this.addItem}>New Item</button>
        <button type="submit">Save Changes</button>
</div>
</form>  
      
       <button className="backButton" onClick={e => this.backHandler(e)}>Back</button>
              </div>
              </Layout> 
            );
          }
        }
      export default EditList;