import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import Admin from '../models/Admin.js'

const router = Router()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(400).json({ error: 'Invalid email or password' })

    const match = await bcrypt.compare(password, admin.password)
    if (!match) return res.status(400).json({ error: 'Invalid email or password' })

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// FORGOT PASSWORD - send OTP
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(400).json({ error: 'Is email se koi admin account nahi hai' })

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    admin.otp = otp
    admin.otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 min
    await admin.save()

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'VIP Number Admin - Password Reset OTP',
      text: `Aapka OTP hai: ${otp}\n\nYe 10 minute mein expire ho jayega.`,
    })

    res.json({ message: 'OTP bhej diya gaya email pe' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// RESET PASSWORD - verify OTP + set new password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(400).json({ error: 'Admin nahi mila' })

    if (admin.otp !== otp) return res.status(400).json({ error: 'Galat OTP' })
    if (!admin.otpExpiry || admin.otpExpiry < new Date()) return res.status(400).json({ error: 'OTP expire ho gaya, dobara try karo' })

    const hashed = await bcrypt.hash(newPassword, 10)
    admin.password = hashed
    admin.otp = undefined
    admin.otpExpiry = undefined
    await admin.save()

    res.json({ message: 'Password reset ho gaya' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
