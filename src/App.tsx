import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* This sets the layout */}
        <Route path="/" element={<Layout />}>
          {/* These child elements wil be rendered inside layout's <Outlet>*/}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
