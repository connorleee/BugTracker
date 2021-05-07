import React, { useState, useEffect } from "react";
import API from "../../utils/API";
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

const AddTeamMember = (props) => {
  const { team, projectId } = props;
  const [dbUsers, setDbUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const users = await API.getAvailableUsers(projectId);
      console.log(users);

      setDbUsers(users);
    }

    fetchData();
  }, [dbUsers]);

  return (
    <Container>
      <Form>
        <FormGroup>
          <Label>Available Users</Label>
          <Input type="select" multiple>
            {dbUsers.map((user) => {
              return <option>{user.first_name}</option>;
            })}
          </Input>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default AddTeamMember;
