import { Routes, Route } from 'react-router-dom'
import VipNumberLanding from './components/VipNumberLanding'
import FeaturedNumbers from './components/FeaturedNumbers'
import Categories from './components/Categories'
import WhyChooseUs from './components/Whychooseus'
import PremiumShowcase from './components/PremiumShowcase'
import Testimonials from './components/Testimonials'
import FAQ from './components/Faq'
import Footer from './components/Footer'
import CategoryPage from './components/CategoryPage'
import AllNumbers from './components/AllNumbers'
import AdminDashboard from './components/AdminDashboard'
import ContactPage from './components/ContactPage'
import AboutUs from './components/AboutUs'
import HowItWorks from './components/HowItWorks'

function HomePage() {
  return (
    <>
      <VipNumberLanding />
      <FeaturedNumbers />
      <Categories />
      <WhyChooseUs />
      <PremiumShowcase />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/all-numbers" element={<AllNumbers />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
    </Routes>
  )
}
//time
