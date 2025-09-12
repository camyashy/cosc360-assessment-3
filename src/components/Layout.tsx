import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

// Page layout (page content displays in the Outlet component)
export default function Layout() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );

}