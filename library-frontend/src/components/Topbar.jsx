import { PanelLeft } from 'lucide-react';

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
  return (
    <div className="topbar">
      <div className="topbar-breadcrumb">
        <PanelLeft size={16} />
        <span>Library</span>
        <span>/</span>
        <span className="current">{PAGE_LABELS[currentPage]}</span>
      </div>
      <div className="system-status">
        <div className="status-dot" />
        System online
      </div>
    </div>
  );
}
