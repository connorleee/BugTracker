import React, { useState, useEffect } from "react";

// reactstrap components
import {
  //   Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  //   Progress,
  Table,
  Button,
  Row,
  Col,
  Container,
  //   UncontrolledTooltip,
} from "reactstrap";

import Header from "../components/Headers/Header";

import API from "../utils/API";

const Project = (props) => {
  const projectId = props.match.params.id;

  let [projectData, setProjectData] = useState(null);
  let [projectTeam, setProjectTeam] = useState(null);
  let [projectIssues, setProjectIssues] = useState(null);

  let getProjectUsersUrl = `http://localhost:3001/api/userProjects/${projectId}`;

  useEffect(async () => {
    try {
      const projectDataRes = await API.getProject(projectId);
      setProjectData(projectDataRes.data);

      const projectTeamRes = await API.getProjectUsers(getProjectUsersUrl);
      const projectIssuesRes = await API.getProjectIssues(projectId);

      setProjectTeam(projectTeamRes);
      setProjectIssues(projectIssuesRes);
    } catch (err) {
      alert(`Error requesting project data: ${err}`);
    }
  }, []);

  if (projectData) {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row className="mt-5" id={projectData.id}>
            <Col>
              <h1 className="text-white d-none d-lg-inline-block">
                {projectData.name}
              </h1>
            </Col>
            <Col>
              <h2 className="text-white d-none d-lg-inline-block">
                {projectData.description}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col xl="3">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <h3 className="mb-0">Team</h3>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        New Member
                      </Button>
                    </div>
                  </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col" /> {/* edit button */}
                    </tr>
                  </thead>
                  <tbody>
                    {projectTeam.map((user) => {
                      return (
                        <tr id={user.user_id}>
                          <th>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <Media>
                                {user.first_name} {user.last_name}
                              </Media>
                            </a>
                          </th>
                          <td>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              {user.email}
                            </a>
                          </td>
                          <td>{user.phone}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="9">
              <Card className="shadow">
                <CardHeader>
                  <Row className="align-items-center">
                    <h3 className="mb-0">Issues</h3>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        New Issue
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Ticket Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Ticket Author</th>
                      <th scope="col" /> {/* edit button */}
                    </tr>
                  </thead>
                  <tbody>
                    {projectIssues.map((issue) => {
                      return (
                        <tr id={issue.id}>
                          <th>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <Media>{issue.title}</Media>
                            </a>
                          </th>
                          <td>{issue.description}</td>
                          <td>{issue.author_id}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xl="3">
              <Card className="shadow">Place Holder</Card>
            </Col>
            <Col xl="9">
              <Card className="shadow">Selected Issue</Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return <>Loading... </>;
};

export default Project;
