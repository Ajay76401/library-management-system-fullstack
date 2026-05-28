import { useState ,useEffect } from 'react';
import { Search, Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import { apiFetch } from '../api/api'

export default function Books({ data, onUpdate }) {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [form, setForm] = useState({});
  const [books,setBooks] = useState([]);
  const [authors,setAuthors] = useState([]);  
  const [publishers,setPublishers] = useState([]);

  useEffect(() => {
   apiFetch(`/authors`)
    .then(data => setAuthors(data))
    .catch(error => console.log(error));
  }, []);     

  useEffect(() => {
    apiFetch(`/publishers`)
     .then(data => setPublishers(data))
     .catch(error => console.log(error));
  }, []);

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


 const filtered = books.filter(b =>
  b.title?.toLowerCase().includes(search.toLowerCase()) ||
  b.category?.toLowerCase().includes(search.toLowerCase()) ||
  b.isbn?.includes(search) ||
  b.authors?.some(a =>
    a.name?.toLowerCase().includes(search.toLowerCase())
  )
);

  const openAdd = () => {
    setEditBook(null);
    setForm({ title: '', authorId: '', publisherId: '', year: '', isbn: '', category: '', totalCopies: 1 });
    setShowModal(true);
  };

  const openEdit = (book) => {
    setEditBook(book);
    
    setForm({
      ...book,
      authorId: book.authors?.[0]?.id || '',
      publisherId: book.publisher?.id || '',
      year: book.yop
    });
      setShowModal(true);
  };

  const handleSave = async () => {
    if (
        !form.title ||
        !form.authorId ||
        !form.publisherId ||
        !form.year  ||
        !form.category
      ){
        alert("Please fill all fields");
        return;
      }

    const currentYear = new Date().getFullYear();

    if (form.year < 1900 || form.year > currentYear) {
      alert(`Year must be between 1900 and ${currentYear}`);
      return;
    }  

      try {
        const bookData = {
          title: form.title,
          yop: Number(form.year),
          isbn: form.isbn,
          category: form.category,
          price: 0,
          publisherId: Number(form.publisherId),
          authorId: Number(form.authorId),
         
        };
        console.log(bookData);
        // UPDATE BOOK
        if (editBook) {
          await apiFetch(`/updatebook/${editBook.id}`, {
            method: "PUT",
            body: JSON.stringify(bookData)
          });
        }
        // ADD BOOK
        else {
            bookData.totalCopies = Number(form.totalCopies);
            await apiFetch("/addbook", {
            method: "POST",
            body: JSON.stringify(bookData)
          });

        }
        // REFRESH UI
        await fetchBooks();
        
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
};

 const handleDelete = async (id) => {
  if (confirm('Delete this book?')) {
    try {
      await apiFetch( `/removebook/${id}`, { method: "DELETE" })
      await fetchBooks()
    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    }
  }
}

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
                 {
                book.bookCopies?.some(c => c.status === "Available")
                  ? 'Available'
                  : 'Unavailable'
                }
                </span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10 }}>
                {book.authors?.map(a => a.name).join(", ")} · {book.yop}
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                <span style={{ background: 'var(--cream-dark)', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 500 }}>{book.category}</span>
                <span style={{ background: 'var(--cream-dark)', borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 500 }}>{book.publisher?.name}</span>
              </div>
              <div className="divider" style={{ margin: '0 0 10px' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {book.bookCopies?.filter(copy => copy.status === "Available").length}/{book.bookCopies?.length} copies · {book.isbn}
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
                  {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Publisher</label>
                <select className="form-select" value={form.publisherId || ''} onChange={e => setForm({ ...form, publisherId: e.target.value })}>
                  <option value="">Select publisher</option>
                  {publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
             <div className="form-group">
              <label className="form-label">Year</label>

              <input
                className="form-input"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                required
                value={form.year || ''}
                onChange={e =>
                  setForm({ ...form, year: e.target.value })
                }
              />
            </div>
              {!editBook && (
              <div className="form-group">
                <label className="form-label">Copies</label>
                <input className="form-input" type="number" min="1" max="500" value={form.totalCopies || 1} onChange={e => setForm({ ...form, totalCopies: e.target.value })} />
              </div>
              )}
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
