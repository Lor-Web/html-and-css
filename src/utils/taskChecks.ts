import type { TaskCheck } from '@/types/content'

function normalizeColor(value: string): string {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext('2d')
  if (!ctx) return value.trim().toLowerCase()
  ctx.fillStyle = '#000'
  ctx.fillStyle = value
  return String(ctx.fillStyle)
}

export function runTaskChecks(
  doc: Document,
  checks: TaskCheck[],
): { id: string; passed: boolean }[] {
  return checks.map((check) => {
    try {
      if (check.type === 'selector-exists' && check.selector) {
        return { id: check.id, passed: Boolean(doc.querySelector(check.selector)) }
      }

      if (check.type === 'selector-count' && check.selector) {
        const count = doc.querySelectorAll(check.selector).length
        const min = check.min ?? 1
        return { id: check.id, passed: count >= min }
      }

      if (check.type === 'attribute' && check.selector && check.attribute) {
        const el = doc.querySelector(check.selector)
        if (!el) return { id: check.id, passed: false }
        const value = el.getAttribute(check.attribute)
        if (value === null || value.trim() === '') {
          return { id: check.id, passed: false }
        }
        if (check.expected !== undefined) {
          return { id: check.id, passed: value === check.expected }
        }
        return { id: check.id, passed: true }
      }

      if (check.type === 'text-includes' && check.text) {
        return {
          id: check.id,
          passed: (doc.body.textContent ?? '').includes(check.text),
        }
      }

      if (
        (check.type === 'selector-style' || check.type === 'style-not') &&
        check.selector &&
        check.property &&
        check.expected
      ) {
        const el = doc.querySelector(check.selector)
        if (!el) return { id: check.id, passed: false }
        const styles = doc.defaultView?.getComputedStyle(el)
        if (!styles) return { id: check.id, passed: false }
        const actual = styles.getPropertyValue(check.property).trim()
        const expected = check.expected.trim()

        let matches = actual === expected
        if (check.property.includes('color') || check.property.includes('background')) {
          matches = normalizeColor(actual) === normalizeColor(expected)
        }

        return {
          id: check.id,
          passed: check.type === 'style-not' ? !matches : matches,
        }
      }
    } catch {
      return { id: check.id, passed: false }
    }

    return { id: check.id, passed: false }
  })
}

export function buildPreviewDocument(html: string, css: string): string {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <style>
    html, body { margin: 0; min-height: 100%; }
    ${css}
  </style>
</head>
<body>
${html}
</body>
</html>`
}
