import { useState } from 'react';
import { Search, Plus, Pencil, Trash2, BookOpen } from 'lucide-react';

export default function Books({ data, onUpdate }) {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [form, setForm] = useState({});

  const filtered = data.books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.authorName.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase()) ||
    b.isbn.includes(search)
  );

  const openAdd = () => {
    setEditBook(null);
    setForm({ title: '', authorId: '', publisherId: '', year: '', isbn: '', category: '', totalCopies: 1 });
    setShowModal(true);
  };

  const openEdit = (book) => {
    setEditBook(book);
    setForm({ ...book });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title) return;
    const author = data.authors.find(a => a.id === parseInt(form.authorId));
    const publisher = data.publishers.find(p => p.id === parseInt(form.publisherId));
    if (editBook) {
      const updated = data.books.map(b => b.id === editBook.id
        ? { ...b, ...form, authorId: parseInt(form.authorId), publisherId: parseInt(form.publisherId), authorName: author?.name || b.authorName, publisherName: publisher?.name || b.publisherName, totalCopies: parseInt(form.totalCopies), availableCopies: parseInt(form.totalCopies) }
        : b);
      onUpdate({ ...data, books: updated });
    } else {
      const newBook = {
        ...form, id: Date.now(), authorId: parseInt(form.authorId), publisherId: parseInt(form.publisherId),
        authorName: author?.name || '', publisherName: publisher?.name || '',
        totalCopies: parseInt(form.totalCopies) || 1, availableCopies: parseInt(form.totalCopies) || 1
      };
      onUpdate({ ...data, books: [...data.books, newBook] });
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this book?')) {
      onUpdate({ ...data, books: data.books.filter(b => b.id !== id) });
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Catalog</h1>
          <p className="page-subtitle">Every book, every copy. Search the shelves and curate your collection.</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Book
        </button>
      </div>

      <div className="search-wrapper">
        <Search className="search-icon" />
        <input
          className="search-input"
          placeholder="Search by title, ISBN, category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {filtered.map(book => (
          <div key={book.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{
              background: 'var(--green-dark)', height: 160,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <BookOpen size={44} color="rgba(200,135,42,0.7)" />
            </div>
            <div style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontWeight: 600, fontSize: 15, flex: 1, paddingRight: 8 }}>{book.title}</div>
                <span className="badge badge-available" style={{ flexShrink: 0 }}>
                  {book.availableCopies > 0 ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10 }}>
                {book.authorName} · {book.year}
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                <span style={{ background: 'var(--cream-dark)', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 500 }}>{book.category}</span>
                <span style={{ background: 'var(--cream-dark)', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 500 }}>{book.publisherName}</span>
              </div>
              <div className="divider" style={{ margin: '0 0 10px' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {book.availableCopies}/{book.totalCopies} copies · {book.isbn}
                </span>
                <div style={{ display: 'flex', gap: 2 }}>
                  <button className="btn-icon" onClick={() => openEdit(book)}><Pencil size={14} /></button>
                  <button className="btn-icon danger" onClick={() => handleDelete(book.id)}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="empty-state" style={{ gridColumn: '1/-1' }}>No books found.</div>}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">{editBook ? 'Edit Book' : 'Add Book'}</h2>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input className="form-input" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Author</label>
                <select className="form-select" value={form.authorId || ''} onChange={e => setForm({ ...form, authorId: e.target.value })}>
                  <option value="">Select author</option>
                  {data.authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Publisher</label>
                <select className="form-select" value={form.publisherId || ''} onChange={e => setForm({ ...form, publisherId: e.target.value })}>
                  <option value="">Select publisher</option>
                  {data.publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Year</label>
                <input className="form-input" type="number" value={form.year || ''} onChange={e => setForm({ ...form, year: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Copies</label>
                <input className="form-input" type="number" min="1" value={form.totalCopies || 1} onChange={e => setForm({ ...form, totalCopies: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">ISBN</label>
              <input className="form-input" value={form.isbn || ''} onChange={e => setForm({ ...form, isbn: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input className="form-input" value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Fiction, Non-Fiction, Sci-Fi…" />
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>{editBook ? 'Save Changes' : 'Add Book'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
