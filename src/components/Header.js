import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

function Header(props) {
  const { logout } = useContext(UserContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">User App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-flex jutify-conten-between"
        >
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            <NavLink to="/user" className="nav-link">
              Manager User
            </NavLink>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link onClick={() => handleLogout()} className="nav-link">
              <span className="me-2">Logout</span>
              <i className="fa-solid fa-right-from-bracket"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
