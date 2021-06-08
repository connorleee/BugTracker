import React, { useEffect, useState } from "react";

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
          <Col md="6">
            <Card className="shadow">
              <CardHeader className="mb-2">Organization</CardHeader>
              <ListGroup className="m-2">
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
              <CardHeader className="mb-2">Developer</CardHeader>
              <Row className="m-2 justify-content-center">
                {selectedDev.id ? (
                  <div>
                    <Row>
                      <h1>
                        {selectedDev.first_name} {selectedDev.last_name}
                      </h1>
                    </Row>

                    <Row>
                      <Col md="12" className="mb-0">
                        <h6 className="text-muted text-capitlized">
                          Current User Authority
                        </h6>
                      </Col>

                      <Col md="12">
                        {capitalize(selectedDev.user_authority)}
                      </Col>
                    </Row>

                    <Row>
                      <Form>
                        <FormGroup>
                          <Label>Authorization Level</Label>
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
                          <Button type="submit" onClick={handleSubmit}>
                            Submit
                          </Button>
                        </FormGroup>
                      </Form>
                    </Row>
                  </div>
                ) : (
                  <h4>No Dev Selected</h4>
                )}
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Administration;
