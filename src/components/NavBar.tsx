import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

// Can we change the title of dropdown depending on whether or not the user is logged in
// "Not Logged In" click on dropdown login
// "User Name" click on dropdown logout
// If not logged in only "view" action

// Dashboard option only appears when logged in

export default function NavBar() {

    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container fluid className="navbar-padding">
                {/* Brand/Logo - links to homepage */}
                <Navbar.Brand as={Link} to="/">Assignment 3 COSC360</Navbar.Brand>

                {/* Collapsible content */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {/* Navigation Links */}
                        <Nav.Link as={Link} to="/user/:id">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/">All Posts</Nav.Link>
                        <NavDropdown title="Not Logged In" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/login">Log In</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}