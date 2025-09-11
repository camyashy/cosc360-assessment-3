import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export default function NavBar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {

        if (window.confirm("Are you sure you want to log out?")) {
            await logout();
            navigate("/");
        }
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container fluid className="navbar-padding">
                {/* Brand/Logo - links to homepage */}
                <Navbar.Brand as={Link} to="/">Assignment 3 COSC360</Navbar.Brand>

                {/* Collapsible content */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">

                        <Nav.Link as={Link} to="/">All Posts</Nav.Link>

                        {user && <Nav.Link as={Link} to={`/user/${user.user_id}`}>Dashboard</Nav.Link>}

                        {!user && <NavDropdown title="Not Logged In" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/login">Log In</NavDropdown.Item>
                        </NavDropdown>}

                        {user && <NavDropdown title={`${user.user_name}`} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                        </NavDropdown>}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}