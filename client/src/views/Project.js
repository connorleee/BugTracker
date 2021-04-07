import React, { useState, useEffect } from "react";

// reactstrap components
import {
  //   Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  //   Progress,
  Table,
  Button,
  Row,
  Col,
  Container,
  //   UncontrolledTooltip,
} from "reactstrap";

import Header from "../components/Headers/Header";
import Modal from "../components/Modal/Modal";

import API from "../utils/API";

const Project = (props) => {
  const projectId = props.match.params.id;

  const [projectData, setProjectData] = useState(null);
  const [projectTeam, setProjectTeam] = useState(null);
  const [projectIssues, setProjectIssues] = useState(null);
  const [isNewMemberOpen, setIsNewMemberOpen] = useState(false);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState({});

  let selectedIssueId = "";

  let getProjectUsersUrl = `http://localhost:3001/api/userProjects/${projectId}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const projectDataRes = await API.getProject(projectId);
        setProjectData(projectDataRes.data);

        const projectTeamRes = await API.getProjectUsers(getProjectUsersUrl);
        setProjectTeam(projectTeamRes);

        const projectIssuesRes = await API.getProjectIssues(projectId);
        setProjectIssues(projectIssuesRes);
      } catch (err) {
        alert(`Error requesting project data: ${err}`);
      }
    }
    fetchData();
  }, [projectId, getProjectUsersUrl]);

  useEffect(() => {}, [selectedIssueId]);

  if (projectData && projectTeam && projectIssues) {
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
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <h3 className="mb-0">Team</h3>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={() => setIsNewMemberOpen(true)}
                        size="sm"
                      >
                        New Member
                      </Button>

                      <Modal
                        open={isNewMemberOpen}
                        onClose={() => setIsNewMemberOpen(false)}
                      >
                        *New Member Form*
                      </Modal>
                    </div>
                  </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {projectTeam.map((user) => {
                      return (
                        <tr key={user.user_id}>
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
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Remove Team Member
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="8">
              <Card className="shadow">
                <CardHeader>
                  <Row className="align-items-center">
                    <h3 className="mb-0">Issues</h3>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={() => setIsNewTicketOpen(true)}
                        size="sm"
                      >
                        New Ticket
                      </Button>

                      <Modal
                        open={isNewTicketOpen}
                        onClose={() => setIsNewTicketOpen(false)}
                      >
                        *New Ticket Form*
                      </Modal>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Ticket Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Ticket Author</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {projectIssues.map((issue) => {
                      return (
                        <tr key={issue.id} id={issue.id}>
                          <th
                            onClick={() => {
                              console.log(issue.id);
                              selectedIssueId = issue.id;
                            }}
                          >
                            {/* <a href="#" onClick={(e) => e.preventDefault()}> */}
                            <Media>{issue.title}</Media>
                            {/* </a> */}
                          </th>
                          <td>{issue.description}</td>
                          <td key={issue.user_id}>
                            {issue.first_name} {issue.last_name}
                          </td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Edit Issue
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Remove Issue
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xl="4">
              <Card className="shadow">Selected Issue</Card>
            </Col>
            <Col xl="8">
              <Card className="shadow">
                <CardHeader>
                  <Row className="align-items-center">
                    <h3 className="mb-0">Issues</h3>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={() => setIsNewTicketOpen(true)}
                        size="sm"
                      >
                        New Ticket
                      </Button>

                      <Modal
                        open={isNewTicketOpen}
                        onClose={() => setIsNewTicketOpen(false)}
                      >
                        *New Ticket Form*
                      </Modal>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Ticket Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Ticket Author</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {projectIssues.map((issue) => {
                      return (
                        <tr key={issue.id}>
                          <th>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <Media>{issue.title}</Media>
                            </a>
                          </th>
                          <td>{issue.description}</td>
                          <td key={issue.user_id}>
                            {issue.first_name} {issue.last_name}
                          </td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Edit Issue
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Remove Issue
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return <>Loading... </>;
};

export default Project;
