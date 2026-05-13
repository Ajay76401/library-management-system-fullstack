import { useState } from 'react';
import { Plus, Pencil, Trash2, PenTool } from 'lucide-react';

export default function Authors({ data, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [editAuthor, setEditAuthor] = useState(null);
  const [form, setForm] = useState({});

  const openAdd = () => {
    setEditAuthor(null);
    setForm({ name: '', nationality: '', bio: '' });
    setShowModal(true);
  };

  const openEdit = (author) => {
    setEditAuthor(author);
    setForm({ ...author });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editAuthor) {
      const updated = data.authors.map(a => a.id === editAuthor.id ? { ...a, ...form } : a);
      onUpdate({ ...data, authors: updated });
    } else {
      const newA = { ...form, id: Date.now(), bookCount: 0 };
      onUpdate({ ...data, authors: [...data.authors, newA] });
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this author?')) {
      onUpdate({ ...data, authors: data.authors.filter(a => a.id !== id) });
    }
  };

  const bookCountForAuthor = (authorId) => data.books.filter(b => b.authorId === authorId).length;

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Authors</h1>
          <p className="page-subtitle">The voices behind every page on the shelf.</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Author
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {data.authors.map(author => {
          const count = bookCountForAuthor(author.id);
          return (
            <div key={author.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <PenTool size={20} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, fontSize: 18 }}>{author.name}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{count} {count === 1 ? 'book' : 'books'}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 2 }}>
                    {author.nationality}
                  </div>
                </div>
              </div>
              <div className="divider" />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{author.bio}</span>
                <div style={{ display: 'flex', gap: 2 }}>
                  <button className="btn-icon" onClick={() => openEdit(author)}><Pencil size={14} /></button>
                  <button className="btn-icon danger" onClick={() => handleDelete(author.id)}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          );
        })}
        {data.authors.length === 0 && <div className="empty-state" style={{ gridColumn: '1/-1' }}>No authors yet.</div>}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">{editAuthor ? 'Edit Author' : 'Add Author'}</h2>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-input" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Nationality</label>
              <input className="form-input" value={form.nationality || ''} onChange={e => setForm({ ...form, nationality: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Bio / Description</label>
              <input className="form-input" value={form.bio || ''} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Short description…" />
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>{editAuthor ? 'Save Changes' : 'Add Author'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
