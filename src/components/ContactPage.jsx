import { useNavigate } from 'react-router-dom'
import './ContactPage.css'

export default function ContactPage() {
  const navigate = useNavigate()

  return (
    <div className="ct-page">
      <nav className="ct-nav">
        <button className="ct-back" onClick={() => navigate(-1)}>← Back</button>
        <div className="ct-logo" onClick={() => navigate('/')}>
          <span className="ct-logo-mark">◆</span>
          <span className="ct-logo-serif">VIP</span>
          <span className="ct-logo-sans">NUMBER</span>
        </div>
        <button className="ct-nav-btn" onClick={() => navigate('/')}>Home</button>
      </nav>

      <div className="ct-container">
        <div className="ct-header">
          <p className="ct-eyebrow">Get In Touch</p>
          <h1 className="ct-title">Contact Us</h1>
          <p className="ct-sub">Koi bhi VIP number lena ho ya bechna ho — seedha baat karo.</p>
        </div>

        <div className="ct-grid">
          <div className="ct-card ct-main-card">
            <div className="ct-avatar">VK</div>
            <h2 className="ct-name">Vikas Kumar</h2>
            <p className="ct-role">VIP Number Specialist · Panipat, Haryana</p>

            <div className="ct-details">
              <a href="tel:+919000002620" className="ct-detail-row">
                <span className="ct-detail-icon">📞</span>
                <span>+91 9000002620</span>
              </a>
              <a href="mailto:kumarvikas0144@gmail.com" className="ct-detail-row">
                <span className="ct-detail-icon">✉️</span>
                <span>kumarvikas0144@gmail.com</span>
              </a>
              <div className="ct-detail-row">
                <span className="ct-detail-icon">📍</span>
                <span>2009, Road, Kabri, Panipat, Haryana 132103</span>
              </div>
              <div className="ct-detail-row">
                <span className="ct-detail-icon">🕘</span>
                <span>Mon–Sun: 9:00 AM – 10:00 PM</span>
              </div>
            </div>

            <div className="ct-socials">
              <a href="https://wa.me/919000002620" target="_blank" rel="noreferrer" className="ct-social-btn ct-whatsapp">
                💬 WhatsApp Karo
              </a>
              <a href="https://www.instagram.com/vikas_artworks" target="_blank" rel="noreferrer" className="ct-social-btn ct-instagram">
                📸 @vikas_artworks
              </a>
            </div>
          </div>

          <div className="ct-card ct-enquiry-card">
            <h3 className="ct-enquiry-title">Quick Enquiry</h3>
            <p className="ct-enquiry-sub">Kaunsa number chahiye? Seedha WhatsApp pe message karo.</p>
            <div className="ct-enquiry-options">
              <a href="https://wa.me/919000002620?text=Mujhe%20VIP%20number%20chahiye" target="_blank" rel="noreferrer" className="ct-option">
                <span>👑</span><span>VIP Number Chahiye</span>
              </a>
              <a href="https://wa.me/919000002620?text=Mujhe%20apna%20number%20bechna%20hai" target="_blank" rel="noreferrer" className="ct-option">
                <span>💰</span><span>Apna Number Bechna Hai</span>
              </a>
              <a href="https://wa.me/919000002620?text=Mujhe%20price%20puchni%20hai" target="_blank" rel="noreferrer" className="ct-option">
                <span>💬</span><span>Price Poochni Hai</span>
              </a>
              <a href="https://wa.me/919000002620?text=Porting%20ke%20baare%20mein%20poochna%20tha" target="_blank" rel="noreferrer" className="ct-option">
                <span>🔄</span><span>Porting Ke Baare Mein</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
