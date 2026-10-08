import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { EditorView } from '@codemirror/view'
import CodeMirror from '@uiw/react-codemirror'
import { useMemo } from 'react'

type EditorLanguage = 'html' | 'css'

interface SandboxCodeEditorProps {
  language: EditorLanguage
  value: string
  onChange: (value: string) => void
  label: string
}

const editorTheme = EditorView.theme(
  {
    '&': {
      height: '100%',
      fontSize: '0.875rem',
      backgroundColor: '#121820',
    },
    '.cm-scroller': {
      fontFamily: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
      lineHeight: '1.6',
    },
    '.cm-content': {
      caretColor: '#ff7a45',
      padding: '0.75rem 0',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: '#ff7a45',
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: 'rgba(41, 101, 241, 0.35)',
      },
    '.cm-gutters': {
      backgroundColor: '#0d1218',
      color: '#6b778c',
      border: 'none',
      borderRight: '1px solid rgba(232, 238, 248, 0.08)',
      minWidth: '3rem',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      padding: '0 0.75rem 0 0.5rem',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(240, 101, 41, 0.08)',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'rgba(240, 101, 41, 0.12)',
      color: '#ff9a6b',
    },
    '.cm-matchingBracket, .cm-nonmatchingBracket': {
      backgroundColor: 'rgba(91, 140, 255, 0.25)',
      outline: '1px solid rgba(91, 140, 255, 0.5)',
    },
  },
  { dark: true },
)

export function SandboxCodeEditor({
  language,
  value,
  onChange,
  label,
}: SandboxCodeEditorProps) {
  const extensions = useMemo(
    () => [language === 'html' ? html() : css(), EditorView.lineWrapping],
    [language],
  )

  return (
    <div className="sandbox-editor">
      <CodeMirror
        value={value}
        height="100%"
        theme={editorTheme}
        extensions={extensions}
        onChange={onChange}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          foldGutter: false,
          autocompletion: true,
          bracketMatching: true,
          closeBrackets: true,
          indentOnInput: true,
        }}
        aria-label={label}
      />
    </div>
  )
}
