import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Badge,
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
  Progress,
  Table,
  //   Container,
  //   Row,
  UncontrolledTooltip,
} from "reactstrap";

import API from "../../utils/API";
import UsersCell from "./UsersCell";

const ProjectsTable = () => {
  let [projects, setProjects] = useState(null);

  let getProjectsUrl = "http://localhost:3001/api/projects";

  useEffect(() => {
    API.getProjects(getProjectsUrl).then((json) => {
      setProjects(json);
      console.log(json);
    });
  }, [getProjectsUrl]);

  if (projects) {
    return (
      <>
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">Projects</h3>
          </CardHeader>

          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Project</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Contributors</th>
                <th scope="col">Completion</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                return (
                  <tr>
                    <th scope="row" id={project.id}>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <Media>
                          <span>{project.name} </span>
                        </Media>
                      </a>
                    </th>
                    <td>
                      <span>{project.description}</span>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        pending
                      </Badge>
                    </td>
                    <td>
                      <UsersCell projectId={project.id} />
                    </td>
                    <td></td>
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
              <tr>
                <th scope="row">
                  <Media className="align-items-center">
                    <a
                      className="avatar rounded-circle mr-3"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        src={
                          require("../../assets/img/theme/bootstrap.jpg")
                            .default
                        }
                      />
                    </a>
                    <Media>
                      <span className="mb-0 text-sm">Argon Design System</span>
                    </Media>
                  </Media>
                </th>
                <td>$2,500 USD</td>
                <td>
                  <Badge color="" className="badge-dot mr-4">
                    <i className="bg-warning" />
                    pending
                  </Badge>
                </td>
                <td>
                  <div className="avatar-group">
                    <a
                      className="avatar avatar-sm"
                      href="#pablo"
                      id="tooltip742438047"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-1-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip742438047">
                      Ryan Tompson
                    </UncontrolledTooltip>
                    <a
                      className="avatar avatar-sm"
                      href="#pablo"
                      id="tooltip941738690"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-2-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip941738690">
                      Romina Hadid
                    </UncontrolledTooltip>
                    <a
                      className="avatar avatar-sm"
                      href="#pablo"
                      id="tooltip804044742"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-3-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip804044742">
                      Alexander Smith
                    </UncontrolledTooltip>
                    <a
                      className="avatar avatar-sm"
                      href="#pablo"
                      id="tooltip996637554"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip996637554">
                      Jessica Doe
                    </UncontrolledTooltip>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="mr-2">60%</span>
                    <div>
                      <Progress max="100" value="60" barClassName="bg-danger" />
                    </div>
                  </div>
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
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Another action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Something else here
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <Media className="align-items-center">
                    <a
                      className="avatar rounded-circle mr-3"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        src={
                          require("../../assets/img/theme/angular.jpg").default
                        }
                      />
                    </a>
                    <Media>
                      <span className="mb-0 text-sm">
                        Angular Now UI Kit PRO
                      </span>
                    </Media>
                  </Media>
                </th>
                <td>$1,800 USD</td>
                <td>
                  <Badge color="" className="badge-dot">
                    <i className="bg-success" />
                    completed
                  </Badge>
                </td>
                <td>
                  <div className="avatar-group">
                    <a
                      className="avatar avatar-sm"
                      href="#pablo"
                      id="tooltip746418347"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-1-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip746418347">
                      Ryan Tompson
                    </UncontrolledTooltip>
                    <a
                      className="avatar avatar-sm"
                      href="#pablo"
                      id="tooltip102182364"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-2-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip102182364">
                      Romina Hadid
                    </UncontrolledTooltip>
                    <a
                      className="avatar avatar-sm"
                      href="#pablo"
                      id="tooltip406489510"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-3-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip406489510">
                      Alexander Smith
                    </UncontrolledTooltip>
                    <a
                      className="avatar avatar-sm"
                      href="#pablo"
                      id="tooltip476840018"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip476840018">
                      Jessica Doe
                    </UncontrolledTooltip>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="mr-2">100%</span>
                    <div>
                      <Progress
                        max="100"
                        value="100"
                        barClassName="bg-success"
                      />
                    </div>
                  </div>
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
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Another action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Something else here
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
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
      <h1>Data not loaded yet</h1>
    </>
  );
};

export default ProjectsTable;
