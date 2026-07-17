import { Router } from 'express'
import Category from '../models/Category.js'
import NumberModel from '../models/Number.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 })
    const withCounts = await Promise.all(
      categories.map(async (cat) => {
        const enumName = cat.name.replace(' Numbers', '').trim()
        const count = await NumberModel.countDocuments({ category: enumName, status: 'Available' })
        return { ...cat.toObject(), count }
      })
    )
    res.json(withCounts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
