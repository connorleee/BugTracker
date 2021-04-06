import React, { useState, useEffect } from "react";
import useForm from "./useForm";
import validate from "../../utils/formValidation";
import { Container, Row, Col } from "reactstrap";
import API from "../../utils/API";

const CreateTicket = () => {
  const [propertiesArr, setPropertiesArr] = useState([]);
  const [unitsArr, setUnitsArr] = useState([]);

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

    const propertyId = await API.getPropertyId(property).then(
      (res) => res.data
    );

    const unitId = await API.getUnitId(propertyId, unit).then(
      (res) => res.data.id
    );

    API.CreateTicket({
      unitId,
      firstName,
      startDate,
      endDate,
      isMonthToMonth,
      propertyId,
    }).then((res) => {
      console.log(res.data);

      const { unitId, propertyId } = JSON.parse(res.config.data);

      API.createTenant({
        firstName,
        lastName,
        phone,
        email,
        unitId,
        propertyId,
      }).then((res) => console.log(res.data));
    });
  }

  const getPropertiesArr = () => {
    API.getProperties().then((res) => {
      setPropertiesArr(res.data);
    });
  };

  const getUnitsArr = (propertyId) => {
    API.getUnits(propertyId).then((res) => {
      setUnitsArr(res.data);
    });
  };

  //dynamically create property options on form load
  useEffect(() => {
    getPropertiesArr();
  }, []);

  //dynamically create unit options associated to a property when user selects property
  useEffect(() => {
    API.getPropertyId(values.property).then((res) => {
      getUnitsArr(res.data);
    });
  }, [values.property]);

  let propertiesOptions = propertiesArr.map((property) => {
    return (
      <option id={property.id} key={property.id}>
        {property.name}
      </option>
    );
  });

  let unitOptions = unitsArr.map((unit) => {
    return (
      <option id={unit.id} key={unit.id}>
        {unit.name}
      </option>
    );
  });

  return (
    <>
      <Container fluid>
        <form className="create-lease-form" onSubmit={handleSubmit}>
          <h1>Create Lease</h1>
          <Row>
            <Col md={5} className="lease-categories">
              <h2>Lease Info</h2>
              <Row>
                <Col>
                  <div className="lease-form-inputs">
                    <label
                      htmlFor="property"
                      className="lease-form-label mandatory-entry"
                    >
                      Property
                      <select
                        id="property"
                        name="property"
                        className="lease-form-input"
                        default="Select a property"
                        value={values.property}
                        onChange={handleChange}
                      >
                        {propertiesOptions}
                      </select>
                      {/* only render error if there is one */}
                      {errors.property && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {errors.property}
                        </div>
                      )}
                    </label>
                  </div>
                </Col>
                <Col>
                  <div className="lease-form-inputs">
                    <label
                      htmlFor="unit"
                      className="lease-form-label mandatory-entry"
                    >
                      Unit
                      <select
                        id="unit"
                        name="unit"
                        className="lease-form-input"
                        default="Select a unit"
                        value={values.unit}
                        onChange={handleChange}
                      >
                        {unitOptions}
                      </select>
                      {/* only render error if there is one */}
                      {errors.unit && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {errors.unit}
                        </div>
                      )}
                    </label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="lease-form-inputs">
                    <label
                      htmlFor="startDate"
                      className="lease-form-label mandatory-entry"
                    >
                      Start Date
                      <input
                        id="startDate"
                        type="date"
                        name="startDate"
                        className="lease-form-input"
                        value={values.startDate}
                        onChange={handleChange}
                      />
                      {errors.startDate && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {errors.startDate}
                        </div>
                      )}
                    </label>
                  </div>
                </Col>
                <Col>
                  <div className="lease-form-inputs">
                    <label
                      htmlFor="leaseEndDate"
                      className="lease-form-label mandatory-entry"
                    >
                      End Date
                      <input
                        id="endDate"
                        type="date"
                        name="endDate"
                        className="lease-form-input"
                        value={values.endDate}
                        onChange={handleChange}
                      />
                      {errors.endDate && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {errors.endDate}
                        </div>
                      )}
                    </label>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="lease-form-inputs">
                  <label htmlFor="isMonthToMonth" className="lease-form-label">
                    Month to month?
                    <input
                      type="checkbox"
                      name="isMonthToMonth"
                      // className="lease-form-input"
                      checked={values.isMonthToMonth}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </Row>
            </Col>
            <Col md={5} className="lease-categories">
              <h2>Main Resident</h2>
              <Row>
                <Col>
                  <div className="lease-form-inputs">
                    <label
                      htmlFor="firstName"
                      className="lease-form-label mandatory-entry"
                    >
                      First Name
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        className="lease-form-input"
                        placeholder="Enter first name"
                        value={values.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {errors.firstName}
                        </div>
                      )}
                    </label>
                  </div>
                </Col>
                <Col>
                  <div className="lease-form-inputs">
                    <label
                      htmlFor="lastName"
                      className="lease-form-label mandatory-entry"
                    >
                      Last Name
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        className="lease-form-input"
                        placeholder="Enter last name"
                        value={values.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {errors.lastName}
                        </div>
                      )}
                    </label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="lease-form-inputs">
                    <label
                      htmlFor="phone"
                      className="lease-form-label mandatory-entry"
                    >
                      Phone Number
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        className="lease-form-input"
                        placeholder="xxx-xxx-xxxx"
                        value={values.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {errors.phone}
                        </div>
                      )}
                    </label>
                  </div>
                </Col>
                <Col>
                  <div className="lease-form-inputs">
                    <label
                      htmlFor="email"
                      className="lease-form-label mandatory-entry"
                    >
                      Email
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className="lease-form-input"
                        placeholder="tony@hawk.com"
                        value={values.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div style={{ fontSize: 12, color: "red" }}>
                          {errors.email}
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
