import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import '../App.css';


class Layout extends Component {
    render() {
        return (

            <div className="divMain clouds">
 
                
                    <header>
                        <h1>Wishlists</h1>
                   </header>
                 
                        {this.props.children}
                {/* <footer> </footer> */}
</div>
        );
    }
}

export default Layout;