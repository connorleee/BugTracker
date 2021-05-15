import React, { useState } from "react";
import useForm from "../components/Forms/useForm";
import registerValidation from "../utils/formValidation/registerValidation";
import PhoneInput from "react-phone-number-input/input";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Register = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    // phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [phone, setPhone] = useState();

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    initialValues,
    registerValidation
  );

  function submit() {
    console.log({ phone, ...values });
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center mt-2 mb-2">
              <h2 className="text-muted text-center mt-2 mb-2">Sign up</h2>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="firstName"
                        placeholder="First Name"
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.firstName && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {errors.firstName}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="lastName"
                        placeholder="Last Name"
                        name="lastName"
                        type="text"
                        value={values.lastName}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.lastName && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {errors.lastName}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <PhoneInput
                    id="phone"
                    placeholder="Phone Number"
                    name="phone"
                    type="phone"
                    country="US"
                    value={phone}
                    onChange={setPhone}
                    style={{ border: "none", fontSize: "0.875rem" }}
                    className="text-muted"
                  />
                </InputGroup>
                {errors.phone && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.phone}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.email && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.email}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.password && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.password}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.confirmPassword && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
