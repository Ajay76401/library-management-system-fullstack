import { CircleDollarSign, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiFetch } from '../api/api'

export default function Fines({ data, onUpdate }) {
const[fines,setFines]=useState([]);

useEffect(() => {
  apiFetch(`/fines`)
    .then(fines => setFines(fines))
    .catch(err => console.error('Error fetching fines:', err));
}, []);

 
  const unpaid = fines.filter(f => f.status !== 'Paid');
  const paid = fines.filter(f => f.status === 'Paid');
  const outstanding = unpaid.reduce((s, f) => s + f.amount, 0);
  const collected = paid.reduce((s, f) => s + f.amount, 0);


  const markPaid = async (fineId) => {
  try {
    await apiFetch(`/payfine/${fineId}`,{
        method: "PUT"
      }
    );
    const res = await apiFetch("/fines");
    setFines(res);
  } catch(error) {
    console.log(error);
    alert("Failed to mark fine paid");
  }
};

const calculateDays = (dueDate,  returnDate) => {
  const endDate =returnDate? new Date(returnDate): new Date();
  const due =new Date(dueDate);
  const diff =endDate - due;
  return Math.max(0,Math.floor(diff / (1000 * 60 * 60 * 24)));
};

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Fines</h1>
          <p className="page-subtitle">Overdue books accrue $1 per day. Settle balances here.</p>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <div className="card" style={{ background: 'var(--green-dark)', borderColor: 'transparent' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.5)', marginBottom: 10 }}>OUTSTANDING</div>
          <div style={{ fontSize: 44, fontWeight: 700, color: 'var(--cream)', lineHeight: 1 }}>${outstanding}</div>
          <div style={{ fontSize: 13, color: 'rgba(245,240,232,0.5)', marginTop: 6 }}>{unpaid.length} unpaid fine{unpaid.length !== 1 ? 's' : ''}</div>
        </div>
        <div className="card">
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>COLLECTED</div>
          <div style={{ fontSize: 44, fontWeight: 700, color: 'var(--green-badge)', lineHeight: 1 }}>${collected}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>{paid.length} paid</div>
        </div>
        <div className="card">
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>RATE</div>
          <div style={{ lineHeight: 1, marginTop: 4 }}>
            <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--text-primary)' }}>$1</span>
            <span style={{ fontSize: 16, color: 'var(--text-muted)', fontWeight: 500 }}>/day</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>Per overdue book</div>
        </div>
      </div>

      {/* Unpaid */}
      {unpaid.length > 0 && (
        <>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, marginBottom: 14 }}>Unpaid</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {unpaid.map(fine => (
              <div key={fine.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: 'rgba(200,135,42,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <CircleDollarSign size={18} color="var(--gold)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{fine.loan.member.name} — {fine.loan.bookcopy.book.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    Overdue  {calculateDays(fine.loan.duedate,fine.loan.returndate)} days @ $1/day
                  </div>
                </div>
                <div style={{
                  background: 'var(--red)', color: 'white',
                  padding: '4px 12px', borderRadius: 100, fontSize: 13, fontWeight: 700, marginRight: 8
                }}>
                  ${fine.amount}
                </div>
                <button
                  onClick={() => markPaid(fine.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'var(--green-dark)', color: 'var(--cream)',
                    padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                    border: 'none', cursor: 'pointer'
                  }}
                >
                  <CheckCircle2 size={14} /> Mark paid
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Paid */}
      {paid.length > 0 && (
        <>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, marginBottom: 14 }}>Paid</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {paid.map(fine => (
              <div key={fine.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'var(--green-badge-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <CheckCircle2 size={16} color="var(--green-badge)" />
                </div>
                <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>
                  {fine.loan.member.name} · Returned  {calculateDays(fine.loan.duedate,  fine.loan.returndate)} days late
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>${fine.amount} paid</div>
              </div>
            ))}
          </div>
        </>
      )}

      {fines.length === 0 && <div className="empty-state">No fines on record.</div>}
    </div>
  );
}
