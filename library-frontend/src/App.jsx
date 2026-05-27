import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';

import Dashboard from './pages/Dashboard.jsx';
import Books from './pages/Books.jsx';
import Members from './pages/Members.jsx';
import Authors from './pages/Authors.jsx';
import Publishers from './pages/Publishers.jsx';
import Loans from './pages/Loans.jsx';
import Fines from './pages/Fines.jsx';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

import { useState } from 'react';
import { initialData } from './data/store.js';

function Layout() {

  return (

    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        <Outlet />

      </div>

    </div>
  );
}

export default function App() {

  const [data, setData] = useState(initialData);

  const props = {
    data,
    onUpdate: setData
  };

  return (

    <BrowserRouter>

      <Routes>

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Layout Routes */}
       <Route element={<Layout />}>
          <Route path="/" element={<Dashboard {...props} />} />

          <Route path="/books" element={<Books {...props} />} />

          <Route path="/members" element={<Members {...props} />} />

          <Route path="/authors" element={<Authors {...props} />} />

          <Route path="/publishers" element={<Publishers {...props} />} />

          <Route path="/loans" element={<Loans {...props} />} />

          <Route path="/fines" element={<Fines {...props} />} />

        </Route>

        {/* Invalid Routes */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>
  );
}