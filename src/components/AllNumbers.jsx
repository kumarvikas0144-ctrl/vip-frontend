import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedNumbers.css'; // Hum same CSS use karenge cards ke liye

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
        <span>{item.circle} Circle</span>
      </div>
      <div className="fn-card-bottom">
        <div className="fn-price">
          <span className="fn-price-label">Price</span>
          <span className="fn-price-value">₹{item.price.toLocaleString('en-IN')}</span> 
        </div>
       <button className="fn-buy" onClick={() => { const msg = encodeURIComponent(`Hi! Mujhe ye number chahiye:\n\nNumber: ${item.number}\nPrice: ₹${item.price.toLocaleString("en-IN")}\nCircle: Ready to Port Anywhere\nCategory: ${item.category}`); window.open(`https://wa.me/919000002620?text=${msg}`, "_blank"); }}>Buy Now</button>
      </div>
    </div>
  );
}

export default function AllNumbers() {
  const [dbNumbers, setDbNumbers] = useState([]);

  useEffect(() => {
    fetch('https://vip-backend-3ds4.onrender.com/api/numbers')
      .then((res) => res.json())
      .then((data) => {
        const normalNumbers = data.filter(item => item.price < 1500000);
        setDbNumbers(normalNumbers); // Yahan koi .slice() nahi lagaya hai, saare dikhenge!
      })
      .catch((err) => console.log("API Error:", err));
  }, []);

  return (
    <div style={{ backgroundColor: '#111', minHeight: '100vh', padding: '40px 0', color: 'white' }}>
      <section className="fn-section">
        
        {/* Back Button & Heading */}
        <div className="fn-heading" style={{ textAlign: 'center' }}>
          <Link to="/" style={{ color: '#d4af6a', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>
            &larr; Back to Home
          </Link>
          <h2 className="fn-title" style={{ marginTop: '20px' }}>Complete VIP Collection</h2>
          <p className="fn-sub">
            Explore our entire inventory of premium numbers across all categories.
          </p>
        </div>

        {/* Grid jisme saare numbers aayenge */}
        <div className="fn-grid">
          {dbNumbers.map((item) => (
            <NumberCard key={item._id} item={item} />
          ))}
        </div>

      </section>
    </div>
  );
}