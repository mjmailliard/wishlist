import React, { Component } from 'react';

import Layout from './Layout';
import './Layout.css'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
let itemCount = 0
const itemCounter = () => {
  itemCount++
return itemCount
}
class NewList extends Component {
    constructor(props) {
        super(props);
        this.state = {

          owner: this.props.location.state.state._id,
          name: '',
          description: '',
          items: [{item_id: itemCount,
                   itemName: '',
                   itemDescription: '',
                   link: ''
                }]

        };   
    }
    addItem = (e)=> {
      e.preventDefault()
      itemCounter()
      this.setState((prevState) => ({
        items: [...prevState.items,
          {item_id: itemCount,
          itemName: '',
          itemDescription: '',
          link: ''        }]
      }))
      
    }
    handleSubmit = (e) => {
      e.preventDefault()
      const formData = JSON.stringify({...this.state})
      fetch('http://localhost:3050/list',  {
        method: 'POST',
        body: formData,
        headers: {
          "Content-Type":"application/json" 
         }  
      }) 
        history.push('/user', {state: {db_id: this.state.owner}}) 
        history.go(0)
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
    backHandler(event){
        event.preventDefault()
        // history.push('/user', {state: {_id: this.state._id}}) 
        history.goBack(1)
    }

    render() {
    let {items} = this.state
      return (
        <Layout> 
        <div className="newList">
           
          <h2>New List</h2>
 

          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <input type="text" name="name" id="name" placeholder='List Name'></input><br/>
            <textarea rows="3" name="description" id="description" placeholder="List Description"></textarea><br/>
            <hr/>
{items.map((val, i) => {
let itemId=`item-${i}`,itemNameId=`item-${i}`,linkId=`link-${i}`,itemDescriptionId=`itemDescription-${i}`

  return(
    <div className="newList" key={itemId}>
    {/* <input 
       type="hidden"
       name={itemId}
       data-id={i}
       id={itemId}
       value={itemId}
       className="item_id">
    </input> */}

     <input
       type="text" 
       name={itemNameId} 
       data-id={i}
       id={itemNameId}
       placeholder="Item Name" 
       className="itemName">
    </input>
     <input 
       type="text" 
       name={linkId} 
       data-id={i}
       id={linkId}
       placeholder="Link" 
       className="link">
    </input><br/>
    <textarea 
       name={itemDescriptionId}
       data-id={i}
       id={itemDescriptionId}
       rows="3" 
       placeholder="Item Description"
       className="itemDescription"></textarea><br/>
    </div>
  )
})}



<button onClick={this.addItem}>New Item</button>
<button type="submit" onSubmit={e => this.handleSubmit(e)}>Save List</button>

</form>






 <button onClick={e => this.backHandler(e)}>Back</button>
        </div>
        </Layout> 
      );
    }
  }
export default NewList;