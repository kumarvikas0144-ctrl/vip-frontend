import { useState } from 'react'
import './FAQ.css'

const FAQS = [
  {
    q: 'Porting kitne din me hogi?',
    a: 'Zyadatar numbers 24-48 hours ke andar port ho jaate hain, documents verify hone ke baad. Kuch circles mein thoda zyada time lag sakta hai.',
  },
  {
    q: 'Payment safe hai?',
    a: 'Haan. Har payment escrow ke through hoti hai — paisa seller ko tabhi release hota hai jab number successfully port ho jaata hai aur aapke naam pe activate ho jaata hai.',
  },
  {
    q: 'Refund policy kya hai?',
    a: 'Agar porting fail ho jaati hai ya number available nahi rehta, poora refund 5-7 working days ke andar aapke original payment method mein wapas kar diya jaata hai.',
  },
  {
    q: 'Number reserve kaise kare?',
    a: 'Kisi bhi number card pe "Buy Now" ya "Enquire Now" dabao, ₹999 ka token amount pay karo — number 48 hours ke liye sirf aapke liye hold ho jaata hai.',
  },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{item.q}</span>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="faq-answer-wrap">
        <p className="faq-answer">{item.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="faq-section">
      <div className="faq-heading">
        <p className="faq-eyebrow">Common Questions</p>
        <h2 className="faq-title">Still Deciding? Read This First.</h2>
      </div>

      <div className="faq-list">
        {FAQS.map((item, i) => (
          <FAQItem
            key={item.q}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  )
}