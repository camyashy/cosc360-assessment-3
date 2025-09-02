import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

// Can we change the title of dropdown depending on whether or not the user is logged in
// "Not Logged In" click on dropdown login
// "User Name" click on dropdown logout
// If not logged in only "view" action

// Look at mobile view and centring

export default function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container fluid className="navbar-padding">
                {/* Brand/Logo - links to homepage */}
                <Navbar.Brand as={Link} to="/">Assignment 3 COSC360</Navbar.Brand>

                {/* Hamburger Menu Toggle for mobile */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                {/* Collapsible content */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto"> {/* ms-auto pushes links to the right */}
                        {/* Navigation Links */}
                        <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/all">Posts</Nav.Link>
                        <NavDropdown title="Admin User" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}