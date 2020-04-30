import React, { Component } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import axios from "axios";

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.empChange = this.empChange.bind(this);
    this.submitEmp = this.submitEmp.bind(this);
  }

  initialState = {
    id: "",
    fname: "",
    lname: "",
    dept: "",
    addr: "",
  };
  submitEmp = (event) => {
    event.preventDefault();
    const emp = {
      fname: this.state.fname,
      lname: this.state.lname,
      dept: this.state.dept,
      addr: this.state.addr,
    };

    axios.post("http://localhost:8000/api/emp/" , emp).then((response) => {
      if (response.data != null) {
        this.setState(this.initialState);
        alert("Employee Saved Sucessfully.!");
      }
    });
  };

  componentDidMount() {
    const empId = this.props.match.params.id;
    if (empId) {
      this.findEmpById(empId);
    }
  }
  findEmpById = (empId) => {
    axios
      .get("http://localhost:8000/api/emp/" + empId)
      .then((response) => {
        if (response.data != null) {
          this.setState({
            id: response.data.id,
            fname: response.data.fname,
            lname: response.data.lname,
            dept: response.data.dept,
            addr: response.data.addr,
          });
        }
      })
      .catch((error) => {
        console.error("Error -" + error);
      });
  };
  
  updateEmp = (event) => {
    event.preventDefault();
    const emp = {
      id: this.state.id,
      fname: this.state.fname,
      lname: this.state.lname,
      dept: this.state.dept,
      addr: this.state.addr,
    };

    axios.put("http://localhost:8000/api/emp/"+ emp.id,emp).then((response) => {
      if (response.data != null) {
        this.setState(this.initialState);
        alert("Employee Updated Sucessfully.!");
        //setTimeout(() => this.empList(), 2000);
      }
    });
  };
  
  empList = () =>{
    return this.props.history.push("/list");
  }
  resetEmp = () => {
    this.setState(() => this.initialState);
  };

  empChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { fname, lname, dept, addr } = this.state;
    return (
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>
          {this.state.id ? "Update Employee" : "Save Employee"}
        </Card.Header>
        <Form method="put"
          onReset={this.resetEmp}
          onSubmit={this.state.id ? this.updateEmp : this.submitEmp}
          id="EmpFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridfname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="fname"
                  autoComplete="off"
                  value={fname}
                  onChange={this.empChange}
                  placeholder="Enter First Name"
                  className="bg-dark text-white"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridlname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="lname"
                  autoComplete="off"
                  value={lname}
                  onChange={this.empChange}
                  placeholder="Enter Last Name"
                  className="bg-dark text-white"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridDept">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="dept"
                  autoComplete="off"
                  value={dept}
                  onChange={this.empChange}
                  placeholder="Enter Department"
                  className="bg-dark text-white"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAddr">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="addr"
                  autoComplete="off"
                  value={addr}
                  onChange={this.empChange}
                  placeholder="Enter Address"
                  className="bg-dark text-white"
                />
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button size="sm" variant="success" type="submit">
              {this.state.id ? "Update" : "Save"}
            </Button>{" "}
            <Button size="sm" variant="info" type="reset">
              Reset
            </Button>{" "}
            <Button size="sm" variant="info" type="button" onClick={this.empList.bind()}>
             List Employee 
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }
}
