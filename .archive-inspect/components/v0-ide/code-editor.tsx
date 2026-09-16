"use client"

import Editor from "@monaco-editor/react"

interface CodeEditorProps {
  code: string
  onChange: (value: string | undefined) => void
  language?: string
}

export function CodeEditor({ code, onChange, language = "typescript" }: CodeEditorProps) {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      value={code}
      onChange={onChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 13,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: "on",
        padding: { top: 16 },
      }}
    />
  )
}
