import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api'
import './CategoryPage.css'

const PATTERN_COLORS = {
  vip: '#f1d89a',
  repeater: '#d4af6a',
  sequential: '#c9a86a',
  mirror: '#e6c887',
  'double-digit': '#dcb877',
  fancy: '#efd39a',
  lucky: '#d9b46a',
  VIP: '#f1d89a',
  Repeater: '#d4af6a',
  Sequential: '#c9a86a',
  Mirror: '#e6c887',
  'Double Digit': '#dcb877',
  Fancy: '#efd39a',
  Lucky: '#d9b46a',
}

function formatPrice(n) {
  return Number(n).toLocaleString('en-IN')
}

function NumberCard({ item }) {
  const [saved, setSaved] = useState(false)
  

  function handleBuyNow() {
    const msg = encodeURIComponent(`Hi! Mujhe ye number chahiye:\n\nNumber: ${item.number}\nPrice: ₹${Number(item.price).toLocaleString("en-IN")}\nCircle: ${item.circle}\nCategory: ${item.category}`)
    window.open(`https://wa.me/919000002620?text=${msg}`, "_blank")
  }

  const displayCategory = String(item.category || '').replace('-', ' ').toUpperCase();

  return (
    <div className="cp-card">
      <div className="cp-card-top">
        <span
          className="cp-pattern"
          style={{ color: PATTERN_COLORS[item.category] || PATTERN_COLORS[item.category?.toLowerCase()] || '#d4af6a' }}
        >
          {displayCategory}
        </span>
        <button
          className={`cp-heart ${saved ? 'cp-heart-active' : ''}`}
          onClick={() => setSaved((s) => !s)}
        >
          {saved ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="cp-number">{item.number}</div>

      <div className="cp-meta">
        <span>Ready to Port Anywhere</span>
        <span className={`cp-status cp-status-${item.status?.toLowerCase()}`}>
          {item.status}
        </span>
      </div>

      <div className="cp-card-bottom">
        <div className="cp-price">
          <span className="cp-price-label">Price</span>
          <span className="cp-price-value">₹{formatPrice(item.price)}</span>
        </div>
        <button
          className="cp-buy"
          onClick={handleBuyNow}
          disabled={item.status === "Sold"}
        >
          {item.status === 'Sold' ? 'Sold' : 'Buy Now'}
        </button>
      </div>
    </div>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [numbers, setNumbers] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    // 1. URL ke naam ko sundar banakar heading ke liye set karo
    const displayTitle = slug.replace('-', ' ').toUpperCase()
    setCategoryName(displayTitle)

    // 2. URL slug me se saare dash/space hatakar ekdum clean kar lo (e.g. "doubledigit")
    const cleanSlug = slug.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()

    // 3. Backend se SAARE numbers uthao aur yahan filter maro
    fetch('https://vip-backend-3ds4.onrender.com/api/numbers')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const filteredNumbers = data.filter((item) => {
            if (!item.category) return false
            // Database ki category me se bhi dash/space hata do
            const cleanCat = item.category.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
            
            // Ab dono ko match karo ("doubledigit" === "doubledigit")
            return cleanCat === cleanSlug
          })
          setNumbers(filteredNumbers)
        } else {
          setNumbers([])
        }
        setStatus('ready')
      })
      .catch((err) => {
        console.error("Fetch Error:", err)
        setStatus('error')
      })
  }, [slug])

  return (
    <div className="cp-page">
      <nav className="cp-nav">
        <button className="cp-back" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="cp-logo" onClick={() => navigate('/')}>
          <span className="cp-logo-mark">◆</span>
          <span className="cp-logo-serif">VIP</span>
          <span className="cp-logo-sans">NUMBER</span>
        </div>
        <div className="cp-nav-right">
          <button className="cp-nav-btn" onClick={() => navigate('/')}>Home</button>
        </div>
      </nav>

      <div className="cp-header">
        <p className="cp-eyebrow">Browse By Pattern</p>
        <h1 className="cp-title">{categoryName}</h1>
        {status === 'ready' && (
          <p className="cp-sub">
            {numbers.length} number{numbers.length !== 1 ? 's' : ''} available
          </p>
        )}
      </div>

      <div className="cp-content">
        {status === 'loading' && (
          <div className="cp-loading">
            <div className="cp-spinner" />
            <p>Numbers load ho rahe hain...</p>
          </div>
        )}

        {status === 'error' && (
          <p className="cp-error">
            Numbers load nahi hue. Backend server chal raha hai kya?
          </p>
        )}

        {status === 'ready' && numbers.length === 0 && (
          <div className="cp-empty">
            <p>Is category mein abhi koi number available nahi hai.</p>
            <button className="cp-back-btn" onClick={() => navigate('/')}>
              Wapas Jaao
            </button>
          </div>
        )}

        {status === 'ready' && numbers.length > 0 && (
          <div className="cp-grid">
            {numbers.map((item) => (
              <NumberCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}