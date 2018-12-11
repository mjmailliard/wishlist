import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import './layout.css'

class Layout extends Component {
    render() {
        return (
            <div className="site">
                <div>
                    <header>
                    <a href="/"><button>Home</button></a>
                        <h1>Header info</h1>
                        <a href="/signup"><button>Sign Up</button></a>
                        <a href="/login"><button class="loginButton">Login</button></a>


                    </header>
                        <div>{this.props.children}</div>
                </div>
                <footer>Footer info

                </footer>
            </div>
        );
    }
}

export default Layout;