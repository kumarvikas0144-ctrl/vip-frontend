import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from './models/Admin.js'

await mongoose.connect(process.env.MONGODB_URI)

const email = 'kumarvikas0144@gmail.com'
const password = 'Vip@2026'

const hashed = await bcrypt.hash(password, 10)

await Admin.updateOne(
  { email },
  { $set: { email, password: hashed } },
  { upsert: true }
)

console.log('Admin account ready!')
console.log('Email:', email)
console.log('Password:', password)
process.exit(0)
