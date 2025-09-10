import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PostDetail from "./pages/PostDetail";
import LogIn from "./pages/LogIn";
import PostList from './pages/PostList';
import UpdatePost from './pages/UpdatePost';
import CreatePost from './pages/CreatePost';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';


export default function App() {
  // Do I need to add route validation here?
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* This sets the layout */}
          <Route path="/" element={<Layout />}>
            {/* These child elements wil be rendered inside layout's <Outlet>*/}
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/user/:id" element={<PostList />} />
            <Route path="/post/edit/:id" element={<UpdatePost />} />
            <Route path="/post/create" element={<CreatePost />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}
