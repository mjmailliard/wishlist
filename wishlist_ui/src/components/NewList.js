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
          _id: this.props.location.state.state._id,
          listName: '',
          listDescription: '',
          items: [{item_id: itemCount,
                   itemName: '',
                   itemDescription: '',
                   link: ''
                }]

        };   
    }
    addItem = (e)=> {
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
    // componentDidMount() {
    //     // retrieve user info by {_id: }
        
    //       fetch(`http://localhost:3050/users/${this.state._id}`, {
    //         headers: {
    //           "Content-Type":"application/json"
    //         }
    //       }).then(results => {
    //          return results.json()
    //       }).then(data => {
    //         let db_user = ''; 
    //       db_user = data.reduce((acc, cur) => cur, 0)
    //        this.setState({
    //          name: db_user.name,
    //          email: db_user.email,
    //          password: db_user.password
    //        },()=>{
      
    //        })
         
    //       })}

    render() {
    let {items} = this.state
      return (
        <Layout> 
        <div>
           
          <h2>New List</h2>
 

          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <input type="text" name="listName" id="listName" placeholder='List Name'></input><br/>
            <textarea rows="3" name="listDescription" id="listDescription" placeholder="List Description"></textarea><br/>
            <hr/>
{items.map((val, i) => {
  let itemId=`item-${i}`,itemNameId=`item-${i}`,linkId=`link-${i}`,itemDescriptionId=`itemDescription-${i}`

  return(
    <div key={itemId}>
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



<button onClick={this.addItem}>New Item</button><button type="submit">Save List</button>

</form>






 <button onClick={e => this.backHandler(e)}>Back</button>
        </div>
        </Layout> 
      );
    }
  }
export default NewList;