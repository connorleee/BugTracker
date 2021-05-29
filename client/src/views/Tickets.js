import React, { useEffect, useState, useMemo } from "react";
import API from "../utils/API";
import moment from "moment";
import PaginationComponent from "../components/Tables/PaginationComponent";
import "./Tables.css";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";

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
    //flag for async useEffect cleanup
    let isRendered = true;

    //TODO: fetch user tickets. create backend and front end route
    async function fetchUserTickets() {
      try {
        const userTicketsRes = await (await API.getUserTickets()).json();

        if (isRendered === true) setUserTickets(userTicketsRes);
      } catch (err) {
        console.log("Error fetching user tickets", err);
      }
    }

    fetchUserTickets();

    return () => {
      isRendered = false;
    };
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
                      <tr key={key} id={ticket.id} className="ticketRow">
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
