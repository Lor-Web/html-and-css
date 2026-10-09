import { message } from 'antd'
import { Fragment, useMemo, type ReactNode } from 'react'
import './RichGoalText.scss'

const CODE_PATTERN =
  /([a-z][\w-]*\.[a-zA-Z_][\w-]*)|(\.[a-zA-Z_][\w-]*)|(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b)|(#[a-zA-Z_][\w-]*)|(\b[\w:-]+="[^"]*")|(\b(?:max-width|min-width|min-height|max-height|flex-basis|flex-grow|flex-shrink|border-radius|border-collapse|letter-spacing|line-height|text-align|vertical-align|list-style|background|opacity|padding|margin|gap|width|height|display|cursor)\b(?:\s*:\s*|\s+)(?:\d+(?:\.\d+)?(?:px|%|rem|em|vh|vw)?|auto|none|solid|collapse|not-allowed|center|top|flex|grid|block|inline-block)?)|(\b\d+\s*[×x]\s*\d+px\b)|(\b\d+(?:\.\d+)?(?:px|%|rem|em|vh|vw)\b)|(\bnot-allowed\b)|(\b\d+\.\d+\b)/g

async function copyCode(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    message.success(`Скопировано: ${value}`)
  } catch {
    message.error('Не удалось скопировать')
  }
}

function normalizeToken(raw: string): string {
  const trimmed = raw.trim()
  // "max-width 960px" → удобнее копировать как CSS-значение
  const propValue = trimmed.match(
    /^(max-width|min-width|min-height|max-height|flex-basis|flex-grow|flex-shrink|border-radius|border-collapse|letter-spacing|line-height|text-align|vertical-align|list-style|background|opacity|padding|margin|gap|width|height|display|cursor)\s+(\S+)$/i,
  )
  if (propValue) {
    return `${propValue[1]}: ${propValue[2]}`
  }
  // "22x22px" / "22×22px" → width/height shorthand hint
  const box = trimmed.match(/^(\d+)\s*[×x]\s*(\d+)px$/i)
  if (box) {
    return `${box[1]}px`
  }
  return trimmed
}

function tokenize(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  const pattern = new RegExp(CODE_PATTERN.source, 'g')

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const raw = match[0]
    const value = normalizeToken(raw)
    nodes.push(
      <button
        key={`${match.index}-${value}`}
        type="button"
        className="rich-goal-code"
        title="Нажмите, чтобы скопировать"
        onClick={() => {
          void copyCode(value)
        }}
      >
        <code>{raw.trim()}</code>
      </button>,
    )
    lastIndex = match.index + raw.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

interface RichGoalTextProps {
  text: string
}

export function RichGoalText({ text }: RichGoalTextProps) {
  const parts = useMemo(() => tokenize(text), [text])

  return (
    <span className="rich-goal-text">
      {parts.map((part, index) => (
        <Fragment key={index}>{part}</Fragment>
      ))}
    </span>
  )
}
