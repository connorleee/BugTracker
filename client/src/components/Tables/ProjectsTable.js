import React, { useState, useEffect } from "react";
import CreateProject from "../Forms/CreateProject";
import UpdateProject from "../Forms/UpdateProject";

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
  Modal,
  ModalHeader,
  Container,
  //   Row,
  //   UncontrolledTooltip,
} from "reactstrap";

import { Link } from "react-router-dom";

import API from "../../utils/API";
import UsersCell from "./UsersCell";

const ProjectsTable = () => {
  const [projects, setProjects] = useState(null);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectData, setSelectedProjectData] = useState(null);
  const [selectedProjectTeam, setSelectedProjectTeam] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const toggleNewProject = () => setIsNewProjectOpen(!isNewProjectOpen);
  const toggleEditProject = () => setIsEditProjectOpen(!isEditProjectOpen);
  const setProjectId = (event) => setSelectedProjectId(event.target.id);
  const resetProjectId = () => setSelectedProjectId(null);

  //fetch all users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await API.getUsers();
        setAllUsers(users);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchProject() {
      if (selectedProjectId) {
        try {
          const projectData = await API.getProject(selectedProjectId);
          setSelectedProjectData(projectData.data);

          const projectTeam = await API.getProjectUsers(selectedProjectId);
          setSelectedProjectTeam(projectTeam.map((user) => user.user_id));
        } catch (err) {
          console.log(err);
        }
      }
    }

    fetchProject();
  }, [selectedProjectId]);

  useEffect(() => {
    async function fetchProjects() {
      await API.getProjects().then((json) => {
        setProjects(json);
      });
    }

    fetchProjects();
  }, [isNewProjectOpen, selectedProjectId]);

  const deleteProject = async (projectId) => {
    try {
      await API.deleteProject(projectId);
      await API.getProjects().then((json) => {
        setProjects(json);
      });
    } catch (err) {
      console.log(err);
    }

    console.log("Project deleted");
  };

  if (projects) {
    return (
      <>
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <h3 className="mb-0">Projects</h3>
              <div className="col text-right">
                <Button color="primary" onClick={toggleNewProject} size="sm">
                  New Project
                </Button>

                <Modal isOpen={isNewProjectOpen} onClose={toggleNewProject}>
                  <ModalHeader toggle={toggleNewProject}>
                    Add New Project
                    <CreateProject
                      toggle={toggleNewProject}
                      setProjects={setProjects}
                    />
                  </ModalHeader>
                </Modal>
              </div>
            </Row>
          </CardHeader>

          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Project</th>
                <th scope="col">Description</th>
                {/* <th scope="col">Status</th> */}
                <th scope="col">Contributors</th>
                {/* <th scope="col">Completion</th> */}
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                return (
                  <tr key={project.id}>
                    <th scope="row">
                      <Link to={`/admin/project/${project.id}`}>
                        <Media>
                          <span>{project.name} </span>
                        </Media>
                      </Link>
                    </th>
                    <td>
                      <span>{project.description}</span>
                    </td>
                    <td>
                      <UsersCell
                        projectId={project.id}
                        selectedProjectId={selectedProjectId}
                      />
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          role="button"
                          size="sm"
                          color=""
                          id={project.id}
                          onClick={(e) => setProjectId(e)}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            id={project.id}
                            onClick={toggleEditProject}
                          >
                            Edit Project
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              deleteProject(project.id);
                            }}
                          >
                            Delete Project
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                );
              })}
              <Modal
                isOpen={isEditProjectOpen && selectedProjectData !== null}
                onClose={toggleEditProject}
              >
                <Container className="m-4 align-self-center" fluid>
                  <ModalHeader toggle={toggleEditProject}>
                    Edit Project
                  </ModalHeader>
                  <UpdateProject
                    toggle={toggleEditProject}
                    setProjects={setProjects}
                    resetProjectId={resetProjectId}
                    projectData={selectedProjectData}
                    projectTeam={selectedProjectTeam}
                    allUsers={allUsers}
                  />
                </Container>
              </Modal>
            </tbody>
          </Table>
          <CardFooter className="py-4">
            <nav aria-label="...">
              <Pagination
                className="pagination justify-content-end mb-0"
                listClassName="justify-content-end mb-0"
              >
                <PaginationItem className="disabled">
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    tabIndex="-1"
                  >
                    <i className="fas fa-angle-left" />
                    <span className="sr-only">Previous</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="active">
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    2 <span className="sr-only">(current)</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-angle-right" />
                    <span className="sr-only">Next</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          </CardFooter>
        </Card>
      </>
    );
  }

  return (
    <>
      <h1>Loading...</h1>
    </>
  );
};

export default ProjectsTable;
