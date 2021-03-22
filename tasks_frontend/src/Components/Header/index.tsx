import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Tasks</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Item as={Link} className="nav-link" to="/">
          Home
        </Nav.Item>
        <Nav.Item as={Link} className="nav-link" to="/tarefas">
          Tarefas
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Header;
