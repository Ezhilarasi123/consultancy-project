import React from "react";
import { Container, Navbar, Nav, Button, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Sri Madhura Engineering</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/services">Services</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container className="text-center mt-5">
        <Row className="align-items-center">
          <Col>
            <h1>Welcome to Sri Madhura Engineering</h1>
            <p>We provide the best engineering solutions for your business.</p>
            <Button variant="primary">Get Started</Button>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3 mt-5">
        <p>© 2024 Sri Madhura Engineering. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Home;
