import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Button ke liye Link
import './FeaturedNumbers.css';

const PATTERN_COLORS = {
  VIP: '#f1d89a',
  Repeater: '#d4af6a',
  Sequential: '#c9a86a',
  Mirror: '#e6c887',
  'Double Digit': '#dcb877',
  Fancy: '#efd39a',
  Lucky: '#d9b46a',
};

function NumberCard({ item }) {
  const [saved, setSaved] = useState(false);

  // 👇 LINE 17 PE YAHAN BANAO YE FUNCTION 👇
  const handleBuyNow = () => {
    const adminNum = "9000002620"; // Apna WhatsApp number daalo (91 ke sath)
    const msg = encodeURIComponent(`Hi, I want to buy Number: ${item.number} for ₹${item.price}`);
    window.open(`https://wa.me/${adminNum}?text=${msg}`, '_blank');
  };
  // 👆 YAHAN TAK 👆

  return (
    <div className="fn-card">
      <div className="fn-card-top">
        <span 
          className="fn-pattern" 
          style={{ color: PATTERN_COLORS[item.category] || '#d4af6a' }}
        >
          {item.category} 
        </span>
        <button 
          className={`fn-heart ${saved ? 'fn-heart-active' : ''}`}
          onClick={() => setSaved((s) => !s)}
        >
          {saved ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="fn-number">{item.number}</div>
      
      <div className="fn-meta">
        <span>Ready to Port Anywhere</span>
      </div>

      <div className="fn-card-bottom">
        <div className="fn-price">
          <span className="fn-price-label">Price</span>
          <span className="fn-price-value">₹{item.price.toLocaleString('en-IN')}</span> 
        </div>
        <button className="fn-buy" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
}

export default function FeaturedNumbers() {
  const [dbNumbers, setDbNumbers] = useState([]);

  useEffect(() => {
    fetch('http://172.20.10.6:5000/api/numbers')
      .then((res) => res.json())
      .then((data) => {
        // Sirf 15 lakh se kam wale numbers
        const normalNumbers = data.filter(item => item.price < 1500000);
        setDbNumbers(normalNumbers);
      })
      .catch((err) => console.log("API Error:", err));
  }, []);

  return (
    <section className="fn-section">
      <div className="fn-heading">
        <p className="fn-eyebrow">Handpicked • This Week</p>
        <h2 className="fn-title">Featured VIP Numbers</h2>
        <p className="fn-sub">
          A curated shortlist of the most sought-after numbers across India, refreshed every week.
        </p>
      </div>

      {/* MAGIC YAHAN HAI: .slice(0, 8) lagaya hai taaki sirf pehle 8 hi dikhein */}
      <div className="fn-grid">
        {dbNumbers.slice(0, 8).map((item) => (
          <NumberCard key={item._id} item={item} />
        ))}
      </div>

      {/* TERA NAYA BUTTON */}
      <div className="fn-view-all">
        <Link to="/all-numbers" className="fn-view-all-btn">
          View All Numbers &rarr;
        </Link>
      </div>
    </section>
  );
}