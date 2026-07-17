import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import './Categories.css'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState('loading')
  const navigate = useNavigate()

  useEffect(() => {
    // 🚀 BRAHMASTRA 2.0: Categories aur Numbers dono ek sath mangwao
    Promise.all([
      api.getCategories(),
      fetch('http://172.20.10.6:5000/api/numbers').then(r => r.json())
    ])
      .then(([catsData, numsData]) => {
        
        // React khud saare dabbon (categories) ke numbers ginega
        const finalCategories = catsData.map(cat => {
          const catSlug = (cat.slug || '').toLowerCase()
          
          // Asli ginti nikalo (Space aur Capital letters ko ignore karke)
          const matchCount = Array.isArray(numsData) ? numsData.filter(num => {
            if (!num.category) return false
            const numCat = num.category.toLowerCase().replace(/\s+/g, '-')
            return numCat === catSlug
          }).length : 0

          // Backend wale galat count ko replace karke apna asli count daal do
          return { ...cat, count: matchCount }
        })

        setCategories(finalCategories)
        setStatus('ready')
      })
      .catch((err) => {
        console.error(err)
        setStatus('error')
      })
  }, [])

  return (
    <section className="cg-section" id="categories-section">
      <div className="cg-heading">
        <p className="cg-eyebrow">Browse By Pattern</p>
        <h2 className="cg-title">Find Your Kind of Number</h2>
        <p className="cg-sub">
          Every pattern tells a different story. Pick the one that fits how
          you want to be remembered.
        </p>
      </div>
      
      {status === 'loading' && <p className="cg-status">Loading categories...</p>}
      
      {status === 'error' && (
        <p className="cg-status">Backend server chal raha hai kya?</p>
      )}
      
      {status === 'ready' && (
        <div className="cg-grid">
          {categories.map((cat) => (
            <button
              key={cat._id}
              className="cg-card"
              onClick={() => navigate('/category/' + cat.slug)}
            >
              <span className="cg-preview">{cat.preview}</span>
              <span className="cg-name">{cat.name}</span>
              <span className="cg-desc">{cat.description}</span>
              {/* Ab ye frontend ka apna smart calculator use karega */}
              <span className="cg-count">{cat.count} AVAILABLE</span>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}