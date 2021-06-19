import React, { useState, useEffect, useMemo } from "react";
import CreateProject from "../Forms/CreateProject";
import UpdateProject from "../Forms/UpdateProject";
import PaginationComponent from "./PaginationComponent";
import DataTable from "./DataTable";

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
  const [projects, setProjects] = useState([]);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectData, setSelectedProjectData] = useState([]);
  const [selectedProjectTeam, setSelectedProjectTeam] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  // const [q, setQ] = useState(""); //table search value

  //pagination
  const [totalProjects, setTotalProjects] = useState(0);
  const [currentProjectPage, setCurrentProjectPage] = useState(1);
  const projectsPerPage = 6;

  const toggleNewProject = () => setIsNewProjectOpen(!isNewProjectOpen);
  const toggleEditProject = () => setIsEditProjectOpen(!isEditProjectOpen);
  const setProjectId = (event) => setSelectedProjectId(event.target.id);
  const resetProjectId = () => setSelectedProjectId(null);

  //fetch all users
  useEffect(() => {
    let isRendered = true;

    async function fetchUsers() {
      try {
        const users = await API.getUsers();
        if (isRendered === true) setAllUsers(users);
      } catch (err) {
        console.log(err);
      }
    }

    fetchUsers();

    return () => {
      isRendered = false;
    };
  }, []);

  useEffect(() => {
    let isRendered = true;
    async function fetchProject() {
      if (selectedProjectId) {
        try {
          const [projectData, projectTeam] = await Promise.all([
            API.getProject(selectedProjectId),
            API.getProjectUsers(selectedProjectId),
          ]);

          if (isRendered === true) {
            // const projectData = await API.getProject(selectedProjectId);
            setSelectedProjectTeam(projectTeam.map((user) => user.user_id));
            setSelectedProjectData(projectData.data);

            // const projectTeam = await API.getProjectUsers(selectedProjectId);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    fetchProject();

    return () => {
      isRendered = false;
    };
  }, [selectedProjectId]);

  useEffect(() => {
    let isRendered = true;
    async function fetchProjects() {
      const projectsData = await API.getProjects();

      if (isRendered === true) setProjects(projectsData);
    }

    fetchProjects();

    return () => {
      isRendered = false;
    };
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

  const projectData = useMemo(() => {
    const computedProjects = projects;

    setTotalProjects(computedProjects.length);

    return computedProjects.slice(
      (currentProjectPage - 1) * projectsPerPage,
      (currentProjectPage - 1) * projectsPerPage + projectsPerPage
    );
  }, [projects, currentProjectPage]);

  // const filteredProjectData = (rows) => {
  //   const columns = rows[0] && ["name", "description"];

  //   return rows.filter((row) =>
  //     columns.some(
  //       (column) => row[column].toString().toLowerCase().indexOf(q) > -1
  //     )
  //   );
  // };

  // filteredProjectData(projectData);

  if (projects) {
    return (
      <>
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="ml-2 align-items-center">
              <h3 className="mb-0">Projects</h3>
              {/* <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              /> */}
              <div className="col text-right">
                <Button color="primary" onClick={toggleNewProject} size="sm">
                  New Project
                </Button>

                <Modal isOpen={isNewProjectOpen} toggle={toggleNewProject}>
                  <Container className="m-4 align-self-center" fluid>
                    <ModalHeader toggle={toggleNewProject}>
                      Add New Project
                    </ModalHeader>
                    <CreateProject
                      toggle={toggleNewProject}
                      setProjects={setProjects}
                    />
                  </Container>
                </Modal>
              </div>
            </Row>
          </CardHeader>

          {/* <DataTable data={filteredProjectData(projectData)} /> */}

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
              {projectData.map((project) => {
                return (
                  <tr key={project.id}>
                    <th scope="row">
                      <Link to={`/admin/project/${project.id}`}>
                        <Media>
                          <span>{project.name} </span>
                        </Media>
                      </Link>
                    </th>
                    <td
                      style={{
                        whiteSpace: "unset",
                        wordWrap: "break-word",
                      }}
                    >
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
            <PaginationComponent
              total={totalProjects}
              itemsPerPage={projectsPerPage}
              currentPage={currentProjectPage}
              onPageChange={(page) => setCurrentProjectPage(page)}
            />
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
