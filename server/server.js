import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import numberRoutes from './routes/numbers.js'
import categoryRoutes from './routes/categories.js'
import faqRoutes from './routes/faqs.js'
import reviewRoutes from './routes/reviews.js'
import enquiryRoutes from './routes/enquiries.js'
import authRoutes from './routes/auth.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/numbers', numberRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/faqs', faqRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => res.send('VIP Number API running'))

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
