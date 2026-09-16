import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { BorrowersSection } from "@/components/borrowers-section"
import { HeroSection } from "@/components/hero-section"
import { HistorySection } from "@/components/history-section"
import { LoanSolutionsSection } from "@/components/loan-solutions-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { WhyChooseSection } from "@/components/why-choose-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <LoanSolutionsSection />
        <HistorySection />
        <BorrowersSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}
