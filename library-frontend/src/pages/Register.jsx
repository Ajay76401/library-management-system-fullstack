import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react'

const Register = () => {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({

  username: '',

  password: '',

  confirmPassword: ''

})

  const handleChange = (e) => {
    setError('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Password strength helper
  const getStrength = (pwd) => {
    if (!pwd) return { level: 0, label: '', color: 'transparent' }
    let score = 0
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    if (score <= 1) return { level: 1, label: 'Weak', color: 'var(--red)' }
    if (score === 2) return { level: 2, label: 'Fair', color: '#e09b3a' }
    if (score === 3) return { level: 3, label: 'Good', color: '#2ecc71' }
    return { level: 4, label: 'Strong', color: 'var(--green-badge)' }
  }

  const strength = getStrength(form.password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    try {
      setLoading(true)

      await axios.post('http://localhost:8080/register', {
        username: form.username,
        password: form.password
      })

      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)

    } catch (err) {
      const msg = err?.response?.data?.message
      setError(msg || 'Registration failed. Email may already be in use.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>

      {/* Left decorative panel */}
      <div style={styles.leftPanel}>

        <div style={styles.leftInner}>

          <div style={styles.logoMark}>
            <BookOpen size={28} color="#c8872a" />
          </div>

          <h1 style={styles.heroTitle}>
            Join the<br />
            <span style={styles.heroAccent}>Library System</span>
          </h1>

          <p style={styles.heroSub}>
            Create your account to start managing books, members, and loans with ease.
          </p>

          <div style={styles.decorStrip} />

          <ul style={styles.featureList}>
            {[
              'Full access to book catalogue',
              'Member & loan management',
              'Automated fine tracking',
              'Real-time dashboard analytics',
            ].map((f) => (
              <li key={f} style={styles.featureItem}>
                <CheckCircle2 size={15} color="var(--gold)" style={{ flexShrink: 0 }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>

        </div>

      </div>

      {/* Right form panel */}
      <div style={styles.rightPanel}>

        <div style={styles.formCard}>

          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Create account</h2>
            <p style={styles.formSub}>Fill in your details to get started</p>
          </div>

          {/* Error */}
          {error && (
            <div style={styles.errorBox}>
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Success */}
          {success && (
            <div style={styles.successBox}>
              <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
              <span>Account created! Redirecting to login…</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>

            {/* Name */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={styles.inputWrap}>
                <User size={16} style={styles.inputIcon} />
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={styles.inputWithIcon}
                />
              </div>
            </div>

            {/* Email */}
           

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={styles.inputWrap}>
                <Lock size={16} style={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Min. 6 characters"
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

              {/* Strength meter */}
              {form.password && (
                <div style={styles.strengthWrap}>
                  <div style={styles.strengthBar}>
                    {[1, 2, 3, 4].map((seg) => (
                      <div
                        key={seg}
                        style={{
                          ...styles.strengthSeg,
                          background: seg <= strength.level ? strength.color : 'var(--border)',
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ ...styles.strengthLabel, color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="form-group">
              <label className="form-label">Confirm password</label>
              <div style={styles.inputWrap}>
                <Lock size={16} style={styles.inputIcon} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="form-input"
                  style={{ ...styles.inputWithIcon, paddingRight: 40 }}
                />
                <button
                  type="button"
                  style={styles.eyeBtn}
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label style={styles.termsRow}>
              <input type="checkbox" required style={{ accentColor: 'var(--gold)', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                I agree to the{' '}
                <span style={{ color: 'var(--gold)', fontWeight: 500, cursor: 'pointer' }}>
                  Terms of Service
                </span>
                {' '}and{' '}
                <span style={{ color: 'var(--gold)', fontWeight: 500, cursor: 'pointer' }}>
                  Privacy Policy
                </span>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className="btn-primary"
              style={styles.submitBtn}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </button>

          </form>

          {/* Login link */}
          <div style={styles.loginRow}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Already have an account?
            </span>
            <Link to="/login" style={styles.loginLink}>Sign in</Link>
          </div>

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
  leftPanel: {
    width: '42%',
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
    maxWidth: 360,
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
    fontSize: 34,
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
    marginBottom: 32,
    width: '60%',
  },
  featureList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 14,
    color: 'rgba(245,240,232,0.75)',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 32px',
    overflowY: 'auto',
  },
  formCard: {
    width: '100%',
    maxWidth: 420,
    paddingBottom: 8,
  },
  formHeader: {
    marginBottom: 24,
  },
  formTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 28,
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
    marginBottom: 16,
  },
  successBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'var(--green-badge-bg)',
    border: '1px solid #a8dfc0',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontSize: 13,
    color: 'var(--green-badge)',
    marginBottom: 16,
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
  strengthWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  strengthBar: {
    display: 'flex',
    gap: 4,
    flex: 1,
  },
  strengthSeg: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    transition: 'background 0.2s ease',
  },
  strengthLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.04em',
    minWidth: 40,
    textAlign: 'right',
  },
  termsRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    cursor: 'pointer',
    marginTop: 4,
    marginBottom: 6,
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center',
    padding: '12px 20px',
    fontSize: 15,
    marginTop: 4,
  },
  loginRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
    paddingTop: 20,
    borderTop: '1px solid var(--border)',
  },
  loginLink: {
    color: 'var(--gold)',
    fontWeight: 600,
    fontSize: 13,
    textDecoration: 'none',
  },
}

export default Register
