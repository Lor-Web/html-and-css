import { CopyOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, ColorPicker, Input, Segmented, Slider, message } from 'antd'
import type { Color } from 'antd/es/color-picker'
import { useMemo, useState } from 'react'
import { PropLabel } from '@/components/cheatsheets/PropLabel'
import './ColorsCheatsheet.scss'

type ApplyTarget = 'background' | 'color' | 'border'

interface Rgba {
  r: number
  g: number
  b: number
  a: number
}

interface Hsla {
  h: number
  s: number
  l: number
  a: number
}

const PALETTE = [
  { name: 'HTML orange', hex: '#f06529' },
  { name: 'CSS blue', hex: '#2965f1' },
  { name: 'Ink', hex: '#1a2332' },
  { name: 'Slate', hex: '#5a667a' },
  { name: 'Cloud', hex: '#e8eef6' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Success', hex: '#1f9d6a' },
  { name: 'Warning', hex: '#d97706' },
  { name: 'Danger', hex: '#d4380d' },
  { name: 'Violet', hex: '#7c3aed' },
  { name: 'Teal', hex: '#0d9488' },
  { name: 'Pink', hex: '#db2777' },
  { name: 'Gold', hex: '#eab308' },
  { name: 'Sky', hex: '#38bdf8' },
  { name: 'Forest', hex: '#166534' },
  { name: 'Night', hex: '#0f141c' },
]

const NAMED = [
  'tomato',
  'coral',
  'gold',
  'khaki',
  'limegreen',
  'teal',
  'steelblue',
  'royalblue',
  'slateblue',
  'orchid',
  'crimson',
  'dimgray',
]

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function hexToRgba(hex: string, a = 1): Rgba | null {
  const raw = hex.replace('#', '').trim()
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((ch) => ch + ch)
          .join('')
      : raw
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null
  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
    a,
  }
}

function rgbaToHex({ r, g, b }: Rgba): string {
  const to = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`
}

function rgbaToHsla({ r, g, b, a }: Rgba): Hsla {
  const rr = r / 255
  const gg = g / 255
  const bb = b / 255
  const max = Math.max(rr, gg, bb)
  const min = Math.min(rr, gg, bb)
  const delta = max - min
  let h = 0
  if (delta !== 0) {
    if (max === rr) h = ((gg - bb) / delta) % 6
    else if (max === gg) h = (bb - rr) / delta + 2
    else h = (rr - gg) / delta + 4
    h *= 60
    if (h < 0) h += 360
  }
  const l = (max + min) / 2
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a,
  }
}

function hslaToRgba({ h, s, l, a }: Hsla): Rgba {
  const ss = s / 100
  const ll = l / 100
  const c = (1 - Math.abs(2 * ll - 1)) * ss
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = ll - c / 2
  let rr = 0
  let gg = 0
  let bb = 0
  if (h < 60) [rr, gg, bb] = [c, x, 0]
  else if (h < 120) [rr, gg, bb] = [x, c, 0]
  else if (h < 180) [rr, gg, bb] = [0, c, x]
  else if (h < 240) [rr, gg, bb] = [0, x, c]
  else if (h < 300) [rr, gg, bb] = [x, 0, c]
  else [rr, gg, bb] = [c, 0, x]
  return {
    r: Math.round((rr + m) * 255),
    g: Math.round((gg + m) * 255),
    b: Math.round((bb + m) * 255),
    a,
  }
}

function formatRgb(c: Rgba, withAlpha: boolean) {
  if (withAlpha) return `rgba(${c.r}, ${c.g}, ${c.b}, ${Number(c.a.toFixed(2))})`
  return `rgb(${c.r}, ${c.g}, ${c.b})`
}

function formatHsl(c: Hsla, withAlpha: boolean) {
  if (withAlpha) {
    return `hsla(${c.h}, ${c.s}%, ${c.l}%, ${Number(c.a.toFixed(2))})`
  }
  return `hsl(${c.h}, ${c.s}%, ${c.l}%)`
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    message.success(`Скопировано: ${text}`)
  } catch {
    message.error('Не удалось скопировать')
  }
}

export function ColorsCheatsheet() {
  const [rgba, setRgba] = useState<Rgba>(() => hexToRgba('#f06529') ?? {
    r: 240,
    g: 101,
    b: 41,
    a: 1,
  })
  const [hexInput, setHexInput] = useState('#f06529')
  const [target, setTarget] = useState<ApplyTarget>('background')
  const [named, setNamed] = useState<string | null>(null)

  const hsla = useMemo(() => rgbaToHsla(rgba), [rgba])
  const hex = rgbaToHex(rgba)
  const cssColor = named ?? (rgba.a < 1 ? formatRgb(rgba, true) : hex)

  const formats = useMemo(
    () => [
      { key: 'hex', label: 'hex', value: hex, tip: 'Шестнадцатеричный код #RRGGBB.' },
      {
        key: 'rgb',
        label: 'rgb',
        value: formatRgb(rgba, false),
        tip: 'Красный, зелёный, синий — по 0…255.',
      },
      {
        key: 'rgba',
        label: 'rgba',
        value: formatRgb(rgba, true),
        tip: 'Как rgb, плюс альфа 0…1 (прозрачность).',
      },
      {
        key: 'hsl',
        label: 'hsl',
        value: formatHsl(hsla, false),
        tip: 'Оттенок, насыщенность %, светлота %.',
      },
      {
        key: 'hsla',
        label: 'hsla',
        value: formatHsl(hsla, true),
        tip: 'HSL с альфой — удобно для полупрозрачных акцентов.',
      },
    ],
    [hex, hsla, rgba],
  )

  const previewStyle = useMemo(() => {
    if (target === 'background') {
      return {
        background: cssColor,
        color: hsla.l > 55 ? '#1a2332' : '#f7f9fc',
        borderColor: 'transparent',
      }
    }
    if (target === 'color') {
      return {
        background: 'var(--bg-elevated)',
        color: cssColor,
        borderColor: 'var(--border)',
      }
    }
    return {
      background: 'var(--bg-elevated)',
      color: 'var(--text)',
      borderColor: cssColor,
    }
  }, [cssColor, hsla.l, target])

  const cssSnippet = useMemo(() => {
    if (target === 'background') return `.card {\n  background: ${cssColor};\n}`
    if (target === 'color') return `.card {\n  color: ${cssColor};\n}`
    return `.card {\n  border: 3px solid ${cssColor};\n}`
  }, [cssColor, target])

  const applyRgba = (next: Rgba) => {
    setNamed(null)
    setRgba({
      r: clamp(Math.round(next.r), 0, 255),
      g: clamp(Math.round(next.g), 0, 255),
      b: clamp(Math.round(next.b), 0, 255),
      a: clamp(next.a, 0, 1),
    })
    setHexInput(rgbaToHex(next))
  }

  const applyHex = (value: string) => {
    setHexInput(value)
    const parsed = hexToRgba(value, rgba.a)
    if (parsed) {
      setNamed(null)
      setRgba(parsed)
    }
  }

  const onPickerChange = (color: Color) => {
    const rgb = color.toRgb()
    applyRgba({ r: rgb.r, g: rgb.g, b: rgb.b, a: rgb.a })
  }

  const reset = () => {
    applyRgba(hexToRgba('#f06529') ?? { r: 240, g: 101, b: 41, a: 1 })
    setTarget('background')
    setNamed(null)
  }

  return (
    <div className="colors-cheatsheet">
      <div className="colors-cheatsheet__toolbar">
        <Segmented
          value={target}
          options={[
            { label: 'background', value: 'background' },
            { label: 'color', value: 'color' },
            { label: 'border', value: 'border' },
          ]}
          onChange={(value) => setTarget(value as ApplyTarget)}
        />
        <Button icon={<ReloadOutlined />} onClick={reset}>
          Сбросить
        </Button>
      </div>

      <div className="colors-cheatsheet__layout">
        <aside className="colors-cheatsheet__controls">
          <section className="colors-ctrl">
            <h2>Палитра</h2>
            <div className="colors-cheatsheet__palette">
              {PALETTE.map((swatch) => (
                <button
                  key={swatch.hex}
                  type="button"
                  className={`colors-cheatsheet__swatch${hex.toLowerCase() === swatch.hex && !named ? ' is-active' : ''}`}
                  style={{ background: swatch.hex }}
                  title={swatch.name}
                  aria-label={swatch.name}
                  onClick={() => applyRgba(hexToRgba(swatch.hex, rgba.a) ?? rgba)}
                />
              ))}
            </div>
          </section>

          <section className="colors-ctrl">
            <h2>Микшер</h2>

            <label className="colors-ctrl__field">
              <PropLabel tip="Выбор цвета из системной палитры браузера.">
                color picker
              </PropLabel>
              <ColorPicker
                value={hex}
                showText
                onChange={onPickerChange}
                disabledAlpha={false}
              />
            </label>

            <label className="colors-ctrl__field">
              <PropLabel tip="Шестнадцатеричный код. Можно ввести вручную.">
                hex
              </PropLabel>
              <Input
                value={hexInput.replace(/^#/, '')}
                onChange={(event) => applyHex(`#${event.target.value}`)}
                addonBefore="#"
                placeholder="f06529"
              />
            </label>

            <label className="colors-ctrl__field">
              <PropLabel tip="Красный канал 0…255.">R · {rgba.r}</PropLabel>
              <Slider
                min={0}
                max={255}
                value={rgba.r}
                onChange={(value) => applyRgba({ ...rgba, r: value })}
              />
            </label>
            <label className="colors-ctrl__field">
              <PropLabel tip="Зелёный канал 0…255.">G · {rgba.g}</PropLabel>
              <Slider
                min={0}
                max={255}
                value={rgba.g}
                onChange={(value) => applyRgba({ ...rgba, g: value })}
              />
            </label>
            <label className="colors-ctrl__field">
              <PropLabel tip="Синий канал 0…255.">B · {rgba.b}</PropLabel>
              <Slider
                min={0}
                max={255}
                value={rgba.b}
                onChange={(value) => applyRgba({ ...rgba, b: value })}
              />
            </label>

            <label className="colors-ctrl__field">
              <PropLabel tip="Оттенок на цветовом круге 0…360°.">
                H · {hsla.h}°
              </PropLabel>
              <Slider
                min={0}
                max={360}
                value={hsla.h}
                onChange={(value) =>
                  applyRgba(hslaToRgba({ ...hsla, h: value }))
                }
              />
            </label>
            <label className="colors-ctrl__field">
              <PropLabel tip="Насыщенность: 0% серый, 100% чистый цвет.">
                S · {hsla.s}%
              </PropLabel>
              <Slider
                min={0}
                max={100}
                value={hsla.s}
                onChange={(value) =>
                  applyRgba(hslaToRgba({ ...hsla, s: value }))
                }
              />
            </label>
            <label className="colors-ctrl__field">
              <PropLabel tip="Светлота: 0% чёрный, 50% обычный, 100% белый.">
                L · {hsla.l}%
              </PropLabel>
              <Slider
                min={0}
                max={100}
                value={hsla.l}
                onChange={(value) =>
                  applyRgba(hslaToRgba({ ...hsla, l: value }))
                }
              />
            </label>
            <label className="colors-ctrl__field">
              <PropLabel tip="Прозрачность: 1 непрозрачный, 0 невидимый.">
                alpha · {Number(rgba.a.toFixed(2))}
              </PropLabel>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={rgba.a}
                onChange={(value) => applyRgba({ ...rgba, a: value })}
              />
            </label>
          </section>

          <section className="colors-ctrl">
            <h2>Имена CSS</h2>
            <div className="colors-cheatsheet__named">
              {NAMED.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`colors-cheatsheet__named-chip${named === name ? ' is-active' : ''}`}
                  onClick={() => {
                    setNamed(name)
                    const probe = document.createElement('div')
                    probe.style.color = name
                    document.body.appendChild(probe)
                    const computed = getComputedStyle(probe).color
                    document.body.removeChild(probe)
                    const match = computed.match(/\d+/g)
                    if (match && match.length >= 3) {
                      const next = {
                        r: Number(match[0]),
                        g: Number(match[1]),
                        b: Number(match[2]),
                        a: rgba.a,
                      }
                      setRgba(next)
                      setHexInput(rgbaToHex(next))
                    }
                  }}
                >
                  <i style={{ background: name }} />
                  {name}
                </button>
              ))}
            </div>
          </section>
        </aside>

        <div className="colors-cheatsheet__stage">
          <div className="colors-cheatsheet__preview-wrap">
            <div
              className={`colors-cheatsheet__preview${target === 'border' ? ' is-border' : ''}`}
              style={previewStyle}
            >
              <p className="colors-cheatsheet__preview-eyebrow">{target}</p>
              <h3>Markup Lab</h3>
              <p>
                Живой цвет: <code>{cssColor}</code>
              </p>
            </div>
          </div>

          <div className="colors-cheatsheet__formats">
            {formats.map((format) => (
              <button
                key={format.key}
                type="button"
                className="colors-cheatsheet__format"
                onClick={() => copyText(format.value)}
              >
                <span className="colors-cheatsheet__format-top">
                  <PropLabel tip={format.tip}>{format.label}</PropLabel>
                  <CopyOutlined />
                </span>
                <code>{format.value}</code>
              </button>
            ))}
          </div>

          <pre className="colors-cheatsheet__code">
            <code>{cssSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
