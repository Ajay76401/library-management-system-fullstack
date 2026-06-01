import { AlertTriangle, ArrowRight, BookMarked, BookOpen, Receipt, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiFetch } from '../api/api'
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ data, onNavigate }) {
 const [totalBooks, setTotalBooks] = useState(0);
 const [totalMembers , setTotalMembers] = useState(0);
 const [availableBooks,setavAilableBooks] =useState(0);
 const [totalAuthors, setTotalAuthors] = useState(0);
 const [activeLoans ,setActiveLoans] = useState(0);
 const [overdueLoans ,setOverdueLoans]  = useState([]);
 const[fines ,setFines] = useState([]);
 const[message ,setMessage] = useState(true);
 const [recentLoans ,setRecentLoans] = useState([]);
 const navigate = useNavigate();

useEffect(() => {
  if (message) {
    alert(
      "Backend might take 90 s to open. Please stay on this page. After the backend starts, you will be redirected to the login page."
    );
    setMessage(false);
  }
}, [message]);
 
 useEffect(()=>{
    apiFetch("/recentloans")
    .then(data => setRecentLoans(data))
    .catch(err => console.log(err))
 },[])

useEffect(()=>{
  apiFetch ("/fines")
  .then(data =>setFines(data))
  .catch(err => console.log(err))
},[])
 useEffect(()=>{
     apiFetch ("/activeloans")
     .then(count => setActiveLoans(count))
     .catch(err => console.log(err))
 },[])

 useEffect(()=>{
     apiFetch ('/countofauthors')
     .then(count => setTotalAuthors(count))
     .catch(err => console.log(err));
 },[])

  useEffect(() => {
    apiFetch ('/countofbooks')
      .then(count => {setTotalBooks(count)})
      .catch(err => console.log(err));
  }, []);

  useEffect(()=>{
       apiFetch ("/countofmembers")
       .then(count => {setTotalMembers(count)})
       .catch(err => console.log(err));
  },[])

  useEffect(()=>{
    apiFetch ("/availablebookscount")
    .then(count =>{ setavAilableBooks(count)})
    .catch(err => console.log(err));
  },[])

   useEffect(()=>{
    apiFetch ("/overdueloans")
    .then(data => setOverdueLoans(data))
    .catch(err => console.log(err))
 },[])
  const unpaidFines =fines.filter(f=>f.status!=="Paid")
  const unpaidTotal = unpaidFines.reduce((sum,fine)=>sum+fine.amount,0);

  // const recentLoans = [...data.loans]
  //   .sort((a, b) => new Date(b.issuedDate) - new Date(a.issuedDate))
  //   .slice(0, 4);

  const attentionItems = [
    ...overdueLoans,
    ...unpaidFines.map(f => ({ ...f, isFineConcern: true }))
  ];
  return (
    <div className="page-content">
      {/* Hero banner */}
      <div style={{
        background: 'var(--green-dark)',
        borderRadius: 'var(--radius)',
        padding: '40px 40px',
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 260, height: 260,
          background: 'rgba(200,135,42,0.07)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute', top: 60, right: 80,
          width: 140, height: 140,
          background: 'rgba(200,135,42,0.05)',
          borderRadius: '50%'
        }} />
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(200,135,42,0.2)',
          color: 'var(--gold-light)',
          padding: '4px 14px',
          borderRadius: 100,
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 16
        }}>
          ✦ Curated for librarians
        </div>
        <h1 style={{ color: 'var(--cream)', fontSize: 42, fontWeight: 700, lineHeight: 1.2, marginBottom: 14, maxWidth: 500 }}>
          Welcome back to your library.
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: 14, maxWidth: 420, marginBottom: 28, lineHeight: 1.7 }}>
          Manage books, members, loans, and fines from a single elegant workspace. Issue and return books in a click — overdue fines calculate automatically.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-primary" onClick={() => navigate('/loans')} style={{ borderRadius: 8 }}>
            Issue a book <ArrowRight size={15} />
          </button>
          <button className="btn-secondary" onClick={() => navigate('/books')} style={{ borderRadius: 8, borderColor: 'rgba(245,240,232,0.3)', color: 'var(--cream)' }}>
            Browse catalog
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="TOTAL BOOKS" value={totalBooks} sub={`${availableBooks} available now`} icon={<BookOpen size={18} />} accent={false} />
        <StatCard label="MEMBERS" value={totalMembers} sub={`${totalAuthors} authors indexed`} icon={<Users size={18} />} accent={false} />
        <StatCard label="ACTIVE LOANS" value={activeLoans} sub={`${overdueLoans.length} overdue`} icon={<BookMarked size={18} />} accent={overdueLoans.length > 0} />
        <StatCard label="UNPAID FINES" value={`$${unpaidTotal}`} sub="Across all members" icon={<Receipt size={18} />} accent={unpaidTotal > 0} />
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16 }}>
        {/* Recent loans */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700 }}>Recent loans</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Latest activity across the library</div>
            </div>
            <button onClick={() => onNavigate('loans')} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
              View all <ArrowRight size={14} />
            </button>
          </div>
          {recentLoans.slice(0,4).map(loan => (
            <div key={loan.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderTop: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{loan.bookcopy.book.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{loan.member?.name} · due {loan.duedate}</div>
              </div>
              <span className={`badge badge-${loan.status.toLowerCase()}`}>{loan.status}</span>
            </div>
          ))}
        </div>

        {/* Needs attention */}
        <div className="card">

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16
        }}>
          <AlertTriangle size={16} color="#e09b3a" />
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 18,
            fontWeight: 700
          }}>
            Needs attention
          </span>
        </div>

        {overdueLoans.length === 0 && unpaidFines.length === 0 ? (

          <div className="empty-state">
            All clear! No issues.
          </div>

        ) : (

          <>
          
            {/* Overdue Loans */}
            {overdueLoans.map((loan, i) => (

              <div
                key={`loan-${i}`}
                style={{
                  background: 'var(--red-light)',
                  border: '1px solid #f5c6c2',
                  borderRadius: 8,
                  padding: '12px 14px',
                  marginBottom: 10
                }}
              >
                <div style={{
                  fontWeight: 500,
                  fontSize: 14
                }}>
                  {loan.bookcopy?.book?.title}
                </div>

                <div style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  marginTop: 2
                }}>
                  {loan.member?.name} · due {loan.duedate}
                </div>

              </div>

            ))}

            {/* Unpaid Fines */}
            {unpaidFines.map((fine, i) => (

              <div
                key={`fine-${i}`}
                style={{
                  background: '#fff4e5',
                  border: '1px solid #ffd59e',
                  borderRadius: 8,
                  padding: '12px 14px',
                  marginBottom: 10
                }}
              >

                <div style={{
                  fontWeight: 500,
                  fontSize: 14
                }}>
                  Unpaid Fine - ${fine.amount}
                </div>

                <div style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  marginTop: 2
                }}>
                  Fine pending
                </div>

              </div>

            ))}

          </>

        )}

        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, icon, accent }) {
  return (
    <div className="card" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>{label}</div>
          <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, marginBottom: 6 }}>{value}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{sub}</div>
        </div>
        <div style={{
          width: 36, height: 36,
          borderRadius: 8,
          background: accent ? 'rgba(200,135,42,0.12)' : 'var(--cream-dark)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accent ? 'var(--gold)' : 'var(--text-muted)'
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}
