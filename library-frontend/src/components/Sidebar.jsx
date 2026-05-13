import { LayoutDashboard, BookOpen, Users, PenTool, Building2, BookMarked, Receipt } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'books', label: 'Books', icon: BookOpen },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'authors', label: 'Authors', icon: PenTool },
  { id: 'publishers', label: 'Publishers', icon: Building2 },
  { id: 'loans', label: 'Loans', icon: BookMarked },
  { id: 'fines', label: 'Fines', icon: Receipt },
];

export default function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">A</div>
        <div className="logo-text">
          <span className="logo-name">Library</span>
          <span className="logo-sub">Management System</span>
        </div>
      </div>

      <div className="sidebar-section-label">Manage</div>

      <nav className="sidebar-nav">
        {navItems.map(({ id, label, icon: Icon }) => (
          <div
            key={id}
            className={`nav-item ${currentPage === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <Icon />
            <span>{label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
