import React, { useEffect, useState } from "react";

// reactstrap components
import {
  // Badge,
  Card,
  CardHeader,
  // CardFooter,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  // Media,
  // Pagination,
  // PaginationItem,
  // PaginationLink,
  // Progress,
  // Table,
  Container,
  Row,
  Col,
  // UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import API from "../utils/API";

const Administration = () => {
  const [allDevs, setAllDevs] = useState([]);
  const [dev, setDev] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    const fetchOrganization = async () => {
      try {
        const organization = await API.getUsers(abortController);

        setAllDevs(organization);

        console.log(organization);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrganization();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>Organization</CardHeader>
              <ul>
                {allDevs.map((dev, key) => {
                  return (
                    <li
                      key={key}
                      id={dev.id}
                      onClick={() => {
                        setDev(dev);
                      }}
                    >
                      {dev.first_name} {dev.last_name}
                    </li>
                  );
                })}
              </ul>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>Developer</CardHeader>
              {dev ? <h4>{dev.first_name}</h4> : <h4>No Dev Selected</h4>}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Administration;
