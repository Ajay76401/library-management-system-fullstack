import axios from 'axios';
import { PanelLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PAGE_LABELS = {
  dashboard: 'Dashboard',
  books: 'Library Management',
  members: 'Library Management',
  authors: 'Library Management',
  publishers: 'Library Management',
  loans: 'Library Management',
  fines: 'Library Management',
};

export default function Topbar({ currentPage }) {
    const navigate = useNavigate()
    const handleLogout = async () => {
    try {
    await axios.post(
      `https://library-management-system-fullstack-1.onrender.com/logout`,
      {},
      {
        withCredentials: true
      }
    )

    navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="topbar">
      <div className="topbar-breadcrumb">
        <PanelLeft size={16} />
        <span>Library</span>
        <span>/</span>
        <span className="current">{PAGE_LABELS[currentPage]}</span>
      </div>
      <button
        onClick={handleLogout}
        className="logout-btn"
      >
        <LogOut size={16} />
        Logout
      </button>
      
    </div>
  );
}
