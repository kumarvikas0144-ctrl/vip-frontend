import 'dotenv/config'
import mongoose from 'mongoose'
import Category from './models/Category.js'

await mongoose.connect(process.env.MONGODB_URI)

await Category.updateOne(
  { slug: 'vvip' },
  { $set: { name: 'VVIP Numbers', slug: 'vvip', description: 'Ultra premium numbers for elite buyers', preview: '9999999999' } },
  { upsert: true }
)

console.log('VVIP added!')
process.exit(0)
