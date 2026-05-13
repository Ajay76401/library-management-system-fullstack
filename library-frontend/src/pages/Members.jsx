import { useState } from 'react';
import { Search, Plus, Pencil, Trash2, Mail, Phone } from 'lucide-react';

export default function Members({ data, onUpdate }) {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [form, setForm] = useState({});

  const filtered = data.members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditMember(null);
    setForm({ name: '', email: '', phone: '', status: 'Active' });
    setShowModal(true);
  };

  const openEdit = (member) => {
    setEditMember(member);
    setForm({ ...member });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editMember) {
      const updated = data.members.map(m => m.id === editMember.id ? { ...m, ...form } : m);
      onUpdate({ ...data, members: updated });
    } else {
      const newM = { ...form, id: Date.now(), joinedDate: new Date().toISOString().slice(0, 10), activeLoans: 0 };
      onUpdate({ ...data, members: [...data.members, newM] });
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this member?')) {
      onUpdate({ ...data, members: data.members.filter(m => m.id !== id) });
    }
  };

  const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Members</h1>
          <p className="page-subtitle">The readers who bring the library to life.</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Member
        </button>
      </div>

      <div className="search-wrapper">
        <Search className="search-icon" />
        <input className="search-input" placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filtered.map(member => (
          <div key={member.id} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 46, height: 46, borderRadius: '50%',
                background: member.status === 'Suspended' ? '#d14040' : 'var(--green-dark)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 15, flexShrink: 0
              }}>
                {initials(member.name)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{member.name}</span>
                  <span className={`badge ${member.status === 'Suspended' ? 'badge-suspended' : 'badge-active'}`}>
                    {member.status}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                  <Mail size={11} /> {member.email}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  <Phone size={11} /> {member.phone}
                </div>
              </div>
            </div>
            <div className="divider" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Joined {member.joinedDate} · {member.activeLoans} active loan{member.activeLoans !== 1 ? 's' : ''}
              </span>
              <div style={{ display: 'flex', gap: 2 }}>
                <button className="btn-icon" onClick={() => openEdit(member)}><Pencil size={14} /></button>
                <button className="btn-icon danger" onClick={() => handleDelete(member.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="empty-state" style={{ gridColumn: '1/-1' }}>No members found.</div>}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">{editMember ? 'Edit Member' : 'Add Member'}</h2>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-input" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status || 'Active'} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option>Active</option>
                <option>Suspended</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>{editMember ? 'Save Changes' : 'Add Member'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
