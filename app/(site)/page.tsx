import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { LoanSolutionsSection } from "@/components/loan-solutions-section"
import { HistorySection } from "@/components/history-section"
import { BorrowersSection } from "@/components/borrowers-section"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <WhyChooseSection />
      <LoanSolutionsSection />
      <HistorySection />
      <BorrowersSection />
      <TestimonialsSection />
    </main>
  )
}
