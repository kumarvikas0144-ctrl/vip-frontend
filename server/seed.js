import 'dotenv/config'
import mongoose from 'mongoose'
import Category from './models/Category.js'

const MONGODB_URI = process.env.MONGODB_URI

const categories = [
  { name: 'VIP Numbers', slug: 'vip', description: 'Prestige numbers for leaders & brands', preview: '98XXXXX999' },
  { name: 'Fancy Numbers', slug: 'fancy', description: 'Stylish, easy-to-remember patterns', preview: '9XX1XX1XX1' },
  { name: 'Lucky Numbers', slug: 'lucky', description: 'Numerology-picked for good fortune', preview: '9X786X786X' },
  { name: 'Repeater', slug: 'repeater', description: 'A pair of digits, repeating in rhythm', preview: '9797979797' },
  { name: 'Mirror', slug: 'mirror', description: 'Reads the same, forwards and back', preview: '9812XX2189' },
  { name: 'Sequential', slug: 'sequential', description: 'Digits that climb in perfect order', preview: '9123456789' },
  { name: 'Double Digit', slug: 'double-digit', description: 'Every digit paired, twice over', preview: '9955XX7788' },
]

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected')

  for (const cat of categories) {
    await Category.updateOne(
      { slug: cat.slug },
      { $set: cat },
      { upsert: true }
    )
  }

  console.log('All 7 categories seeded!')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
