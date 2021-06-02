import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

import {
  Card,
  CardHeader,
  Row,
  Nav,
  NavItem,
  NavLink,
  CardBody,
} from "reactstrap";

function TicketsByType({ userTickets }) {
  const [ticketTypesQuantities, setTicketTypeQuantities] = useState([]);

  //capitalization function
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    console.log(userTickets);

    let typeMap = {}; //{ticketType: quantity}

    userTickets.forEach((ticket) => {
      if (typeMap[capitalize(ticket.type)]) {
        typeMap[capitalize(ticket.type)]++;
      } else {
        typeMap[capitalize(ticket.type)] = 1;
      }
    });

    console.log(typeMap);
    setTicketTypeQuantities(Object.entries(typeMap));

    console.log(ticketTypesQuantities);
  }, [userTickets]);

  return (
    <div>
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <Row className="align-items-center">
            <div className="col">
              <h6 className="text-uppercase text-muted ls-1 mb-1">
                Performance
              </h6>
              <h2 className="mb-0">Tickets by Type</h2>
            </div>
          </Row>
        </CardHeader>
        <CardBody>
          <Chart
            // width={"500px"}
            // height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={
              ticketTypesQuantities.length > 0
                ? [
                    ["Ticket Type", "Number of Tickets"],
                    ...ticketTypesQuantities,
                  ]
                : ["Ticket Type", "Number of Tickets"]
            }
            options={{
              title: "My Daily Activities",
            }}
            rootProps={{ "data-testid": "1" }}
          />
        </CardBody>
      </Card>
    </div>
  );
}

export default TicketsByType;
