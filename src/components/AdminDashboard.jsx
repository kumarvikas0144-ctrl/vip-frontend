import React, { useState, useEffect } from "react";

function ReviewSection() {
  const [reviews, setReviews] = React.useState([])

  function load() {
    fetch("http://localhost:5000/api/reviews")
      .then(r => r.json())
      .then(data => setReviews(Array.isArray(data) ? data : []))
      .catch(() => {})
  }

  React.useEffect(() => { load() }, [])

  async function handleDelete(id) {
    if (!window.confirm("Ye review delete karo?")) return
    await fetch(`http://localhost:5000/api/reviews/${id}`, { method: "DELETE" })
    load()
  }

  if (reviews.length === 0) return <p style={{color:"#999"}}>Abhi koi review nahi hai.</p>

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {reviews.map(r => (
        <div key={r._id} style={{ backgroundColor: "#333", padding: "14px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ color: "#f1d89a", margin: "0 0 4px", fontWeight: "bold" }}>{r.customerName} — {r.city} {"★".repeat(r.rating)}</p>
            <p style={{ color: "#ccc", margin: 0, fontSize: "14px" }}>{r.reviewText}</p>
          </div>
          <button onClick={() => handleDelete(r._id)} style={{ background: "#e74c3c", color: "white", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", flexShrink: 0, marginLeft: "12px" }}>Delete 🗑️</button>
        </div>
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  const [bulkText, setBulkText] = useState('');
  const [extractedNumbers, setExtractedNumbers] = useState([]);
  const [allNumbers, setAllNumbers] = useState([]); 
  
  // ---> NAYA SEARCH STATE <---
  const [searchQuery, setSearchQuery] = useState(''); 
  
  const [bulkData, setBulkData] = useState({
    price: '',
    category: 'vip',
    circle: 'Delhi'
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/numbers')
      .then((res) => res.json())
      .then((data) => {
        setAllNumbers(data);
      })
      .catch((err) => console.log("List laane mein error:", err));
  }, []);

  const handleExtract = () => {
    const lines = bulkText.split('\n');
    let validNumbers = [];

    lines.forEach(line => {
      const allDigits = line.replace(/[^0-9]/g, '');
      if (allDigits.length >= 10) {
        const correctNumber = allDigits.substring(0, 10);
        validNumbers.push(correctNumber);
      }
    });

    const uniqueNumbers = [...new Set(validNumbers)];
    
    if (uniqueNumbers.length === 0) {
      alert("Ek bhi valid 10-digit number nahi mila! List check kar.");
    } else {
      setExtractedNumbers(uniqueNumbers);
    }
  };

  const handleBulkSubmit = async () => {
    if (extractedNumbers.length === 0) return alert("Pehle numbers extract karo!");
    if (!bulkData.price) return alert("Bhai, Price dalna bhool gaye!");

    try {
      for (let num of extractedNumbers) {
        await fetch('http://localhost:5000/api/numbers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            number: num,
            price: Number(bulkData.price),
            category: bulkData.category,
           circle: "Ready to Port Anywhere"
          }),
        });
      }
      
      alert(`Bhaiwa! Ek sath ${extractedNumbers.length} numbers database me add ho gaye! 🔥`);
      setBulkText('');
      setExtractedNumbers([]);
      setBulkData({ ...bulkData, price: '' });
      
      // Naye numbers ko list mein refresh karo
      fetch('http://localhost:5000/api/numbers')
        .then((res) => res.json())
        .then((data) => setAllNumbers(data));

    } catch (error) {
      console.log("Error:", error);
      alert('Kuch numbers save nahi huye, server check kar.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bhai, pakka delete karu? Bikk gaya kya?")) return;

    try {
      await fetch(`http://localhost:5000/api/numbers/${id}, {
        method: 'DELETE'
      }`);
      setAllNumbers(allNumbers.filter(num => num._id !== id));
    } catch (err) {
      alert("Delete nahi hua, server check kar.");
    }
  };

  // ---> SEARCH FILTER LOGIC <---
  // Ye check karega ki input me jo likha hai, wo number me hai ya nahi
  const filteredNumbers = allNumbers?.filter((item) => 
    item.number.includes(searchQuery)
  );

  return (
    <div style={{ padding: '40px', color: 'white', backgroundColor: '#111', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h2>👑 VIP Admin Dashboard</h2>
      <p style={{ color: '#ccc', marginBottom: '30px' }}>WhatsApp message seedha yahan paste karo.</p>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Left Side: Paste Box */}
        <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#222', padding: '20px', borderRadius: '10px' }}>
          <h3>1. Paste WhatsApp Message</h3>
          <textarea 
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            placeholder="Paste your numbers list here..."
            style={{ width: '100%', height: '200px', padding: '10px', marginTop: '10px', borderRadius: '5px', backgroundColor: '#333', color: 'white', border: 'none' }}
          />
          <button 
            onClick={handleExtract} 
            style={{ width: '100%', padding: '12px', marginTop: '15px', backgroundColor: '#d4af6a', color: 'black', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
            Extract Numbers 🔍
          </button>
        </div>

        {/* Right Side: Setup & Save */}
        {extractedNumbers.length > 0 && (
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#222', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ color: '#4ade80' }}>2. Found {extractedNumbers.length} Numbers!</h3>
            
            <div style={{ height: '80px', overflowY: 'auto', backgroundColor: '#111', padding: '10px', marginTop: '10px', borderRadius: '5px', fontSize: '14px', color: '#ccc' }}>
              {extractedNumbers.join(', ')}
            </div>

            <div style={{ marginTop: '20px' }}>
              <label>Common Price (₹):</label><br/>
              <input 
                type="number" 
                value={bulkData.price} 
                onChange={(e) => setBulkData({...bulkData, price: e.target.value})} 
                placeholder="e.g. 9500"
                style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: 'none' }}
              />
            </div>

            <div style={{ marginTop: '15px' }}>
              <label>Category:</label><br/>
              <select value={bulkData.category} onChange={(e) => setBulkData({...bulkData, category: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: 'none' }}>
                <option value="VVIP">VVIP Numbers</option>
                <option value="VIP">VIP Numbers</option>
                <option value="fancy">Fancy Numbers</option>
                <option value="lucky">Lucky Numbers</option>
                <option value="repeater">Repeater</option>
                <option value="mirror">Mirror</option>
                <option value="sequential">Sequential</option>
                <option value="double-digit">Double Digit</option>
              </select>
            </div>

            <button 
              onClick={handleBulkSubmit} 
              style={{ width: '100%', padding: '12px', marginTop: '20px', backgroundColor: '#4ade80', color: 'black', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
              Save All {extractedNumbers.length} Numbers to Database 🚀
            </button>
          </div>
        )}
      </div>

      {/* ---------- DELETE & SEARCH WALI LIST ---------- */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#222', borderRadius: '10px' }}>
        <h3 style={{ color: 'white', marginBottom: '15px' }}>📦 Live Numbers (Inventory)</h3>
        
        {/* ---> NAYA SEARCH INPUT <--- */}
        <input 
          type="text" 
          placeholder="🔍 Koi bhi number search kar..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '5px', border: 'none', backgroundColor: '#333', color: 'white', fontSize: '16px' }}
        />

        {filteredNumbers && filteredNumbers.length === 0 ? (
          <p style={{ color: '#888' }}>Koi number nahi mila bhai.</p>
        ) : (
          filteredNumbers?.map((item) => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #444', color: 'white' }}>
              <span><b style={{color: '#d4af6a'}}>{item.number}</b> - ₹{item.price} ({item.category})</span>
              
              <button 
                onClick={() => handleDelete(item._id)} 
                style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                Sold / Delete 🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* Reviews Section */}
      <div style={{ marginTop: "40px", backgroundColor: "#222", padding: "20px", borderRadius: "10px" }}>
        <h3 style={{ color: "white", marginBottom: "15px" }}>⭐ Customer Reviews</h3>
        <ReviewSection /></div>

    </div>
  );
}