import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class NavigationBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to={""} className="navbar-brand">
          <img
            src="https://contractiq.com/uploads/vendor/vendor_logo/4819/bluelupin-logo.png" alt="bluelupin"
            height="50px"
            width="200px"
          ></img>
        </Link>
        <Nav className="mr-auto">
          <Link to={"add"} className="nav-link">
            Add Employee
          </Link>
          <Link to={"list"} className="nav-link">
            List Employee
          </Link>
        </Nav>
      </Navbar>
    );
  }
}
