import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, BookOpen, AlertCircle } from 'lucide-react'

const Login = () => {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setError('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)

      const formData = new URLSearchParams()

      formData.append('username', form.username)
      formData.append('password', form.password)

      const res = await axios.post(
        'https://library-management-system-fullstack-1.onrender.com/login',
        formData,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      navigate('/')

    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>

      {/* Left panel – decorative */}
      <div style={styles.leftPanel}>

        <div style={styles.leftInner}>

          <div style={styles.logoMark}>
            <BookOpen size={28} color="#c8872a" />
          </div>

          <h1 style={styles.heroTitle}>
            Welcome back to<br />
            <span style={styles.heroAccent}>Library System</span>
          </h1>

          <p style={styles.heroSub}>
            Manage books, members, loans and fines from one elegant dashboard.
          </p>

          <div style={styles.decorStrip} />

          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <span style={styles.statNum}>Smart book  </span>
              <span style={styles.statLabel}> management</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNum}>Automated  </span>
              <span style={styles.statLabel}>fine tracking</span>
            </div>
            <div style={styles.statBox}>
              <span style={styles.statNum}> librarian </span>
              <span style={styles.statLabel}>access</span>
            </div>
          </div>

        </div>

      </div>

      {/* Right panel – form */}
      <div style={styles.rightPanel}>

        <div style={styles.formCard}>

          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Sign in</h2>
            <p style={styles.formSub}>Enter your credentials to access the system</p>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={styles.inputWrap}>
                <Mail size={16} style={styles.inputIcon} />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Your Username Here."
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={styles.inputWithIcon}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <div style={styles.labelRow}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <button
                  type="button"
                  style={styles.forgotLink}
                  onClick={() => alert('Password reset coming soon')}
                >
                  Forgot password?
                </button>
              </div>
              <div style={styles.inputWrap}>
                <Lock size={16} style={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{ ...styles.inputWithIcon, paddingRight: 40 }}
                />
                <button
                  type="button"
                  style={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label style={styles.rememberRow}>
              <input type="checkbox" style={{ accentColor: 'var(--gold)' }} />
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Remember me for 30 days</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={styles.submitBtn}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>

          </form>

          <div style={styles.divider}>
            <span style={styles.dividerText}>New to Library System?</span>
          </div>

          <Link to="/register" style={styles.registerBtn}>
            Create an account
          </Link>

        </div>

      </div>

    </div>
  )
}

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    background: 'var(--cream)',
  },
  // ── Left decorative panel ──────────────────────────────────
  leftPanel: {
    width: '45%',
    background: 'var(--green-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 48px',
    position: 'relative',
    overflow: 'hidden',
  },
  leftInner: {
    position: 'relative',
    zIndex: 1,
    maxWidth: 380,
  },
  logoMark: {
    width: 52,
    height: 52,
    background: 'rgba(200,135,42,0.15)',
    border: '1px solid rgba(200,135,42,0.3)',
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 36,
    fontWeight: 700,
    color: 'var(--cream)',
    lineHeight: 1.25,
    marginBottom: 16,
  },
  heroAccent: {
    color: 'var(--gold)',
  },
  heroSub: {
    fontSize: 15,
    color: 'rgba(245,240,232,0.6)',
    lineHeight: 1.65,
    marginBottom: 40,
  },
  decorStrip: {
    height: 2,
    background: 'linear-gradient(90deg, var(--gold) 0%, transparent 100%)',
    borderRadius: 2,
    marginBottom: 40,
    width: '60%',
  },
  statsRow: {
    display: 'flex',
    gap: 40,
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    gap : 6,
  },
  statNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--gold-light)',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(245,240,232,0.45)',
  },
  // ── Right form panel ──────────────────────────────────────
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 32px',
  },
  formCard: {
    width: '100%',
    maxWidth: 420,
  },
  formHeader: {
    marginBottom: 28,
  },
  formTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 30,
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 6,
  },
  formSub: {
    fontSize: 14,
    color: 'var(--text-muted)',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#fdf0ef',
    border: '1px solid #f5c6c2',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontSize: 13,
    color: 'var(--red)',
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  inputWrap: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)',
    pointerEvents: 'none',
  },
  inputWithIcon: {
    paddingLeft: 38,
  },
  eyeBtn: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    padding: 4,
  },
  labelRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  forgotLink: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 12,
    color: 'var(--gold)',
    fontWeight: 500,
    padding: 0,
    fontFamily: "'DM Sans', sans-serif",
  },
  rememberRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    marginTop: 4,
    marginBottom: 8,
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center',
    padding: '12px 20px',
    fontSize: 15,
    marginTop: 4,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    margin: '24px 0',
    '::before': { content: '""', flex: 1, height: 1, background: 'var(--border)' },
  },
  dividerText: {
    fontSize: 13,
    color: 'var(--text-muted)',
    whiteSpace: 'nowrap',
    borderTop: '1px solid var(--border)',
    borderBottom: 'none',
    padding: '0',
    // Use a real HR approach instead
    display: 'block',
    textAlign: 'center',
    borderTop: '1px solid var(--border)',
    paddingTop: 20,
    paddingBottom: 4,
  },
  registerBtn: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    padding: '11px 20px',
    borderRadius: 'var(--radius-sm)',
    border: '1.5px solid var(--border)',
    background: 'transparent',
    color: 'var(--text-primary)',
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    boxSizing: 'border-box',
  },
}

export default Login
