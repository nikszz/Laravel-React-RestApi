import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

export default class Welcome extends Component {
  render() {
    return (
      <Jumbotron className="bg-dark text-white">
        <h1>Hello, Team.!</h1>
        <p>
          Bluelupin is a leading web and mobile app development company based
          out of India that caters to enterprises and startups. Our expertise in
          the latest technologies and love for delivering excellence ensures our
          clients’ utmost satisfaction.
        </p>
      </Jumbotron>
    );
  }
}
