import { useNavigate } from 'react-router-dom'
import './AboutUs.css'

export default function AboutUs() {
  const navigate = useNavigate()

  return (
    <div className="ab-page">
      <nav className="ab-nav">
        <button className="ab-back" onClick={() => navigate(-1)}>← Back</button>
        <div className="ab-logo" onClick={() => navigate('/')}>
          <span className="ab-logo-mark">◆</span>
          <span className="ab-logo-serif">99VIP</span>
          <span className="ab-logo-sans">NUMBER</span>
        </div>
        <button className="ab-nav-btn" onClick={() => navigate('/')}>Home</button>
      </nav>

      <div className="ab-container">
        <div className="ab-header">
          <p className="ab-eyebrow">Our Story</p>
          <h1 className="ab-title">About Us</h1>
        </div>

        <div className="ab-grid">
          <div className="ab-card ab-story">
            <div className="ab-avatar">VK</div>
            <h2 className="ab-name">Vikas Kumar</h2>
            <p className="ab-role">Founder · VIP Number Specialist</p>
            <p className="ab-bio">
              Panipat, Haryana se shuru karke, Vikas Kumar ne VIP mobile numbers ki duniya mein apni pehchaan banai. 
              Unka safar tab shuru hua jab unhone dekha ki logon ko apni pasand ka number milna kitna mushkil tha — 
              aur yahi se janm hua <strong>99 VIP Numbers</strong> ka.
            </p>
            <p className="ab-bio">
              Aaj hum Pan-India level pe kaam karte hain — har telecom circle mein, har budget mein. 
              Chahe aapko repeater number chahiye, lucky number chahiye, ya phir ek aisa number jo aapki 
              pehchaan ban jaye — hum woh dhundte hain jo sirf aapke liye sahi ho.
            </p>
            <div className="ab-contact-row">
              <a href="https://wa.me/919000002620" target="_blank" rel="noreferrer" className="ab-btn ab-whatsapp">
                💬 WhatsApp Karo
              </a>
              <a href="https://www.instagram.com/vikas_artworks" target="_blank" rel="noreferrer" className="ab-btn ab-insta">
                📸 Instagram
              </a>
            </div>
          </div>

          <div className="ab-right">
            <div className="ab-card ab-stat-card">
              <h3 className="ab-stat-title">Hamare Numbers</h3>
              <div className="ab-stats">
                <div className="ab-stat">
                  <strong>12,400+</strong>
                  <span>Numbers Sold</span>
                </div>
                <div className="ab-stat">
                  <strong>22</strong>
                  <span>Telecom Circles</span>
                </div>
                <div className="ab-stat">
                  <strong>100%</strong>
                  <span>Verified Sellers</span>
                </div>
                <div className="ab-stat">
                  <strong>2021</strong>
                  <span>Since</span>
                </div>
              </div>
            </div>

            <div className="ab-card ab-values">
              <h3 className="ab-values-title">Humari Values</h3>
              <div className="ab-value-list">
                <div className="ab-value-item">
                  <span className="ab-value-icon">🔒</span>
                  <div>
                    <strong>Trust First</strong>
                    <p>Har seller verified, har transaction secure</p>
                  </div>
                </div>
                <div className="ab-value-item">
                  <span className="ab-value-icon">⚡</span>
                  <div>
                    <strong>Fast Porting</strong>
                    <p>24-48 hours mein number aapka</p>
                  </div>
                </div>
                <div className="ab-value-item">
                  <span className="ab-value-icon">🤝</span>
                  <div>
                    <strong>Personal Service</strong>
                    <p>Real insaan se baat, koi bot nahi</p>
                  </div>
                </div>
                <div className="ab-value-item">
                  <span className="ab-value-icon">🌍</span>
                  <div>
                    <strong>Pan India</strong>
                    <p>Desh ke kone kone tak service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
