import mongoose from 'mongoose'
const faqSchema = new mongoose.Schema({ question: String, answer: String, order: { type: Number, default: 0 } }, { timestamps: true })
export default mongoose.model('Faq', faqSchema)
