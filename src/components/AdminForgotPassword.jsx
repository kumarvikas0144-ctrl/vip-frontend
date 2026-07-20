import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API = 'https://vip-backend-3ds4.onrender.com/api'

export default function AdminForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function sendOtp(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error)
      setMessage('OTP bhej diya gaya hai aapke email pe!')
      setStep(2)
    } catch {
      setError('Server se connect nahi ho paya')
    } finally {
      setLoading(false)
    }
  }

  async function resetPassword(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error)
      setMessage('Password reset ho gaya! Ab login karo.')
      setTimeout(() => navigate('/admin-login'), 1500)
    } catch {
      setError('Server se connect nahi ho paya')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0908', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <form onSubmit={step === 1 ? sendOtp : resetPassword} style={{ background: '#171310', border: '1px solid rgba(212,175,106,0.25)', borderRadius: '16px', padding: '40px', width: '340px' }}>
        <h2 style={{ color: '#f1d89a', marginBottom: '6px', fontSize: '22px' }}>🔑 Password Reset</h2>
        <p style={{ color: '#9a9187', fontSize: '13px', marginBottom: '24px' }}>
          {step === 1 ? 'Apna email daalo, OTP bhejenge' : 'OTP daalo aur naya password set karo'}
        </p>

        {error && <div style={{ background: 'rgba(231,76,60,0.15)', color: '#e74c3c', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}
        {message && <div style={{ background: 'rgba(111,207,151,0.15)', color: '#6fcf97', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>{message}</div>}

        {step === 1 ? (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid rgba(212,175,106,0.2)', background: 'rgba(255,255,255,0.05)', color: '#f3ece0' }}
          />
        ) : (
          <>
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid rgba(212,175,106,0.2)', background: 'rgba(255,255,255,0.05)', color: '#f3ece0' }}
            />
            <input
              type="password"
              placeholder="Naya Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid rgba(212,175,106,0.2)', background: 'rgba(255,255,255,0.05)', color: '#f3ece0' }}
            />
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #f1d89a, #d4af6a)', color: '#16110a', border: 'none', borderRadius: '999px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '16px' }}
        >
          {loading ? 'Wait karo...' : step === 1 ? 'OTP Bhejo' : 'Password Reset Karo'}
        </button>

        <Link to="/admin-login" style={{ color: '#d4af6a', fontSize: '13px', textDecoration: 'none', display: 'block', textAlign: 'center' }}>
          ← Login pe wapas jao
        </Link>
      </form>
    </div>
  )
}
