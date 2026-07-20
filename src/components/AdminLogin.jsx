import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API = 'https://vip-backend-3ds4.onrender.com/api'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login fail ho gaya')
        return
      }
      localStorage.setItem('adminToken', data.token)
      navigate('/admin')
    } catch (err) {
      setError('Server se connect nahi ho paya')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b0908', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleLogin} style={{ background: '#171310', border: '1px solid rgba(212,175,106,0.25)', borderRadius: '16px', padding: '40px', width: '340px' }}>
        <h2 style={{ color: '#f1d89a', marginBottom: '6px', fontSize: '24px' }}>👑 Admin Login</h2>
        <p style={{ color: '#9a9187', fontSize: '13px', marginBottom: '24px' }}>VIP Number Dashboard</p>

        {error && (
          <div style={{ background: 'rgba(231,76,60,0.15)', color: '#e74c3c', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid rgba(212,175,106,0.2)', background: 'rgba(255,255,255,0.05)', color: '#f3ece0' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid rgba(212,175,106,0.2)', background: 'rgba(255,255,255,0.05)', color: '#f3ece0' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #f1d89a, #d4af6a)', color: '#16110a', border: 'none', borderRadius: '999px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '16px' }}
        >
          {loading ? 'Login ho raha hai...' : 'Login'}
        </button>

        <Link to="/admin-forgot-password" style={{ color: '#d4af6a', fontSize: '13px', textDecoration: 'none', display: 'block', textAlign: 'center' }}>
          Password bhool gaye?
        </Link>
      </form>
    </div>
  )
}
