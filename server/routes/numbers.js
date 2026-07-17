import { Router } from 'express'
import NumberModel from '../models/Number.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.featured) filter.featured = req.query.featured === 'true'
    if (req.query.category) filter.category = req.query.category
    const numbers = await NumberModel.find(filter).sort({ createdAt: -1 })
    res.json(numbers)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const number = await NumberModel.create(req.body)
    res.status(201).json(number)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
