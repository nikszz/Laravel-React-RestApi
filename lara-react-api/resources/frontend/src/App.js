import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./Component/NavigationBar";
import { Row, Container, Col } from "react-bootstrap";
import Welcome from "./Component/Welcome";
import Footer from "./Component/footer";
import Employee from "./Component/Employee";
import ListEmployee from "./Component/ListEmployee";

export default function App() {
  const marginTop = {
    marginTop: "20px",
  };
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/add" exact component={Employee} />
              <Route path="/edit/:id" exact component={Employee} />
              <Route path="/list" exact component={ListEmployee} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
}
