import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/img/hero.png)" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">Digital Verification For Approved Customer</h1>
          <p className="text-xl md:text-2xl mb-8 text-balance opacity-90">Your Quick Loan Companion On-the-Go</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
              <Link href="/apply-now">Get Started</Link>
            </Button>
            {/* <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/bank-verification">Bank Authentication</Link>
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  )
}
