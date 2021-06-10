import React, { useEffect, useState } from "react";
// core components
import Header from "components/Headers/Header.js";

import parsePhoneNumber, { AsYouType } from "libphonenumber-js";
import API from "../utils/API";

// reactstrap components
import {
  Card,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
} from "reactstrap";

const Administration = () => {
  const [allDevs, setAllDevs] = useState([]);
  const [selectedDev, setSelectedDev] = useState({
    id: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    user_authority: "",
  });
  const [values, setValues] = useState({});
  const asYouType = new AsYouType("US");

  //capitalization function
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    setValues(selectedDev);
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
    if (e.target.getAttribute("type") === "phone") {
      let phone = asYouType.input(e.target.value);

      setValues({ ...values, phone });
    } else {
      console.log("here");
      let value = e.target.value;
      let name = e.target.name;

      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(values);

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
                              <Label for="first_name" className="text-muted">
                                First Name
                              </Label>
                              <Input
                                type="text"
                                name="first_name"
                                id="first_name"
                                value={values.first_name}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6" className="m-0">
                            <FormGroup>
                              <Label for="last_name" className="text-muted">
                                Last Name
                              </Label>
                              <Input
                                type="text"
                                name="last_name"
                                id="last_name"
                                value={values.last_name}
                                onChange={handleChange}
                              />
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
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <Label
                                for="user_authority"
                                className="text-muted"
                              >
                                Authorization Level
                              </Label>
                              <Input
                                type="select"
                                name="user_authority"
                                id="user_authority"
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
                          />
                        </FormGroup>
                        <Row>
                          <Col md="6">
                            <Button
                              color="success"
                              type="submit"
                              onClick={handleSubmit}
                            >
                              Submit
                            </Button>
                          </Col>
                          <Col md="6" className="text-right">
                            <Button
                              color="danger"
                              type="button"
                              onClick={removeUser}
                              size="sm"
                            >
                              Remove User
                            </Button>
                          </Col>
                        </Row>
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
