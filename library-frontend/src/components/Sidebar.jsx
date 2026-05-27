import {
  LayoutDashboard,
  BookOpen,
  Users,
  PenTool,
  Building2,
  BookMarked,
  Receipt
} from 'lucide-react';

import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/books', label: 'Books', icon: BookOpen },
  { path: '/members', label: 'Members', icon: Users },
  { path: '/authors', label: 'Authors', icon: PenTool },
  { path: '/publishers', label: 'Publishers', icon: Building2 },
  { path: '/loans', label: 'Loans', icon: BookMarked },
  { path: '/fines', label: 'Fines', icon: Receipt },
];

export default function Sidebar() {

  return (

    <aside className="sidebar">

      <div className="sidebar-logo">

        <div className="logo-icon">A</div>

        <div className="logo-text">
          <span className="logo-name">Library</span>
          <span className="logo-sub">Management System</span>
        </div>

      </div>

      <div className="sidebar-section-label">
        Manage
      </div>

      <nav className="sidebar-nav">

        {navItems.map(({ path, label, icon: Icon }) => (

          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >

            <Icon />

            <span>{label}</span>

          </NavLink>

        ))}

      </nav>

    </aside>
  );
}