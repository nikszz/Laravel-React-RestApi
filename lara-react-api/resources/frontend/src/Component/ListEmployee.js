import React, { Component } from "react";
import { Card, Table, ButtonGroup, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ListEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emp: [],
    };
  }

  componentDidMount() {
    this.findAllEmp();
  }

  findAllEmp() {
    axios
      .get("http://localhost:8000/api/emp")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ emp: data });
      });
  }
  deleteEmp = (empId) => {
    axios
      .delete("http://localhost:8000/api/emp/" + empId)
      .then((response) => {
        if (response.data != null) {
                alert("Employee Delete Sucessfully.!");
                this.setState({
            emp: this.state.emp.filter((emp) => emp.id !== empId),
          });
        }
      });
  };

  render() {
    return (
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>Employee List</Card.Header>
        <Card.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Department</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.emp.length === 0 ? (
                <tr align="center">
                  <td colSpan="6">No Employee Available.</td>
                </tr>
              ) : (
                this.state.emp.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.fname}</td>
                    <td>{emp.lname}</td>
                    <td>{emp.dept}</td>
                    <td>{emp.addr}</td>
                    <td>
                      <ButtonGroup>
                        <Link
                          to={"edit/" + emp.id}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Edit
                        </Link>
                        <Button
                          onClick={this.deleteEmp.bind(this, emp.id)}
                          size="sm"
                          variant="outline-danger"
                          type="submit"
                        >{" "}
                          Delete
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
