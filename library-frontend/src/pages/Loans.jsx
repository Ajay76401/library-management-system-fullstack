  import { useEffect, useState } from 'react';
  import { Plus, Calendar, BookMarked, RotateCcw } from 'lucide-react';

  export default function Loans({ data, onUpdate }) {
    const [tab, setTab] = useState('active');
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({});
    const[loans,setLoans]=useState([]);
    const[availableBooks,setAvailableBooks]=useState([]);
    const[activeMembers,setActiveMembers]=useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
      fetch(`http://localhost:8080/availablebooks`)
      .then(res => res.json())
      .then(books => setAvailableBooks(books))
      .catch(err => console.error('Error fetching available books:', err));
    }, []);

    useEffect(() => {
      fetch(`http://localhost:8080/activemembers`)
      .then(res => res.json())
      .then(members => setActiveMembers(members))
      .catch(err => console.error('Error fetching active members:', err));
    }, []);

    useEffect(() => {
      fetch(`http://localhost:8080/loans`)
      .then(res => res.json())
      .then(loans =>setLoans(loans))
      .catch(err => console.error('Error fetching loans:', err));
    }, []);
    

    const active = loans.filter(l => l.status !== 'Returned');
    const history = loans.filter(l => l.status === 'Returned');

    const handleReturn = async (loanId) => {
    try {
      await fetch(`http://localhost:8080/returnloan/${loanId}`,{method: "PUT"});
      const res = await fetch("http://localhost:8080/loans");
      const data = await res.json();
      setLoans(data);
    } catch(error) {
      console.log(error);
      alert("Failed to return book");
    }
  };

  const openIssue = () => {
      const today = new Date().toISOString().slice(0, 10);
      const due = new Date();
      due.setDate(due.getDate() + 14);
      setForm({ bookId: '', memberId: '', issuedDate: today, dueDate: due.toISOString().slice(0, 10) });
      setShowModal(true);
    };

  const handleIssue = async () => {
    if (!form.bookId || !form.memberId) {
      alert("Please select book and member");
      return;
    }
    try {
      await fetch(
        "http://localhost:8080/addloan",{
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            bookId: Number(form.bookId),
            memberId:Number(form.memberId),
            issueDate:form.issuedDate,
            dueDate:form.dueDate
          })
        }
      );
     const res = await fetch("http://localhost:8080/loans");
      const updatedLoans = await res.json();
      setLoans(updatedLoans);
      setShowModal(false);
      window.location.reload();
    } catch(error) {
      console.log(error);
      alert("Failed to issue book");
    }
  };

    const displayLoans =(tab === 'active'? active: history).filter(loan =>
        loan.member?.name?.toLowerCase().includes(search.toLowerCase())||
        loan.bookcopy?.book?.title?.toLowerCase().includes(search.toLowerCase())||
        loan.status?.toLowerCase().includes(search.toLowerCase())
      );

    const statusIcon = (status) => {
      if (status === 'Overdue') return <span className="badge badge-overdue">{status}</span>;
      if (status === 'Issued') return <span className="badge badge-issued">{status}</span>;
      return <span className="badge badge-returned">{status}</span>;
    };

    return (
      <div className="page-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Loans</h1>
            <p className="page-subtitle">Issue books, track returns, and let overdue fines compute themselves.</p>
          </div>
          <button className="btn-primary" onClick={openIssue}>
            <Plus size={16} /> Issue Book
          </button>
        </div>
      <div className="search-wrapper">
        <input className="search-input"placeholder="Search by member, book or status..."
              value={search} onChange={e =>setSearch(e.target.value)}/>
        </div>
        <div className="tabs">
          <button className={`tab ${tab === 'active' ? 'active' : ''}`} onClick={() => setTab('active')}>
            Active ({active.length})
          </button>
          <button className={`tab ${tab === 'history' ? 'active' : ''}`} onClick={() => setTab('history')}>
            History ({history.length})
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {displayLoans.map(loan => (
            <div key={loan.id} className="card" style={{
              display: 'flex', alignItems: 'center', gap: 16,
              borderColor: loan.status === 'Overdue' ? '#f5c6c2' : 'var(--border)',
              background: loan.status === 'Overdue' ? 'var(--red-light)' : 'var(--card-bg)',
              padding: '18px 24px'
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 8, flexShrink: 0,
                background: loan.status === 'Overdue' ? '#fdecea' : 'var(--cream-dark)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <BookMarked size={18} color={loan.status === 'Overdue' ? 'var(--red)' : 'var(--text-muted)'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{loan.bookcopy?.book?.title}</span>
                  {statusIcon(loan.status)}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Loaned to <strong>{loan.member?.name}</strong></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                  <Calendar size={11} />
                  Issued {loan.issuedate} · Due {loan.duedate}
                  {loan.returndate && ` · Returned ${loan.returndate}`}
                </div>
              </div>
              {tab === 'active' && (
                <button className="btn-green" onClick={() => handleReturn(loan.id)}>
                  <RotateCcw size={14} /> Return
                </button>
              )}
            </div>
          ))}
          {displayLoans.length === 0 && <div className="empty-state">No loans to display.</div>}
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2 className="modal-title">Issue Book</h2>
              <div className="form-group">
                <label className="form-label">Book</label>
                <select className="form-select" value={form.bookId || ''} onChange={e => setForm({ ...form, bookId: e.target.value })}>
                  <option value="">Select book</option>
                  {availableBooks.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.title}
                      ({ b.bookCopies?.filter( c => c.status === "Available" ).length} available)
                    </option>
                ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Member</label>
                <select className="form-select" value={form.memberId || ''} onChange={e => setForm({ ...form, memberId: e.target.value })}>
                  <option value="">Select member</option>
                  {activeMembers.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Issue Date</label>
                  <input className="form-input" type="date" value={form.issuedDate} onChange={e => setForm({ ...form, issuedDate: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input className="form-input" type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-primary" onClick={handleIssue}>Issue Book</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
