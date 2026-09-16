"use client"

import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
  path: string
}

interface FileTreeProps {
  files: FileNode[]
  selectedFile: string
  onSelectFile: (path: string) => void
}

function FileTreeItem({
  node,
  depth,
  selectedFile,
  onSelectFile,
}: {
  node: FileNode
  depth: number
  selectedFile: string
  onSelectFile: (path: string) => void
}) {
  const [isOpen, setIsOpen] = useState(depth < 2)

  const isSelected = selectedFile === node.path

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center gap-1 px-2 py-1 text-sm text-[#999] hover:bg-[#1a1a1a] hover:text-white",
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {isOpen ? (
            <ChevronDown className="h-3 w-3 shrink-0" />
          ) : (
            <ChevronRight className="h-3 w-3 shrink-0" />
          )}
          {isOpen ? (
            <FolderOpen className="h-4 w-4 shrink-0 text-[#54aeff]" />
          ) : (
            <Folder className="h-4 w-4 shrink-0 text-[#54aeff]" />
          )}
          <span className="truncate">{node.name}</span>
        </button>
        {isOpen && node.children && (
          <div>
            {node.children.map((child) => (
              <FileTreeItem
                key={child.path}
                node={child}
                depth={depth + 1}
                selectedFile={selectedFile}
                onSelectFile={onSelectFile}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  const getFileIcon = (name: string) => {
    if (name.endsWith(".tsx") || name.endsWith(".ts")) {
      return <span className="text-[10px] font-bold text-[#3178c6]">TS</span>
    }
    if (name.endsWith(".css")) {
      return <span className="text-[10px] font-bold text-[#563d7c]">CSS</span>
    }
    if (name.endsWith(".json")) {
      return <span className="text-[10px] font-bold text-[#cbcb41]">{"{}"}</span>
    }
    return <File className="h-4 w-4 text-[#666]" />
  }

  return (
    <button
      onClick={() => onSelectFile(node.path)}
      className={cn(
        "flex w-full items-center gap-2 px-2 py-1 text-sm hover:bg-[#1a1a1a]",
        isSelected ? "bg-[#1a1a1a] text-white" : "text-[#999]"
      )}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
    >
      {getFileIcon(node.name)}
      <span className="truncate">{node.name}</span>
    </button>
  )
}

export function FileTree({ files, selectedFile, onSelectFile }: FileTreeProps) {
  return (
    <div className="py-2">
      {files.map((node) => (
        <FileTreeItem
          key={node.path}
          node={node}
          depth={0}
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
        />
      ))}
    </div>
  )
}
