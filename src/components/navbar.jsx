import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink to="/" className="nav-link">
                Vidley
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink to="/movies" className="nav-link">
                Movies
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink to="/customers" className="nav-link">
                Customers
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink to="/rentals" className="nav-link">
                Rentals
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
