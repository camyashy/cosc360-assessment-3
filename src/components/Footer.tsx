import { Container } from 'react-bootstrap';

// Do I need to change the container border?

export default function Footer() {
    return (

        <footer className="border-top text-center py-4">
            <Container fluid>
                <p className="mb-0 text-secondary footer-fs">&copy; 2025 Assignment 3 COSC360 Camillie Ashmore</p>
            </Container>
        </footer>
    )
}