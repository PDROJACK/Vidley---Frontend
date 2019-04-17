import React, {Component} from 'react';

export default class NavBar extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                 <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" >Vidley<span className="sr-only">(current)</span></a>
                    </li>
                    </ul>
                </div>
            </nav>
        );
    }
}