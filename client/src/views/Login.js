import React from "react";
import useForm from "../components/Forms/useForm";
import validate from "../utils/formValidation/loginValidation";
import API from "../utils/API";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
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

const Login = (props) => {
  const initialLoginValues = {
    email: "",
    password: "",
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    initialLoginValues,
    validate
  );

  async function submit() {
    const response = await API.login(values);

    if (response.ok) {
      // const { token, auth } = await response.json();
      const { token, auth } = await response.json();

      localStorage.setItem("token", token);
      localStorage.setItem("auth", auth);

      props.setAuthLevel(auth);
      props.setAuth(true);
      if (auth === "admin") {
        props.setIsAdmin(true);
      }

      if (auth === "admin") {
        props.history.push("/admin");
      } else if (auth === "developer" || auth === "project manager") {
        props.history.push("/general");
      }

      values.email = "";
      values.password = "";
    } else {
      alert("Invalid login");
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    autoComplete="new-email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      {errors.title}
                    </div>
                  )}
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      {errors.title}
                    </div>
                  )}
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <Link to="/auth/register">
              <small>Create new account</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
