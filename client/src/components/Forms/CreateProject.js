import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import API from "../../utils/API";

const CreateProject = (props) => {
  const [values, setValues] = useState({ name: "", description: "", team: [] });
  const [availableTeamMembers, setAvailableTeamMembers] = useState([]);

  const handleChange = (event) => {
    let value;

    if (
      event.target.type === "select" ||
      event.target.type === "select-multiple"
    ) {
      value = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
    } else {
      value = event.target.value;
    }
    const name = event.target.name;

    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    let isRendered = true;

    async function fetchUsers() {
      const users = await API.getUsers();
      if (isRendered === true) setAvailableTeamMembers(users);
    }

    fetchUsers();

    return () => {
      isRendered = false;
    };
  }, []);

  async function submit(event) {
    event.preventDefault();

    try {
      let projectId = await API.createProject(values);

      values.team.forEach(async (userId) => {
        await API.addTeamMember(projectId.id, { userId });
      });
    } catch (err) {
      console.log(err);
    }

    setValues({ name: "", description: "", team: [] });

    props.toggle();
  }

  return (
    <Container fluid>
      <Form onSubmit={submit}>
        <Row>
          <Col>
            <FormGroup>
              <Label
                htmlFor="name"
                className="lease-form-label mandatory-entry"
              >
                Project Name
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                className="lease-form-input"
                placeholder="Enter project name"
                value={values.name}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="description">Project Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Enter description"
                value={values.description}
                onChange={handleChange}
                rows="5"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="team">Add Team Members</Label>
              <Input
                type="select"
                name="team"
                id="team"
                value={values.team}
                onChange={handleChange}
                multiple
              >
                {availableTeamMembers.map((user, key) => {
                  return (
                    <option key={key} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
        </Row>

        <Button color="success" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateProject;
