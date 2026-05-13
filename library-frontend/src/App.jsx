import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Books from './pages/Books.jsx';
import Members from './pages/Members.jsx';
import Authors from './pages/Authors.jsx';
import Publishers from './pages/Publishers.jsx';
import Loans from './pages/Loans.jsx';
import Fines from './pages/Fines.jsx';
import { initialData } from './data/store.js';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [data, setData] = useState(initialData);

  const renderPage = () => {
    const props = { data, onUpdate: setData, onNavigate: setPage };
    switch (page) {
      case 'dashboard': return <Dashboard {...props} />;
      case 'books': return <Books {...props} />;
      case 'members': return <Members {...props} />;
      case 'authors': return <Authors {...props} />;
      case 'publishers': return <Publishers {...props} />;
      case 'loans': return <Loans {...props} />;
      case 'fines': return <Fines {...props} />;
      default: return <Dashboard {...props} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar currentPage={page} onNavigate={setPage} />
      <div className="main-content">
        <Topbar currentPage={page} />
        {renderPage()}
      </div>
    </div>
  );
}
