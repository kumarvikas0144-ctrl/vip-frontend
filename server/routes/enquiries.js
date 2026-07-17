import { Router } from 'express'
import Enquiry from '../models/Enquiry.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body)
    res.status(201).json(enquiry)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 })
    res.json(enquiries)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
