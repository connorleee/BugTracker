import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import API from "../../utils/API";

const UpdateProject = (props) => {
  const [values, setValues] = useState({
    name: props.projectData.name,
    description: props.projectData.description,
    team: props.projectTeam,
  });
  //   const [projectUsers, setProjectUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    console.log(props.projectData);
    console.log(props.projectTeam);
  }, []);

  //   //fetch project users
  //   useEffect(() => {
  //     async function fetchProjectUsers() {
  //       try {
  //         await API.getProjectUsers(props.projectData.id).then((json) => {
  //           setProjectUsers(json);
  //         });
  //         setValues({
  //           name: props.projectData.name,
  //           description: props.projectData.description,
  //           team: projectUsers.map((user) => user.user_id),
  //         });
  //       } catch (err) {
  //         console.log(err);
  //       }

  //       console.log(values.team);
  //     }

  //     fetchProjectUsers();
  //   }, [props.projectData.id]);

  //fetch all users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await API.getUsers();
        setAllUsers(users);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUsers();
  }, []);

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

  async function submit(event) {
    event.preventDefault();

    try {
      //   let projectId = await API.createProject(values);
      //   values.team.forEach(async (userId) => {
      //     await API.addTeamMember(projectId.id, { userId });
      //   });
    } catch (err) {
      console.log(err);
    }

    setValues({ name: "", description: "", team: [] });

    props.toggle();
  }

  if (values.team) {
    return (
      <Container fluid>
        <Form onSubmit={submit}>
          <Row>
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
          </Row>
          <Row>
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
          </Row>
          <Row>
            <FormGroup>
              <Label for="team">Update Team Members</Label>
              <Input
                type="select"
                name="team"
                id="team"
                value={values.team}
                onChange={handleChange}
                multiple
              >
                {allUsers.map((user, key) => {
                  return (
                    <option key={key} id={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
          </Row>

          <Button color="success" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  } else {
    return <span>Loading...</span>;
  }
};

export default UpdateProject;
