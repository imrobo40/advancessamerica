"use client"

import { RefreshCw, ExternalLink, Smartphone, Monitor, Tablet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface PreviewPanelProps {
  url: string
}

type DeviceType = "desktop" | "tablet" | "mobile"

export function PreviewPanel({ url }: PreviewPanelProps) {
  const [device, setDevice] = useState<DeviceType>("desktop")
  const [key, setKey] = useState(0)

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  }

  const handleRefresh = () => {
    setKey((prev) => prev + 1)
  }

  return (
    <div className="flex h-full flex-col bg-[#0a0a0a]">
      {/* Preview toolbar */}
      <div className="flex items-center justify-between border-b border-[#1f1f1f] bg-[#0f0f0f] px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-[#1a1a1a] p-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 w-7 p-0 ${device === "desktop" ? "bg-[#2a2a2a] text-white" : "text-[#666]"}`}
              onClick={() => setDevice("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 w-7 p-0 ${device === "tablet" ? "bg-[#2a2a2a] text-white" : "text-[#666]"}`}
              onClick={() => setDevice("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 w-7 p-0 ${device === "mobile" ? "bg-[#2a2a2a] text-white" : "text-[#666]"}`}
              onClick={() => setDevice("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-[#666] hover:text-white"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-[#666] hover:text-white"
            onClick={() => window.open(url, "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview iframe container */}
      <div className="flex flex-1 items-start justify-center overflow-auto bg-[#0a0a0a] p-4">
        <div
          className="h-full overflow-hidden rounded-lg border border-[#1f1f1f] bg-white transition-all duration-300"
          style={{ width: deviceWidths[device], maxWidth: "100%" }}
        >
          <iframe
            key={key}
            src={url}
            className="h-full w-full"
            title="Preview"
          />
        </div>
      </div>
    </div>
  )
}
