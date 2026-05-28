import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, PenTool } from 'lucide-react';
import { apiFetch } from '../api/api'

export default function Authors({ data, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [editAuthor, setEditAuthor] = useState(null);
  const [form, setForm] = useState({});
  const [authors, setAuthors] = useState([]);
  const[books, setBooks] = useState([]);
  
useEffect(() => {
  fetchBooks();
}, []);

const fetchBooks = async () => {
  
 try {
    const res = await apiFetch("/books")
    setBooks(res);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
   fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
  try {
    const response = await apiFetch("/authors");
    setAuthors(response);
  } catch (error) {
    console.log(error);
  }
};

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

  const handleSave = async() => {
    if (!form.name || !form.nationality || !form.bio) {
        alert("Please fill all fields");
       return;
    }
     
    try{
      if (editAuthor) {
      await  apiFetch(`/updateauthor/${editAuthor.id}`,{
        method:"PUT",
        body: JSON.stringify(form)
     })
    } else {
     await apiFetch("/addauthor" ,{
      method :"POST",
       body: JSON.stringify(form)
     });
    }
     fetchAuthors();
    setShowModal(false);
  }
  catch(error){
     console.log(error)
  }
}

 const handleDelete = async (id) => {

  if (confirm('Delete this author?')) {
    try {
      await apiFetch(`/removeauthor/${id}`, {
        method: 'DELETE'
      });
      fetchAuthors();
    } catch (error) {
      console.log(error);
  }
  }
};
  
const bookCountForAuthor = (authorId) => books.filter(book =>book.authors?.some(author => author.id === authorId)).length;
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
        {authors.map(author => {
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
        {authors.length === 0 && <div className="empty-state" style={{ gridColumn: '1/-1' }}>No authors yet.</div>}
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
              <input 
              className="form-input"
              required
               value={form.nationality || ''} onChange={e => setForm({ ...form, nationality: e.target.value })} />
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
