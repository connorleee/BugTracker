import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
  Modal,
  ModalHeader,
  //   UncontrolledTooltip,
} from "reactstrap";

import Header from "../components/Headers/Header";
// import Modal from "../components/Modal/Modal";
import SelectedTicket from "../components/Tickets/SelectedTicket";
import CreateTicket from "../components/Forms/CreateTicket";

import API from "../utils/API";

const Project = () => {
  const projectId = useParams().id;

  const [projectData, setProjectData] = useState(null);
  const [projectTeam, setProjectTeam] = useState(null);
  const [projectTickets, setProjectTickets] = useState(null);
  const [isNewMemberOpen, setIsNewMemberOpen] = useState(false);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [isEditTicketOpen, setIsEditTicketOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [assignedDevs, setAssignedDevs] = useState(null);
  const [comments, setComments] = useState(null);

  let getProjectUsersUrl = `http://localhost:3001/api/userProjects/${projectId}`;

  const toggleCreateTicket = () => setIsNewTicketOpen(!isNewTicketOpen);
  const toggleEditTicket = () => setIsEditTicketOpen(!isEditTicketOpen);

  useEffect(() => {
    async function fetchData() {
      try {
        const projectDataRes = await API.getProject(projectId);
        setProjectData(projectDataRes.data);

        const projectTeamRes = await API.getProjectUsers(getProjectUsersUrl);
        setProjectTeam(projectTeamRes);

        const projectTicketsRes = await API.getProjectTickets(projectId);
        setProjectTickets(projectTicketsRes);
      } catch (err) {
        alert(`Error requesting project data: ${err}`);
      }
    }
    fetchData();
  }, [projectId, getProjectUsersUrl]);

  useEffect(() => {
    async function fetchTicket() {
      try {
        if (selectedTicketId) {
          const ticket = await API.getTicket(projectId, selectedTicketId);
          setSelectedTicket(ticket);
          const comments = await API.getTicketComments(selectedTicketId);
          setComments(comments);

          //assigned Devs
          const assignedDevs = await API.getDevAssignments(selectedTicketId);
          setAssignedDevs(assignedDevs);
        }
      } catch (err) {
        alert(`Error requesting project data: ${err}`);
      }
    }

    fetchTicket();
  }, [selectedTicketId]);

  if (projectData && projectTeam && projectTickets) {
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
                            {/* <Link onClick={(e) => e.preventDefault()}> */}
                            <Media>
                              {user.first_name} {user.last_name}
                            </Media>
                            {/* </Link> */}
                          </th>
                          <td>
                            {/* <Link onClick={(e) => e.preventDefault()}> */}
                            {user.email}
                            {/* </Link> */}
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
                    <h3 className="mb-0">Tickets</h3>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={toggleCreateTicket}
                        size="sm"
                      >
                        New Ticket
                      </Button>

                      <Modal
                        isOpen={isNewTicketOpen}
                        toggle={toggleCreateTicket}
                      >
                        <Container className="m-4 align-self-center" fluid>
                          <ModalHeader toggle={toggleCreateTicket}>
                            Create Ticket
                          </ModalHeader>
                          <CreateTicket team={projectTeam} />
                        </Container>
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
                    {projectTickets.map((ticket) => {
                      return (
                        <tr key={ticket.id} id={ticket.id}>
                          <th
                            onClick={() => {
                              setSelectedTicketId(ticket.id);
                            }}
                          >
                            <Media>{ticket.title}</Media>
                          </th>
                          <td>{ticket.description}</td>
                          <td key={ticket.user_id}>
                            {ticket.first_name} {ticket.last_name}
                          </td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                role="button"
                                size="sm"
                                color=""
                                onClick={() => {
                                  setSelectedTicketId(ticket.id);
                                }}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem onClick={toggleEditTicket}>
                                  Edit Ticket
                                </DropdownItem>

                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Remove Ticket
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })}

                    <Modal isOpen={isEditTicketOpen} toggle={toggleEditTicket}>
                      <Container className="m-4 align-self-center" fluid>
                        <ModalHeader toggle={toggleEditTicket}>
                          Edit Ticket
                        </ModalHeader>
                        <CreateTicket
                          team={projectTeam}
                          ticketData={selectedTicket}
                        />
                      </Container>
                    </Modal>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xl="12">
              <SelectedTicket
                selectedTicket={selectedTicket}
                assignedDevs={assignedDevs}
                comments={comments}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return <>Loading... </>;
};

export default Project;
