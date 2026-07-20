const API_BASE = 'https://vip-backend-3ds4.onrender.com/api'

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed with ${res.status}`)
  }
  return res.json()
}

export const api = {
  getFeaturedNumbers: () =>
    fetch(`${API_BASE}/numbers?featured=true`).then(handleResponse),
  getCategories: () => fetch(`${API_BASE}/categories`).then(handleResponse),
  getFaqs: () => fetch(`${API_BASE}/faqs`).then(handleResponse),
  getReviews: () => fetch(`${API_BASE}/reviews`).then(handleResponse),
  createEnquiry: (data) =>
    fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
}
