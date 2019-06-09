import React, { Component } from "react";
import { NavLink } from "react-router-dom";


export default class NavBar extends Component {
  render() {
    const {user} = this.props;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="collapse navbar-collapse" id="navbarCollapse">
              <NavLink to="/" className="nav-link nav-item">
                Vidley
              </NavLink>
              <NavLink to="/movies" className="nav-link nav-item">
                Movies
              </NavLink>
              <NavLink to="/customers" className="nav-link nav-item">
                Customers
              </NavLink>
              <NavLink to="/rentals" className="nav-link nav-item">
                Rentals
              </NavLink>
            {!user && (
            <React.Fragment>
            <NavLink to="/login" className="nav-link nav-item">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-link nav-item">
                Register
            </NavLink>
            </React.Fragment>
            ) }
             {user && (
            <React.Fragment>
            <NavLink to="/profile" className="nav-link nav-item">
                {user.name}
              </NavLink>
              <NavLink to="/logout" className="nav-link nav-item">
                Logout
            </NavLink>
            </React.Fragment>
            ) }
        </div>
      </nav>
    );
  }
}
