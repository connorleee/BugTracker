import React, { useState, useEffect } from "react";
import useForm from "./useForm";
import validate from "../../utils/formValidation";
import { Container, Row, Col } from "reactstrap";
import API from "../../utils/API";

const CreateTicket = () => {
  const initialTicketValues = {
    title: "Maple",
    description: "101",
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
  }

  return (
    <>
      <Container fluid>
        <form className="create-lease-form" onSubmit={handleSubmit}>
          <h1>Create Ticket</h1>
          <Row>
            <Col md={5} className="lease-categories">
              <Row>
                <Col>
                  <div className="lease-form-inputs">
                    <label
                      htmlFor="title"
                      className="lease-form-label mandatory-entry"
                    >
                      Title
                      <input
                        id="title"
                        type="text"
                        name="title"
                        className="lease-form-input"
                        placeholder="Enter ticket title"
                        value={values.title}
                        onChange={handleChange}
                      />
                      {errors.title && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {errors.title}
                        </div>
                      )}
                    </label>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <button className="form-input-btn" type="submit">
            Submit
          </button>
        </form>
      </Container>
    </>
  );
};

export default CreateTicket;
