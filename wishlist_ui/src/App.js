import React, { Component } from 'react';
import './App.css';
import Routing from './Routing';


export const apiURL = 'https://wishlistapi-rqaownzvut.now.sh'

class App extends Component {

  render() {
    return (
      <div className="divMain">
        <Routing/>


      </div>
    );
  }
}

export default App;
