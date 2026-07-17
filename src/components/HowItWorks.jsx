import { useNavigate } from 'react-router-dom'
import './HowItWorks.css'

const STEPS = [
  {
    num: '01',
    title: 'Number Chunno',
    desc: 'Apni pasand ka VIP number browse karo — category se, search se, ya hamare featured list se. Har number ka price aur circle clearly likha hai.',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'WhatsApp Pe Batao',
    desc: 'Buy Now button dabao — seedha hamare WhatsApp pe message jayega. Hum 24/7 available hain, turant reply milega.',
    icon: '💬',
  },
  {
    num: '03',
    title: 'Payment Karo',
    desc: 'Secure payment karo — UPI, bank transfer sab accepted. Paisa tab tak hold rehta hai jab tak number port na ho jaye.',
    icon: '💳',
  },
  {
    num: '04',
    title: 'Documents Bhejo',
    desc: 'Porting ke liye simple documents chahiye — Aadhaar aur ek form. Hum sab guide karte hain step by step.',
    icon: '📄',
  },
  {
    num: '05',
    title: 'Number Port Hoga',
    desc: '24-48 hours mein number aapke chosen network pe port ho jayega. Koi number nahi badlega — sirf network badlega.',
    icon: '⚡',
  },
  {
    num: '06',
    title: 'Number Aapka!',
    desc: 'SIM activate hone ke baad number 100% aapka. Ab ye number sirf aapki pehchaan hai.',
    icon: '👑',
  },
]

export default function HowItWorks() {
  const navigate = useNavigate()

  return (
    <div className="hw-page">
      <nav className="hw-nav">
        <button className="hw-back" onClick={() => navigate(-1)}>← Back</button>
        <div className="hw-logo" onClick={() => navigate('/')}>
          <span className="hw-logo-mark">◆</span>
          <span className="hw-logo-serif">VIP</span>
          <span className="hw-logo-sans">NUMBER</span>
        </div>
        <button className="hw-nav-btn" onClick={() => navigate('/')}>Home</button>
      </nav>

      <div className="hw-container">
        <div className="hw-header">
          <p className="hw-eyebrow">Simple Process</p>
          <h1 className="hw-title">How It Works</h1>
          <p className="hw-sub">6 simple steps mein apna VIP number haasil karo.</p>
        </div>

        <div className="hw-steps">
          {STEPS.map((step, i) => (
            <div key={step.num} className="hw-step">
              <div className="hw-step-left">
                <div className="hw-step-num">{step.num}</div>
                {i < STEPS.length - 1 && <div className="hw-step-line" />}
              </div>
              <div className="hw-step-card">
                <span className="hw-step-icon">{step.icon}</span>
                <div>
                  <h3 className="hw-step-title">{step.title}</h3>
                  <p className="hw-step-desc">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hw-cta">
          <h2>Shuru Karo Abhi</h2>
          <p>Koi bhi sawaal ho — seedha WhatsApp pe poocho.</p>
          <div className="hw-cta-btns">
            <button className="hw-btn hw-btn-solid" onClick={() => navigate('/all-numbers')}>
              Numbers Browse Karo
            </button>
            <a href="https://wa.me/919000002620?text=Hi%2C%20VIP%20number%20lena%20hai" target="_blank" rel="noreferrer" className="hw-btn hw-btn-whatsapp">
              💬 WhatsApp Karo
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
