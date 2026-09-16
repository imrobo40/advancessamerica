"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Files,
  Play,
  Settings,
  Sparkles,
  Upload,
  MessageSquare,
  MoreHorizontal,
  Copy,
  Share2,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeEditor } from "./code-editor"
import { PreviewPanel } from "./preview-panel"
import { FileTree } from "./file-tree"
import { cn } from "@/lib/utils"

// Sample file structure
const fileStructure = [
  {
    name: "app",
    type: "folder" as const,
    path: "app",
    children: [
      { name: "layout.tsx", type: "file" as const, path: "app/layout.tsx" },
      { name: "page.tsx", type: "file" as const, path: "app/page.tsx" },
      { name: "globals.css", type: "file" as const, path: "app/globals.css" },
    ],
  },
  {
    name: "components",
    type: "folder" as const,
    path: "components",
    children: [
      { name: "hero-section.tsx", type: "file" as const, path: "components/hero-section.tsx" },
      { name: "header.tsx", type: "file" as const, path: "components/header.tsx" },
      { name: "footer.tsx", type: "file" as const, path: "components/footer.tsx" },
    ],
  },
  { name: "package.json", type: "file" as const, path: "package.json" },
  { name: "tailwind.config.ts", type: "file" as const, path: "tailwind.config.ts" },
]

// Sample code content
const sampleCode: Record<string, string> = {
  "app/page.tsx": `import { HeroSection } from "@/components/hero-section"
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
}`,
  "app/layout.tsx": `import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Capital Lend - Fast Cash Loans",
  description: "Get fast cash today with Capital Lend.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}`,
  "components/hero-section.tsx": `export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-gray-900">
          Fast Cash Loans
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Get the financial support you need, when you need it.
        </p>
      </div>
    </section>
  )
}`,
}

export function V0IDE() {
  const [selectedFile, setSelectedFile] = useState("app/page.tsx")
  const [code, setCode] = useState(sampleCode["app/page.tsx"])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<"code" | "preview">("preview")
  const [chatMessages] = useState([
    { role: "assistant", content: "I've created a Capital Lend loan solutions landing page with hero section, about section, and loan solutions components." },
  ])

  const handleFileSelect = (path: string) => {
    setSelectedFile(path)
    setCode(sampleCode[path] || "// File content not loaded")
  }

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-[#0a0a0a] text-white">
      {/* Top Header Bar */}
      <header className="flex h-12 items-center justify-between border-b border-[#1f1f1f] bg-[#0a0a0a] px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-white">
              <span className="text-sm font-bold text-black">v0</span>
            </div>
            <span className="text-sm font-medium text-[#999]">/</span>
            <span className="text-sm text-white">Capital Lend</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 text-[#999] hover:bg-[#1a1a1a] hover:text-white"
          >
            <Copy className="h-4 w-4" />
            <span className="text-xs">Fork</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 text-[#999] hover:bg-[#1a1a1a] hover:text-white"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-xs">Share</span>
          </Button>
          <Button
            size="sm"
            className="h-8 gap-2 bg-white text-black hover:bg-gray-200"
          >
            <Upload className="h-4 w-4" />
            <span className="text-xs font-medium">Publish</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-[#999] hover:bg-[#1a1a1a] hover:text-white"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Chat/Prompt Panel */}
        <div className="flex w-[400px] flex-col border-r border-[#1f1f1f] bg-[#0a0a0a]">
          {/* Chat area */}
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-sm text-[#ccc] leading-relaxed">
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt input */}
          <div className="border-t border-[#1f1f1f] p-4">
            <div className="relative">
              <textarea
                placeholder="Ask v0 a question..."
                className="min-h-[100px] w-full resize-none rounded-lg border border-[#2a2a2a] bg-[#0f0f0f] p-3 pr-12 text-sm text-white placeholder-[#666] focus:border-[#444] focus:outline-none"
              />
              <Button
                size="sm"
                className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white p-0 text-black hover:bg-gray-200"
              >
                <Play className="h-4 w-4 ml-0.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Code/Preview */}
        <div className="flex flex-1 flex-col">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-[#1f1f1f] bg-[#0a0a0a] px-2">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "code" | "preview")} className="w-full">
              <TabsList className="h-10 bg-transparent">
                <TabsTrigger
                  value="preview"
                  className="gap-2 rounded-none border-b-2 border-transparent px-4 py-2 text-[#666] data-[state=active]:border-white data-[state=active]:bg-transparent data-[state=active]:text-white"
                >
                  <Play className="h-4 w-4" />
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="gap-2 rounded-none border-b-2 border-transparent px-4 py-2 text-[#666] data-[state=active]:border-white data-[state=active]:bg-transparent data-[state=active]:text-white"
                >
                  <Code2 className="h-4 w-4" />
                  Code
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {activeTab === "code" && (
              <>
                {/* File sidebar */}
                <div
                  className={cn(
                    "flex flex-col border-r border-[#1f1f1f] bg-[#0a0a0a] transition-all duration-300",
                    sidebarOpen ? "w-60" : "w-0"
                  )}
                >
                  {sidebarOpen && (
                    <>
                      <div className="flex items-center justify-between border-b border-[#1f1f1f] px-3 py-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-[#999]">
                          <Files className="h-4 w-4" />
                          FILES
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-[#666] hover:text-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex-1 overflow-auto">
                        <FileTree
                          files={fileStructure}
                          selectedFile={selectedFile}
                          onSelectFile={handleFileSelect}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Code editor */}
                <div className="flex flex-1 flex-col">
                  {!sidebarOpen && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-2 z-10 h-8 w-8 p-0 text-[#666] hover:text-white"
                      onClick={() => setSidebarOpen(true)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                  {/* File tab */}
                  <div className="flex items-center border-b border-[#1f1f1f] bg-[#0f0f0f]">
                    <div className="flex items-center gap-2 border-r border-[#1f1f1f] bg-[#0a0a0a] px-3 py-2">
                      <span className="text-xs text-[#3178c6]">TS</span>
                      <span className="text-xs text-white">{selectedFile.split("/").pop()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 text-[#666] hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <CodeEditor
                      code={code}
                      onChange={handleCodeChange}
                      language="typescript"
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === "preview" && (
              <div className="flex-1">
                <PreviewPanel url="/" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
