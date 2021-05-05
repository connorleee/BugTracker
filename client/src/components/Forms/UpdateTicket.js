import React, { useEffect } from "react";
import useForm from "./useForm";
import validate from "../../utils/formValidation/ticketValidation";
import { useParams } from "react-router-dom";
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

const UpdateTicket = (props) => {
  const projectId = useParams().id;

  const initialTicketValues = {
    title: "",
    description: "",
    assignees: [],
    priority: "low",
    type: "issue",
    status: "new",
    timeEstimate: 0,
  };

  useEffect(() => {
    async function fillAssignees() {
      if (props.ticketData) {
        try {
          const devAssignments = await API.getDevAssignments(
            props.ticketData.id
          );

          devAssignments.forEach((dev) => {
            initialTicketValues.assignees.push(dev.user_id);
          });
        } catch (err) {
          console.error(err.message);
        }
        initialTicketValues.title = props.ticketData.title;
        initialTicketValues.description = props.ticketData.description;
        initialTicketValues.priority = props.ticketData.priority;
        initialTicketValues.type = props.ticketData.type;
        initialTicketValues.status = props.ticketData.status;
        initialTicketValues.timeEstimate = props.ticketData.timeEstimate;
      }
    }
    fillAssignees();
  }, []);

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    initialTicketValues,
    validate
  );

  async function submit() {
    const { assignees } = values;
    try {
      await API.updateTicket(projectId, props.ticketData.id, values);
      console.log("Ticket Updated");

      await API.removeAllDevAssignments(props.ticketData.id);
      console.log("devs cleared");

      for (let i = 0; i < assignees.length; i++) {
        const devId = { devId: assignees[i] };
        await API.createDevAssignment(props.ticketData.id, devId);
      }
      console.log("devs updated");
    } catch (err) {
      console.log(err);
      console.error(err.message);
    }

    values.title = "";
    values.description = "";
    values.assignees = [];
    values.priority = "low";
    values.type = "issue";
    values.status = "new";
    values.timeEstimate = "";
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
                rows="5"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="assignees">Assign Devs</Label>
              <Input
                type="select"
                name="assignees"
                id="assignees"
                value={values.assignees}
                onChange={handleChange}
                multiple
              >
                {props.team.map((dev, key) => (
                  <option id={dev.user_id} key={key} value={dev.user_id}>
                    {dev.first_name} {dev.last_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="timeEstimate">Time Estimate (Hours)</Label>
              <Input
                type="number"
                min="0"
                step="0.5"
                name="timeEstimate"
                id="timeEstimate"
                value={values.timeEstimate}
                onChange={handleChange}
              ></Input>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label for="type">Type</Label>
              <Input
                type="select"
                name="type"
                id="type"
                value={values.type}
                onChange={handleChange}
              >
                <option>issue</option>
                <option>bug</option>
                <option>high</option>
                <option>error</option>
                <option>feature request</option>
                <option>other</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="type">Priority</Label>
              <Input
                type="select"
                name="priority"
                id="priority"
                value={values.priority}
                onChange={handleChange}
              >
                <option>low</option>
                <option>medium</option>
                <option>high</option>
                <option>immediate</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="type">Status</Label>
              <Input
                type="select"
                name="status"
                id="status"
                value={values.status}
                onChange={handleChange}
              >
                <option>new</option>
                <option>open</option>
                <option>in progress</option>
                <option>resolved</option>
                <option>additional info required</option>
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

export default UpdateTicket;
