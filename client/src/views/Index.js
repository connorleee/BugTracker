import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import ProjectsTable from "../components/Tables/ProjectsTable";
import TicketsPieChart from "components/Charts/TicketsPieChart";
import API from "../utils/API";

const Index = (props) => {
  const [userTickets, setUserTickets] = useState([]);
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  useEffect(() => {
    //flag for async useEffect cleanup
    const abortController = new AbortController();

    //TODO: fetch user tickets. create backend and front end route
    async function fetchUserTickets() {
      try {
        const userTicketsRes = await (
          await API.getUserTickets(abortController)
        ).json();

        setUserTickets(userTicketsRes);
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.log("Error fetching user tickets", err);
        }
      }
    }

    fetchUserTickets();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 h-100" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <ProjectsTable />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xl="4">
            <TicketsPieChart userTickets={userTickets} focus={"type"} />
          </Col>
          <Col xl="4">
            <TicketsPieChart userTickets={userTickets} focus={"priority"} />
          </Col>
          <Col xl="4">
            <TicketsPieChart userTickets={userTickets} focus={"status"} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
