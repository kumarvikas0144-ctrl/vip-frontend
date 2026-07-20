import { useState, useEffect } from 'react';
import './PremiumShowcase.css';

export default function PremiumShowcase() {
  const [premiumNumbers, setPremiumNumbers] = useState([]);

  useEffect(() => {
    fetch('http://172.20.10.6:5000/api/numbers')
      .then((res) => res.json())
      .then((data) => {
        // Sirf 15 Lakh ya usse mehnge numbers filter karo
        const expensiveNumbers = data.filter(item => item.price >= 1500000);
        setPremiumNumbers(expensiveNumbers);
      })
      .catch((err) => console.log("API Error:", err));
  }, []);

  // Agar database me 15 lakh se upar ka koi number nahi hai, toh ye section hide rahega
  if (premiumNumbers.length === 0) return null; 

  return (
    <section className="ps-section">
      <div className="ps-heading">
        <p className="ps-eyebrow">The Vault</p>
        <h2 className="ps-title">Numbers That Don't Repeat Twice</h2>
        <p className="ps-sub">
          A small set of numbers so rare, only one buyer will ever own each.
        </p>
      </div>

      <div className="ps-grid">
        {premiumNumbers.map((item, index) => (
          <div key={item._id} className={`ps-card ${index === 1 ? 'ps-featured' : ''}`}>
            
            {/* Beech wale (index 1) card par Most Enquired ka ribbon dikhayenge */}
            {index === 1 && <span className="ps-ribbon">Most Enquired</span>}
            
            <span className="ps-tag">{item.category}</span>
            <div className="ps-number">{item.number}</div>
            <p className="ps-desc">A flawless premium number, unmistakable and unrepeatable.</p>
            
            <div className="ps-bottom">
              <div className="ps-price">
                <span>Price</span>
                {/* toLocaleString se 1500000 -> 15,00,000 ban jayega */}
                <strong>₹{item.price.toLocaleString('en-IN')}</strong>
              </div>
              <button className="ps-enquire" onClick={() => { const msg = encodeURIComponent(`Hi! Mujhe ye number chahiye:\n\nNumber: ${item.number}\nPrice: ₹${item.price.toLocaleString("en-IN")}\nCategory: ${item.category}`); window.open(`https://wa.me/919000002620?text=${msg}`, "_blank"); }}>Enquire Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}