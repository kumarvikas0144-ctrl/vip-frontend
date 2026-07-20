import { useState, useEffect } from 'react'
import './Testimonials.css'

const API = 'https://vip-backend-3ds4.onrender.com/api'

function Stars({ count }) {
  return (
    <div className="tm-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 'tm-star tm-star-filled' : 'tm-star'}>★</span>
      ))}
    </div>
  )
}

function ReviewForm({ onSubmitted }) {
  const [form, setForm] = useState({ customerName: '', city: '', rating: 5, reviewText: '' })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.customerName || !form.reviewText) return alert('Naam aur review likhna zaroori hai!')
    setSending(true)
    try {
      await fetch(`${API}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setDone(true)
      onSubmitted()
    } catch {
      alert('Review submit nahi hua, dobara try karo.')
    } finally {
      setSending(false)
    }
  }

  if (done) return (
    <div className="tm-form-done">
      ✅ Shukriya! Aapka review submit ho gaya.
    </div>
  )

  return (
    <div className="tm-form-wrap">
      <h3 className="tm-form-title">Apna Experience Share Karo</h3>
      <div className="tm-form-grid">
        <input
          className="tm-input"
          placeholder="Aapka naam *"
          value={form.customerName}
          onChange={e => setForm({ ...form, customerName: e.target.value })}
        />
        <input
          className="tm-input"
          placeholder="Aapka sheher"
          value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
        />
      </div>
      <div className="tm-rating-row">
        <span className="tm-rating-label">Rating:</span>
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            className={`tm-star-btn ${n <= form.rating ? 'active' : ''}`}
            onClick={() => setForm({ ...form, rating: n })}
            type="button"
          >★</button>
        ))}
      </div>
      <textarea
        className="tm-textarea"
        placeholder="Aapka experience likhein... *"
        rows={3}
        value={form.reviewText}
        onChange={e => setForm({ ...form, reviewText: e.target.value })}
      />
      <button className="tm-submit" onClick={handleSubmit} disabled={sending}>
        {sending ? 'Submit ho raha hai...' : 'Review Submit Karo ✨'}
      </button>
    </div>
  )
}

export default function Testimonials() {
  const [reviews, setReviews] = useState([])
  const [status, setStatus] = useState('loading')
  const [showForm, setShowForm] = useState(false)

  function loadReviews() {
    fetch(`${API}/reviews`)
      .then(r => r.json())
      .then(data => {
        setReviews(Array.isArray(data) ? data : [])
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(() => { loadReviews() }, [])

  return (
    <section className="tm-section">
      <div className="tm-heading">
        <p className="tm-eyebrow">Customer Stories</p>
        <h2 className="tm-title">Numbers People Actually Wanted</h2>
        <button className="tm-write-btn" onClick={() => setShowForm(s => !s)}>
          {showForm ? 'Band Karo ✕' : '✍️ Review Likho'}
        </button>
      </div>

      {showForm && (
        <ReviewForm onSubmitted={() => { setShowForm(false); loadReviews() }} />
      )}

      {status === 'loading' && <p className="tm-status">Load ho raha hai...</p>}
      {status === 'error' && <p className="tm-status">Backend server chal raha hai kya?</p>}

      {status === 'ready' && reviews.length === 0 && (
        <p className="tm-status">Abhi koi review nahi hai — pehle review likhne wale bano! 🌟</p>
      )}

      {status === 'ready' && reviews.length > 0 && (
        <div className="tm-grid">
          {reviews.map((r) => (
            <div key={r._id} className="tm-card">
              <Stars count={r.rating} />
              <p className="tm-text">"{r.reviewText}"</p>
              <div className="tm-author">
                <span className="tm-name">{r.customerName}</span>
                <span className="tm-city">{r.city}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
