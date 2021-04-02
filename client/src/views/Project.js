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
  Container,
  //   UncontrolledTooltip,
} from "reactstrap";

import Header from "../components/Headers/Header";

// import API from "../utils/API";

const Project = (props) => {
  console.log(props.match.params.id);

  return (
    <>
      <Header />
      <h1>Project</h1>
    </>
  );
};

export default Project;
