import React, { Component } from 'react';
import './App.css';
import Routing from './Routing';

export const apiURL = 'https://wishlistapi-rqaownzvut.now.sh'


class App extends Component {
  

  render() {
    return (
    <div className="grass">

          <div className="divMain"> 
          <Routing/>
          </div>
      
      </div>  
    );
  }
}

export default App;
