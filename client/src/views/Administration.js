import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
  Button,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import API from "../utils/API";

const Administration = () => {
  const [allDevs, setAllDevs] = useState([]);
  const [selectedDev, setSelectedDev] = useState({});
  const [values, setValues] = useState(selectedDev);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);

  const toggleEditUser = () => setIsEditUserOpen(!isEditUserOpen);

  //capitalization function
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    setValues(selectedDev);

    console.log(values);
  }, [selectedDev]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchOrganization = async () => {
      try {
        const organization = await API.getUsers(abortController);

        setAllDevs(organization);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrganization();

    return () => {
      abortController.abort();
    };
  }, []);

  const editUser = (id) => {
    console.log("edit");
  };

  const removeUser = async (id) => {
    if (window.confirm("Are you sure you want to remove user?")) {
      try {
        await API.removeUser(id);

        const organization = await API.getUsers();
        setAllDevs(organization);
      } catch (err) {
        console.log("User deletion failed ");
      }
    } else {
      console.log("Deletion aborted");
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // await API.updateUserAuthority(selectedDev.id, { authValue });

      const organization = await API.getUsers();
      setAllDevs(organization);
      setSelectedDev(selectedDev.id);

      console.log("User authority updated");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col md="6" className="mb-4">
            <Card className="shadow">
              <CardHeader className="mb-2">Organization</CardHeader>
              {/* <Table className="p-2">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allDevs.map((dev, key) => {
                    return (
                      <tr
                        key={key}
                        id={dev.id}
                        onClick={() => {
                          setSelectedDev(dev);
                        }}
                      >
                        <td>
                          {dev.first_name} {dev.last_name}
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="warning"
                            onClick={() => {
                              editUser();
                            }}
                          >
                            <i className="fas fa-edit" />{" "}
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => {
                              removeUser(dev.id);
                            }}
                          >
                            <i className="fas fa-trash-alt" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table> */}

              <ListGroup className="m-4">
                {allDevs.map((dev, key) => {
                  return (
                    <ListGroupItem
                      as="li"
                      key={key}
                      id={dev.id}
                      onClick={() => {
                        setSelectedDev(dev);
                      }}
                      active={dev.id === selectedDev.id}
                    >
                      {dev.first_name} {dev.last_name}
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Card>
          </Col>
          <Col md="6">
            <Card className="shadow">
              <CardHeader className="mb-2">Edit User Information</CardHeader>
              {selectedDev.id ? (
                <div>
                  <Row className="m-4 ">
                    <Col md="12">
                      <h2 className="text-primary">
                        {selectedDev.first_name} {selectedDev.last_name}
                      </h2>
                    </Col>
                  </Row>

                  <Row className="m-4 ">
                    <Col md="12" className="mb-0">
                      <Form>
                        <Row>
                          <Col md="6" className="m-0">
                            <FormGroup>
                              <Label for="firstName" className="text-muted">
                                First Name
                              </Label>
                              <Input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={values.first_name}
                                onChange={handleChange}
                              ></Input>
                            </FormGroup>
                          </Col>
                          <Col md="6" className="m-0">
                            <FormGroup>
                              <Label for="lastName" className="text-muted">
                                Last Name
                              </Label>
                              <Input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={values.last_name}
                                onChange={handleChange}
                              ></Input>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <Label for="phone" className="text-muted">
                                Phone
                              </Label>
                              <Input
                                type="text"
                                name="phone"
                                id="phone"
                                value={values.phone}
                                onChange={handleChange}
                              ></Input>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <Label for="authority" className="text-muted">
                                Authorization Level
                              </Label>
                              <Input
                                type="select"
                                name="authority"
                                id="authority"
                                value={values.user_authority}
                                onChange={handleChange}
                              >
                                <option value="admin">Admin</option>
                                <option value="project manager">
                                  Project Manager
                                </option>
                                <option value="developer">Developer</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>

                        <FormGroup>
                          <Label for="email" className="text-muted">
                            Email
                          </Label>
                          <Input
                            type="text"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                          ></Input>
                        </FormGroup>
                        <Button
                          color="success"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                        <Button
                          color="danger"
                          type="button"
                          onClick={removeUser}
                          size="sm"
                        >
                          Remove User
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div>
                  <Row className="m-4 ">
                    <h4>No Dev Selected</h4>
                  </Row>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Administration;
