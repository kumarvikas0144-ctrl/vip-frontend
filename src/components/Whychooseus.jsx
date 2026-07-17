import './WhyChooseUs.css'

const FEATURES = [
  {
    title: 'PAN India',
    desc: 'Numbers available across every state and telecom circle in the country.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
      </svg>
    ),
  },
  {
    title: 'Instant Porting',
    desc: 'Switch networks without switching numbers, usually done within hours.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 12a8 8 0 0 1 13.66-5.66L20 8" />
        <path d="M20 4v4h-4" />
        <path d="M20 12a8 8 0 0 1-13.66 5.66L4 16" />
        <path d="M4 20v-4h4" />
      </svg>
    ),
  },
  {
    title: 'Verified Sellers',
    desc: 'Every seller is ID-verified before a number is listed for sale.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Secure Payments',
    desc: 'Escrow-backed transactions, funds released only once the number is yours.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
  {
    title: '24/7 Support',
    desc: 'Real people, any hour, for porting, payment, or listing help.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 13a8 8 0 0 1 16 0" />
        <rect x="2" y="13" width="5" height="6" rx="1.5" />
        <rect x="17" y="13" width="5" height="6" rx="1.5" />
      </svg>
    ),
  },
]

export default function WhyChooseUs() {
  return (
    <section className="wc-section">
      <div className="wc-heading">
        <p className="wc-eyebrow">Why Choose Us</p>
        <h2 className="wc-title">Built On Trust, Not Just Numbers</h2>
      </div>

      <div className="wc-grid">
        {FEATURES.map((f) => (
          <div key={f.title} className="wc-card">
            <div className="wc-icon">{f.icon}</div>
            <h3 className="wc-card-title">{f.title}</h3>
            <p className="wc-card-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}