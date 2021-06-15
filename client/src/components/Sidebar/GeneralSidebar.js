/*eslint-disable*/
import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const GeneralSidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "general" && prop.display) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.root + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    props.setAuth(false);
    props.setAuthLevel("");
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {/* Divider */}
          <hr className="my-3" />
          <Row className="justify-content-center">
            <Button color="danger" onClick={logout}>
              Logout
            </Button>
          </Row>
        </Collapse>
      </Container>
    </Navbar>
  );
};

GeneralSidebar.defaultProps = {
  routes: [{}],
};

GeneralSidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default GeneralSidebar;
