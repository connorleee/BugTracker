import React, { useState, useEffect } from "react";
import useForm from "./useForm";
import validate from "../../utils/formValidation/ticketValidation";
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

const CreateTicket = (props) => {
  const team = props.team.map(
    (teammate) => `${teammate.first_name} ${teammate.last_name}`
  );

  const initialTicketValues = {
    title: "",
    description: "",
    assignees: [],
    priority: "",
    type: "",
    status: "",
    timeEstimate: "",
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate,
    initialTicketValues
  );

  async function submit() {
    const {
      title,
      projectId,
      description,
      author_id,
      assignees,
      priority,
      type,
      status,
      timeEstimate,
    } = values;

    values.title = "";
    values.description = "";
    values.assignees = [];
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup>
              <Label
                htmlFor="title"
                className="lease-form-label mandatory-entry"
              >
                Title
              </Label>
              <Input
                id="title"
                type="text"
                name="title"
                className="lease-form-input"
                placeholder="Enter ticket title"
                value={values.title}
                onChange={handleChange}
              />
              {errors.title && (
                <div style={{ fontSize: 12, color: "red" }}>{errors.title}</div>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="ticketDescription">Ticket Description</Label>
              <Input
                type="textarea"
                name="description"
                id="ticketDescription"
                placeholder="Enter description"
                value={values.description}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label for="assignedDevs">Assign Devs</Label>
              <Input
                type="select"
                name="assignedDevs"
                id="assignedDevs"
                value={values.assignees}
                onChange={handleChange}
                multiple
              >
                {props.team.map((dev, key) => (
                  <option id={dev.user_id} key={key}>
                    {dev.first_name} {dev.last_name}
                  </option>
                ))}
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

export default CreateTicket;
