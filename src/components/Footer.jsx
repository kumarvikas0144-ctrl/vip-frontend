import './Footer.css'

const LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Sell Your Number', href: 'https://wa.me/919000002620?text=Hi%2C%20Mujhe%20apna%20VIP%20number%20bechna%20hai' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="ft-footer">
      <div className="ft-top">

        {/* Left — Brand */}
        <div className="ft-brand">
          <div className="ft-logo">
            <span className="ft-logo-mark">◆</span>
            <span className="ft-logo-text">
              <span className="ft-logo-serif">VIP</span>
              <span className="ft-logo-sans">NUMBER</span>
            </span>
          </div>
          <p className="ft-tagline">
            India's marketplace for numbers worth remembering.
          </p>
          <div className="ft-socials">
            <a href="https://www.instagram.com/vikas_artworks" target="_blank" rel="noreferrer" className="ft-social" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://wa.me/919000002620" target="_blank" rel="noreferrer" className="ft-social" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 20l1.3-3.9A8 8 0 1 1 8.9 19.7Z" />
                <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Middle — Links */}
        <div className="ft-column">
          <h4>Quick Links</h4>
          <ul>
            {LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Contact */}
        <div className="ft-column">
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+919000002620">📞 +91 9000002620</a></li>
            <li><a href="mailto:kumarvikas0144@gmail.com">✉️ kumarvikas0144@gmail.com</a></li>
            <li><a href="https://wa.me/919000002620" target="_blank" rel="noreferrer">💬 WhatsApp Us</a></li>
            <li style={{ color: '#9a9187', fontSize: '12px', marginTop: '8px' }}>📍 Panipat, Haryana</li>
            <li style={{ color: '#9a9187', fontSize: '12px' }}>🕘 Mon–Sun: 9 AM – 10 PM</li>
          </ul>
        </div>

      </div>

      <div className="ft-bottom">
        <span>© {new Date().getFullYear()} VIP Number. All rights reserved.</span>
        <span>Made for buyers and sellers across India.</span>
      </div>
      <div className="ft-credit">Designed & Developed by Shivam Dutt · 📞 7777023442</div>
    </footer>
  )
}
