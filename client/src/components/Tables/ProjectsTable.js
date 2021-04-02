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
  //   Container,
  //   Row,
  //   UncontrolledTooltip,
} from "reactstrap";

import API from "../../utils/API";
import UsersCell from "./UsersCell";

const ProjectsTable = () => {
  let [projects, setProjects] = useState(null);

  let getProjectsUrl = "http://localhost:3001/api/projects";

  useEffect(() => {
    API.getProjects(getProjectsUrl).then((json) => {
      setProjects(json);
    });
  }, [getProjectsUrl]);

  if (projects) {
    return (
      <>
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <h3 className="mb-0">Projects</h3>
              <div className="col text-right">
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                >
                  New Project
                </Button>
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
                  <tr id={project.id}>
                    <th scope="row">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <Media>
                          <span>{project.name} </span>
                        </Media>
                      </a>
                    </th>
                    <td>
                      <span>{project.description}</span>
                    </td>
                    {/* <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        pending
                      </Badge>
                    </td> */}
                    <td>
                      <UsersCell projectId={project.id} />
                    </td>
                    {/* <td></td> */}
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
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Edit Project
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Delete Project
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                );
              })}
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
