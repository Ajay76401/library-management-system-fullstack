import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Building2 } from 'lucide-react';

export default function Publishers({ data, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [editPublisher, setEditPublisher] = useState(null);
  const [form, setForm] = useState({});
  const [publishers , setPublishers] = useState([])

  useEffect(()=>{
    fetch("http://localhost:8080/publishers")
    .then(res => res.json())
    .then(data => setPublishers(data))
    .catch(err => console.log(err))
  },[])

  const openAdd = () => {
    setEditPublisher(null);
    setForm({ name: '', address: '', phone: '' });
    setShowModal(true);
  };

  const openEdit = (pub) => {
    setEditPublisher(pub);
    setForm({ ...pub });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editPublisher) {
        
      fetch(`http://localhost:8080/updatepublisher/${editPublisher.id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(form)
      })
       .then(res => res.json())
       .then(updatedPublisher => {
          setPublishers(
            publishers.map(p =>
              p.id === updatedPublisher.id ? updatedPublisher: p
            )
          );
          alert("Publisher updated");
          setShowModal(false);
        })
      .catch(err => console.log(err));
    } else {
       fetch("http://localhost:8080/addpublisher",{
         method:"POST" ,
         headers:{"Content-Type":"application/json"},
          body:JSON.stringify(form)
       })
       .then(res => res.json())
        .then(newPublisher => {
           setPublishers([...publishers, newPublisher]);
           alert("Publisher added successfully!");
           setShowModal(false);
        })
       .catch((error)=>console.log(error))
    }
    
  };

  const handleDelete = (id) => {
    if (confirm('Delete this publisher?')) {
      // onUpdate({ ...data, publishers: data.publishers.filter(p => p.id !== id) });

      fetch(`http://localhost:8080/removepublisher/${id}`,{
        method : "DELETE",
        headers : {"Content-Type":"application/json"}
      })
       .then(res => res.text())
    .then(() => {
       setPublishers(publishers.filter(p => p.id !== id));
    })
    .catch(err => {
      console.log(err);
    });
    }
  };

  const bookCountForPublisher = (pubId) => data.books.filter(b => b.publisherId === pubId).length;

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Publishers</h1>
          <p className="page-subtitle">The houses that bring books into the world.</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>
          <Plus size={16} /> Add Publisher
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {publishers.map(pub => {
          const count = bookCountForPublisher(pub.id);
          return (
            <div key={pub.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 10,
                  background: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Building2 size={20} color="var(--gold)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{pub.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{pub.address} · {pub.phone}</div>
                </div>
              </div>
              <div className="divider" />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{count} {count === 1 ? 'book' : 'books'} in catalog</span>
                <div style={{ display: 'flex', gap: 2 }}>
                  <button className="btn-icon" onClick={() => openEdit(pub)}><Pencil size={14} /></button>
                  <button className="btn-icon danger" onClick={() => handleDelete(pub.id)}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          );
        })}
        {publishers.length === 0 && <div className="empty-state" style={{ gridColumn: '1/-1' }}>No publishers yet.</div>}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">{editPublisher ? 'Edit Publisher' : 'Add Publisher'}</h2>
            <div className="form-group">
              <label className="form-label">Publisher Name</label>
              <input className="form-input" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input className="form-input" value={form.address || ''} onChange={e => setForm({ ...form, address: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-input" type="number" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>{editPublisher ? 'Save Changes' : 'Add Publisher'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
