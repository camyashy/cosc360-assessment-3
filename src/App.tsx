import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PostDetail from "./pages/PostDetail";
import LogIn from "./pages/LogIn";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* This sets the layout */}
        <Route path="/" element={<Layout />}>
          {/* These child elements wil be rendered inside layout's <Outlet>*/}
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/login" element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
