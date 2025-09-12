import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

// NavBar (deployed in layout)
export default function NavBar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Logout dropdown functionality
    const handleLogout = async () => {

        if (window.confirm("Are you sure you want to log out?")) {
            await logout();
            navigate("/");
        }
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container fluid className="navbar-padding">

                <Navbar.Brand as={Link} to="/">Assignment 3 COSC360</Navbar.Brand>

                {/* Collapsible content */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">

                        <Nav.Link as={Link} to="/">All Posts</Nav.Link>

                        {/* Only shows is a user is logged in */}
                        {user && <Nav.Link as={Link} to={`/user/${user.user_id}`}>Dashboard</Nav.Link>}

                        {/* Shows if a user is not logged in */}
                        {!user && <NavDropdown title="Not Logged In" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/login">Log In</NavDropdown.Item>
                        </NavDropdown>}

                        {/* Shows if a user is logged in */}
                        {user && <NavDropdown title={`${user.user_name}`} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                        </NavDropdown>}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}