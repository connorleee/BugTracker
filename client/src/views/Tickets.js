import React, { useEffect, useState, useMemo } from "react";
import API from "../utils/API";
import moment from "moment";
import PaginationComponent from "../components/Tables/PaginationComponent";

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
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Tickets = () => {
  const [userTickets, setUserTickets] = useState([{}]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [currentTicketsPage, setCurrentTicketsPage] = useState(1);
  const ticketsPerPage = 10;

  const timeOutstanding = (timestamp) => {
    return moment(timestamp).from(moment());
  };

  useEffect(() => {
    //TODO: fetch user tickets. create backend and front end route
    async function fetchUserTickets() {
      try {
        const userTicketsRes = await (await API.getUserTickets()).json();

        setUserTickets(userTicketsRes);
      } catch (err) {
        console.log("Error fetching user tickets", err);
      }
    }

    fetchUserTickets();
  }, []);

  const ticketsData = useMemo(() => {
    const computedTickets = userTickets;

    setTotalTickets(computedTickets.length);

    return computedTickets.slice(
      (currentTicketsPage - 1) * ticketsPerPage,
      (currentTicketsPage - 1) * ticketsPerPage + ticketsPerPage
    );
  }, [userTickets, currentTicketsPage]);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Tickets</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Project</th>
                    <th scope="col">Ticket</th>
                    <th scope="col">Status</th>
                    <th scope="col">Days Outstanding</th>
                    <th scope="col">Priority</th>
                    {/* <th scope="col" /> */}
                  </tr>
                </thead>
                <tbody>
                  {ticketsData.map((ticket, key) => {
                    return (
                      <tr key={key} id={ticket.id}>
                        <th scope="row">
                          <Media>
                            <span className="mb-0 text-sm">
                              {ticket.project_name}
                            </span>
                          </Media>
                        </th>
                        <td>{ticket.title}</td>
                        <td>{ticket.status}</td>
                        <td>{timeOutstanding(ticket.created_at)}</td>
                        <td>{ticket.priority}</td>
                        {/* <td className="text-right">
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
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <PaginationComponent
                  total={totalTickets}
                  itemsPerPage={ticketsPerPage}
                  currentPage={currentTicketsPage}
                  onPageChange={(page) => setCurrentTicketsPage(page)}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tickets;
