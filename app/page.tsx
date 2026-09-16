import { AboutSection } from "@/components/about-section"
import { BorrowersSection } from "@/components/borrowers-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HistorySection } from "@/components/history-section"
import { LoanSolutionsSection } from "@/components/loan-solutions-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { WhyChooseSection } from "@/components/why-choose-section"

export default function Page() {
  return (
    <>
      <Header />
      <main>
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

