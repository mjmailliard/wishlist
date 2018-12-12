import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import './Layout.css'

class Layout extends Component {
    render() {
        return (
            <div className="site">
                <div>
                    <header>
                    <a href="/"><button className="homeButton">Home</button></a>
                        <h1>Wishlists</h1>
                        <a href="/signup"><button className="signUpButton">Sign Up</button></a>
                        <a href="/login"><button className="loginButton">Login</button></a>


                    </header>
                        <div>{this.props.children}</div>
                </div>
                <footer>
                </footer>
            </div>
        );
    }
}

export default Layout;