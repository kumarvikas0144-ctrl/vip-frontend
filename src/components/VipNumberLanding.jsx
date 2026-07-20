import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './VipNumberLanding.css'

const CHIPS = [{label:'VIP',slug:'vip'},{label:'VVIP',slug:'vvip'},{label:'Fancy',slug:'fancy'},{label:'Lucky',slug:'lucky'},{label:'Repeater',slug:'repeater'},{label:'Mirror',slug:'mirror'},{label:'Sequential',slug:'sequential'},{label:'Double Digit',slug:'double-digit'}]

function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const NAV_LINKS = ['Home', 'Buy Numbers', 'Categories', 'Sell Your Number', 'Contact']

  function handleNavClick(link) {
    setOpen(false)
    if (link === 'Home') {
      navigate('/')
    } else if (link === 'Buy Numbers') {
      navigate('/all-numbers')
    } else if (link === 'Categories') {
      navigate('/')
      setTimeout(() => {
        document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else if (link === 'Sell Your Number') {
      window.open('https://wa.me/919000002620?text=Hi%2C%20Mujhe%20apna%20VIP%20number%20bechna%20hai', '_blank')
    } else if (link === 'Contact') {
      navigate('/contact')
    }
  }

  return (
    <nav className="vn-nav">
      <div className="vn-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <span className="vn-logo-mark">◆</span>
        <span className="vn-logo-text">
          <span className="vn-logo-serif">VIP</span>
          <span className="vn-logo-sans">NUMBER</span>
        </span>
      </div>

      <ul className="vn-nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick(link) }}>{link}</a>
          </li>
        ))}
      </ul>

      <div className="vn-nav-contact">
        <a href="https://wa.me/919000002620" target="_blank" rel="noreferrer" className="vn-whatsapp-btn">
          📞 9000002620
        </a>
      </div>

      <button
        className={`vn-hamburger ${open ? 'vn-hamburger-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="vn-mobile-menu">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick(link) }}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="vn-mobile-actions">
            <a href="https://wa.me/919000002620" target="_blank" rel="noreferrer" className="vn-btn vn-btn-solid">
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

function NumberPlateCard() {
  const [top, setTop] = useState(null)
  useEffect(() => {
    fetch("https://vip-backend-3ds4.onrender.com/api/numbers")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const sorted = data.sort((a, b) => b.price - a.price)
          setTop(sorted[0])
        }
      })
      .catch(() => {})
  }, [])
  return (
    <div className="vn-plate-wrap">
      <svg className="vn-facets" viewBox="0 0 520 520" fill="none">
        <path d="M260 40 L460 240 L260 440 L60 240 Z" stroke="url(#vn-gold-line)" strokeWidth="1.5" />
        <path d="M260 120 L380 240 L260 360 L140 240 Z" stroke="url(#vn-gold-line)" strokeWidth="1" opacity="0.6" />
        <line x1="60" y1="240" x2="0" y2="180" stroke="url(#vn-gold-line)" strokeWidth="1" opacity="0.5" />
        <line x1="460" y1="240" x2="520" y2="300" stroke="url(#vn-gold-line)" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="vn-gold-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F1D89A" />
            <stop offset="100%" stopColor="#7A5C2E" />
          </linearGradient>
        </defs>
      </svg>
      <div className="vn-spark vn-spark-1" />
      <div className="vn-spark vn-spark-2" />
      <div className="vn-spark vn-spark-3" />
      <div className="vn-spark vn-spark-4" />
      <div className="vn-plate">
        <div className="vn-plate-sheen" />
        <div className="vn-plate-top">
          <span>FEATURED VVIP</span>
          <span className="vn-plate-badge">VERIFIED</span>
        </div>
        <div className="vn-plate-number">{top ? top.number : "98 9999 9999"}</div>
        <div className="vn-plate-bottom">
          <span>{top ? `${top.category} • Ready to Port Anywhere `: "Repeater • Jodi Digit • Ready to Port Anywhere"}</span>
          <span className="vn-plate-price">{top ? `₹${top.price.toLocaleString("en-IN")}` : "₹2,45,000"}</span>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)

  function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    setSearching(true)
    fetch("https://vip-backend-3ds4.onrender.com/api/numbers")
      .then(r => r.json())
      .then(data => {
        const q = query.replace(/\s+/g, "").toLowerCase()
        const filtered = data.filter(item => {
          const num = item.number.replace(/\s+/g, "").toLowerCase()
          return num.includes(q) || item.category.toLowerCase().includes(q)
        })
        setResults(filtered)
        setSearching(false)
      })
      .catch(() => setSearching(false))
  }
  const navigate = useNavigate()

  return (
    <section className="vn-hero">
      <div className="vn-hero-left">
        <p className="vn-eyebrow">Pan-India · All Circles · Instant Porting</p>
        <h1 className="vn-headline">
          A Number
          <br />
          Worth Remembering.
        </h1>
        <p className="vn-sub">
          Own a mobile number chosen for you, not assigned to you. Browse VVIP,
          lucky, and easy-recall numbers across every telecom circle in India.
        </p>

        <form className="vn-search" onSubmit={handleSearch}>
          <input
            type="text"
            value={query} onChange={e => setQuery(e.target.value)} placeholder="Try 98765 XXXXX or a lucky pattern"
            aria-label="Search VIP number"
          />
          <button type="submit">{searching ? "..." : "Search"}</button>
        </form>
        {results.length > 0 && (
          <div className="vn-search-results">
            {results.map(item => (
              <div key={item._id} className="vn-result-card" onClick={() => { const msg = encodeURIComponent(`Hi! Mujhe ye number chahiye:\n\nNumber: ${item.number}\nPrice: ₹${item.price.toLocaleString("en-IN")}\nCategory: ${item.category}`); window.open(`https://wa.me/919000002620?text=${msg}`, "_blank") }}>
                <span className="vn-result-num">{item.number}</span>
                <span className="vn-result-cat">{item.category}</span>
                <span className="vn-result-price">₹{item.price.toLocaleString("en-IN")}</span>
                <span className="vn-result-tag">Ready to Port Anywhere</span>
              </div>
            ))}
          </div>
        )}

        <div className="vn-chips">
          {CHIPS.map((chip) => (
            <button key={chip.slug} className="vn-chip" onClick={() => navigate(`/category/${chip.slug}`)}>{chip.label}</button>
          ))}
        </div>

        <div className="vn-cta-row">
          <button className="vn-btn vn-btn-solid vn-btn-lg" onClick={() => navigate('/all-numbers')}>
            Browse Numbers
          </button>
          
          <a href="https://wa.me/919000002620"
            target="_blank"
            rel="noreferrer"
            className="vn-btn vn-btn-outline vn-btn-lg"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Sell Your Number
          </a>
        </div>

        <div className="vn-stats">
          <div><strong>12,400+</strong><span>Numbers Placed</span></div>
          <div><strong>22</strong><span>Telecom Circles</span></div>
          <div><strong>100%</strong><span>Verified Sellers</span></div>
        </div>
      </div>

      <div className="vn-hero-right">
        <NumberPlateCard />
      </div>
    </section>
  )
}

export default function VipNumberLanding() {
  return (
    <div className="vn-page">
      <Navbar />
      <Hero />
    </div>
  )
}
