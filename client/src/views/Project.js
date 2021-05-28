import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Tables.css";

// reactstrap components
import { Row, Col, Container } from "reactstrap";

import Header from "../components/Headers/Header";
import SelectedTicket from "../components/Tickets/SelectedTicket";
import ProjectTeamTable from "../components/Tables/ProjectTeamTable";
import ProjectTicketsTable from "../components/Tables/ProjectTicketsTable";

import API from "../utils/API";

const Project = () => {
  const projectId = useParams().id;

  const [projectData, setProjectData] = useState({});
  const [projectTeam, setProjectTeam] = useState([]);
  const [projectTickets, setProjectTickets] = useState([]);
  const [isNewMemberOpen, setIsNewMemberOpen] = useState(false);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [isEditTicketOpen, setIsEditTicketOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [selectedTicket, setSelectedTicket] = useState({});
  const [assignedDevs, setAssignedDevs] = useState([]);
  const [comments, setComments] = useState([]);

  const toggleNewMember = () => setIsNewMemberOpen(!isNewMemberOpen);
  const toggleCreateTicket = () => setIsNewTicketOpen(!isNewTicketOpen);
  const toggleEditTicket = () => setIsEditTicketOpen(!isEditTicketOpen);

  // update project team
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchTeam() {
      try {
        const projectTeamRes = await API.getProjectUsers(
          projectId,
          abortController
        );

        setProjectTeam(projectTeamRes);
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.log("Error fetching project team data", err);
        }
      }
    }

    fetchTeam();

    return () => {
      abortController.abort();
    };
  }, [projectId, isNewMemberOpen]);

  // update project data
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        const projectDataRes = await API.getProject(projectId, abortController);
        setProjectData(projectDataRes.data);

        const projectTicketsRes = await API.getProjectTickets(
          projectId,
          abortController
        );
        setProjectTickets(projectTicketsRes);
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.log(`Error requesting project data: ${err}`);
        }
      }
    }
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [projectId]);

  // update ticket data
  useEffect(() => {
    const abortController = new AbortController();

    async function fetchTicket() {
      try {
        if (selectedTicketId) {
          const ticket = await API.getTicket(
            projectId,
            selectedTicketId,
            abortController
          );
          setSelectedTicket(ticket);
          const comments = await API.getTicketComments(
            selectedTicketId,
            abortController
          );
          setComments(comments);

          //assigned Devs
          const assignedDevs = await API.getDevAssignments(
            selectedTicketId,
            abortController
          );
          setAssignedDevs(assignedDevs);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.log(`Error requesting project data: ${err}`);
        }
      }
    }

    fetchTicket();

    return () => {
      abortController.abort();
    };
  }, [selectedTicketId, projectId]);

  if (projectData && projectTeam && projectTickets) {
    return (
      <>
        <Header />
        <Container className="mt--9 vh-70" fluid>
          <Row className="mt-0" id={projectData.id}>
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
            <Col xl="4" className="mt-3">
              <ProjectTeamTable
                projectTeam={projectTeam}
                setProjectTeam={setProjectTeam}
                toggleNewMember={toggleNewMember}
                isNewMemberOpen={isNewMemberOpen}
                projectId={projectId}
              />
            </Col>
            <Col xl="8" className="mt-3">
              <ProjectTicketsTable
                projectId={projectId}
                projectTickets={projectTickets}
                setProjectTickets={setProjectTickets}
                projectTeam={projectTeam}
                selectedTicket={selectedTicket}
                setSelectedTicketId={setSelectedTicketId}
                toggleEditTicket={toggleEditTicket}
                toggleCreateTicket={toggleCreateTicket}
                isEditTicketOpen={isEditTicketOpen}
                isNewTicketOpen={isNewTicketOpen}
                assignedDevs={assignedDevs}
              />
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
