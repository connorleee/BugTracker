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
  const [authValue, setAuthValue] = useState(selectedDev.user_authority);

  //capitalization function
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

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

  const removeUser = async (id) => {};

  const handleChange = (e) => {
    let value = e.target.value;

    setAuthValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.updateUserAuthority(selectedDev.id, { authValue });

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
              <Table className="p-2">
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
                              editUser(dev.id);
                            }}
                          >
                            <i class="fas fa-edit" />{" "}
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => {
                              removeUser(dev.id);
                            }}
                          >
                            <i class="fas fa-trash-alt" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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
              <CardHeader className="mb-2">User Authority Level</CardHeader>
              {selectedDev.id ? (
                <div>
                  <Row className="m-4 ">
                    <Col md="3">
                      <h2 className="text-primary">
                        {selectedDev.first_name} {selectedDev.last_name}
                      </h2>
                    </Col>
                    <Col md="3">
                      <h6 className="text-muted text-capitlized">
                        Current User Authority
                      </h6>
                      <span>{capitalize(selectedDev.user_authority)}</span>
                    </Col>

                    <Col md="6" className="mb-0">
                      <Form>
                        <FormGroup>
                          <Label className="text-muted">
                            Update Authorization Level
                          </Label>
                          <InputGroup>
                            <Input
                              type="select"
                              name="authority"
                              id="authority"
                              value={authValue}
                              onChange={handleChange}
                            >
                              <option value="admin">Admin</option>
                              <option value="project manager">
                                Project Manager
                              </option>
                              <option value="developer">Developer</option>
                            </Input>

                            <InputGroupAddon addonType="append">
                              <Button
                                color="success"
                                type="submit"
                                onClick={handleSubmit}
                              >
                                Submit
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
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
