import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Image
            src="/img/logo.png"
            alt="Green Dot Finance Personal Loans"
            width={200}
            height={50}
            className="h-auto mx-auto mb-4"
          />
          <p className="text-gray-400 text-sm mb-4">
            America's trusted online personal finance service, providing fixed-rate loans with competitive terms.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">
              Contact Us
            </Link>
          </div>
          <p className="text-gray-400 text-xs mt-4">© 2025 Green Dot Finance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
