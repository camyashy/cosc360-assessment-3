import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export default function NavBar() {

    const { user, logout } = useAuth();



    // Need to add some kind of functionality here to then send a message to database to log out user
    /*const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_id");
        window.location.href = "/";
    };*/

    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container fluid className="navbar-padding">
                {/* Brand/Logo - links to homepage */}
                <Navbar.Brand as={Link} to="/">Assignment 3 COSC360</Navbar.Brand>

                {/* Collapsible content */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">

                        <Nav.Link as={Link} to="/">All Posts</Nav.Link>

                        {user && <Nav.Link as={Link} to={`/user/${user.id}`}>Dashboard</Nav.Link>}

                        {!user && <NavDropdown title="Not Logged In" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/login">Log In</NavDropdown.Item>
                        </NavDropdown>}

                        {user && <NavDropdown title={`${user.name}`} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                        </NavDropdown>}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}