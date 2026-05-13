import { useState } from 'react';
import { Plus, Calendar, BookMarked, RotateCcw } from 'lucide-react';

export default function Loans({ data, onUpdate }) {
  const [tab, setTab] = useState('active');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({});

  const active = data.loans.filter(l => l.status !== 'Returned');
  const history = data.loans.filter(l => l.status === 'Returned');

  const handleReturn = (loanId) => {
    const today = new Date().toISOString().slice(0, 10);
    const loan = data.loans.find(l => l.id === loanId);
    if (!loan) return;

    // Calculate fine
    const due = new Date(loan.dueDate);
    const now = new Date(today);
    const diffDays = Math.max(0, Math.ceil((now - due) / (1000 * 60 * 60 * 24)));

    const updatedLoans = data.loans.map(l =>
      l.id === loanId ? { ...l, returnedDate: today, status: 'Returned' } : l
    );

    // Update book copies
    const updatedBooks = data.books.map(b =>
      b.id === loan.bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b
    );

    // Update member loan count
    const updatedMembers = data.members.map(m =>
      m.id === loan.memberId ? { ...m, activeLoans: Math.max(0, m.activeLoans - 1) } : m
    );

    let updatedFines = data.fines;
    if (diffDays > 0) {
      const newFine = {
        id: Date.now(), loanId, memberId: loan.memberId, memberName: loan.memberName,
        bookTitle: loan.bookTitle, overdueDays: diffDays, amount: diffDays, paid: false
      };
      updatedFines = [...data.fines, newFine];
    }

    onUpdate({ ...data, loans: updatedLoans, books: updatedBooks, members: updatedMembers, fines: updatedFines });
  };

  const openIssue = () => {
    const today = new Date().toISOString().slice(0, 10);
    const due = new Date();
    due.setDate(due.getDate() + 14);
    setForm({ bookId: '', memberId: '', issuedDate: today, dueDate: due.toISOString().slice(0, 10) });
    setShowModal(true);
  };

  const handleIssue = () => {
    if (!form.bookId || !form.memberId) return;
    const book = data.books.find(b => b.id === parseInt(form.bookId));
    const member = data.members.find(m => m.id === parseInt(form.memberId));
    if (!book || book.availableCopies < 1) { alert('Book not available'); return; }

    const newLoan = {
      id: Date.now(), bookId: book.id, bookTitle: book.title,
      memberId: member.id, memberName: member.name,
      issuedDate: form.issuedDate, dueDate: form.dueDate,
      returnedDate: null, status: 'Issued'
    };

    const updatedBooks = data.books.map(b =>
      b.id === book.id ? { ...b, availableCopies: b.availableCopies - 1 } : b
    );
    const updatedMembers = data.members.map(m =>
      m.id === member.id ? { ...m, activeLoans: m.activeLoans + 1 } : m
    );

    onUpdate({ ...data, loans: [...data.loans, newLoan], books: updatedBooks, members: updatedMembers });
    setShowModal(false);
  };

  const displayLoans = tab === 'active' ? active : history;

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
                <span style={{ fontWeight: 600, fontSize: 15 }}>{loan.bookTitle}</span>
                {statusIcon(loan.status)}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Loaned to <strong>{loan.memberName}</strong></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                <Calendar size={11} />
                Issued {loan.issuedDate} · Due {loan.dueDate}
                {loan.returnedDate && ` · Returned ${loan.returnedDate}`}
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
                {data.books.filter(b => b.availableCopies > 0).map(b => (
                  <option key={b.id} value={b.id}>{b.title} ({b.availableCopies} available)</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Member</label>
              <select className="form-select" value={form.memberId || ''} onChange={e => setForm({ ...form, memberId: e.target.value })}>
                <option value="">Select member</option>
                {data.members.filter(m => m.status === 'Active').map(m => (
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
