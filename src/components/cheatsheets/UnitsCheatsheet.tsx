import { ReloadOutlined } from '@ant-design/icons'
import { Button, InputNumber, Segmented, Select, Slider, Typography } from 'antd'
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { PropLabel } from '@/components/cheatsheets/PropLabel'
import './UnitsCheatsheet.scss'

type Mode = 'lab' | 'compare'
type Unit = 'px' | '%' | 'em' | 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax'
type TargetProp = 'width' | 'height' | 'font-size' | 'padding' | 'gap'

const UNITS: Unit[] = ['px', '%', 'em', 'rem', 'vw', 'vh', 'vmin', 'vmax']
const PROPS: TargetProp[] = ['width', 'height', 'font-size', 'padding', 'gap']
const PRESETS: Array<{ value: number; unit: Unit; prop: TargetProp }> = [
  { value: 50, unit: '%', prop: 'width' },
  { value: 2, unit: 'em', prop: 'font-size' },
  { value: 1.5, unit: 'rem', prop: 'font-size' },
  { value: 50, unit: 'vw', prop: 'width' },
  { value: 20, unit: 'vh', prop: 'height' },
  { value: 24, unit: 'px', prop: 'padding' },
]

const UNIT_TIPS: Record<Unit, string> = {
  px: 'Абсолютные CSS-пиксели. Не зависят от родителя и html.',
  '%': 'Доля от родителя: ширина/высота — от containing block, font-size — от font-size родителя.',
  em: 'Относительно шрифта: для font-size — родителя, для width/padding — своего font-size.',
  rem: 'Всегда от font-size корневого html (в нашей рамке — «корня»).',
  vw: '1vw = 1% ширины viewport (рамки «окна»).',
  vh: '1vh = 1% высоты viewport (рамки «окна»).',
  vmin: 'Меньшая сторона viewport: min(vw, vh).',
  vmax: 'Большая сторона viewport: max(vw, vh).',
}

const PROP_TIPS: Record<TargetProp, string> = {
  width: 'Ширина блока target.',
  height: 'Высота блока target.',
  'font-size': 'Размер шрифта — удобно сравнивать em и rem.',
  padding: 'Внутренний отступ со всех сторон.',
  gap: 'Промежуток между детьми внутри target (flex).',
}

function optionList(values: string[]) {
  return values.map((value) => ({ label: value, value }))
}

function formatPx(value: number | null): string {
  if (value === null || Number.isNaN(value)) return '—'
  return `${Math.round(value * 10) / 10}px`
}

function dependsOn(
  unit: Unit,
  prop: TargetProp,
): Array<'root' | 'parent' | 'viewport'> {
  if (unit === 'px') return []
  if (unit === 'rem') return ['root']
  if (unit === 'vw' || unit === 'vh' || unit === 'vmin' || unit === 'vmax') {
    return ['viewport']
  }
  if (unit === '%') {
    if (prop === 'font-size') return ['parent']
    return ['parent']
  }
  // em: font-size → parent; width/padding → собственный font (обычно от parent)
  return ['parent']
}

export function UnitsCheatsheet() {
  const [mode, setMode] = useState<Mode>('lab')
  const [rootFont, setRootFont] = useState(16)
  const [parentWidth, setParentWidth] = useState(70)
  const [parentFont, setParentFont] = useState(18)
  const [viewportWidth, setViewportWidth] = useState(640)
  const [viewportHeight, setViewportHeight] = useState(360)
  const [prop, setProp] = useState<TargetProp>('width')
  const [value, setValue] = useState(50)
  const [unit, setUnit] = useState<Unit>('%')

  const targetRef = useRef<HTMLDivElement>(null)
  const [computedPx, setComputedPx] = useState<number | null>(null)
  const [comparePx, setComparePx] = useState<Partial<Record<Unit, number>>>({})
  const compareRefs = useRef<Partial<Record<Unit, HTMLDivElement | null>>>({})

  const cssValue = `${value}${unit}`
  const deps = dependsOn(unit, prop)

  const targetStyle = useMemo(() => {
    const style: CSSProperties = {}
    if (prop === 'width') style.width = cssValue
    if (prop === 'height') style.height = cssValue
    if (prop === 'font-size') style.fontSize = cssValue
    if (prop === 'padding') style.padding = cssValue
    if (prop === 'gap') {
      style.display = 'flex'
      style.gap = cssValue
    }
    return style
  }, [cssValue, prop])

  const cssSnippet = useMemo(() => {
    const lines = [
      `.root { font-size: ${rootFont}px; }`,
      `.parent {`,
      `  width: ${parentWidth}%;`,
      `  height: 85%;`,
      `  font-size: ${parentFont}px;`,
      `}`,
      `.target {`,
      `  ${prop}: ${cssValue};`,
      `}`,
    ]
    return lines.join('\n')
  }, [cssValue, parentFont, parentWidth, prop, rootFont])

  useLayoutEffect(() => {
    if (mode !== 'lab') return
    const node = targetRef.current
    if (!node) return

    const measure = () => {
      const style = getComputedStyle(node)
      if (prop === 'width') setComputedPx(Number.parseFloat(style.width))
      else if (prop === 'height') setComputedPx(Number.parseFloat(style.height))
      else if (prop === 'font-size') setComputedPx(Number.parseFloat(style.fontSize))
      else if (prop === 'padding') setComputedPx(Number.parseFloat(style.paddingTop))
      else if (prop === 'gap') {
        setComputedPx(Number.parseFloat(style.gap || style.columnGap) || 0)
      }
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [mode, prop, cssValue, rootFont, parentFont, parentWidth, viewportWidth, viewportHeight])

  useLayoutEffect(() => {
    if (mode !== 'compare') return

    const measure = () => {
      const next: Partial<Record<Unit, number>> = {}
      for (const u of UNITS) {
        const node = compareRefs.current[u]
        if (!node) continue
        const style = getComputedStyle(node)
        if (prop === 'width') next[u] = Number.parseFloat(style.width)
        else if (prop === 'height') next[u] = Number.parseFloat(style.height)
        else if (prop === 'font-size') next[u] = Number.parseFloat(style.fontSize)
        else if (prop === 'padding') next[u] = Number.parseFloat(style.paddingTop)
        else if (prop === 'gap') {
          next[u] = Number.parseFloat(style.gap || style.columnGap) || 0
        }
      }
      setComparePx(next)
    }

    const frame = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(frame)
  }, [
    mode,
    prop,
    value,
    rootFont,
    parentFont,
    parentWidth,
    viewportWidth,
    viewportHeight,
  ])

  const reset = () => {
    setMode('lab')
    setRootFont(16)
    setParentWidth(70)
    setParentFont(18)
    setViewportWidth(640)
    setViewportHeight(360)
    setProp('width')
    setValue(50)
    setUnit('%')
  }

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setMode('lab')
    setProp(preset.prop)
    setValue(preset.value)
    setUnit(preset.unit)
  }

  const compareTargetStyle = (u: Unit): CSSProperties => {
    const v = `${value}${u}`
    const style: CSSProperties = {}
    if (prop === 'width') style.width = v
    if (prop === 'height') style.height = v
    if (prop === 'font-size') style.fontSize = v
    if (prop === 'padding') style.padding = v
    if (prop === 'gap') {
      style.display = 'flex'
      style.gap = v
    }
    return style
  }

  return (
    <div className="units-cheatsheet">
      <div className="units-cheatsheet__toolbar">
        <Segmented
          value={mode}
          options={[
            { label: 'Лаборатория', value: 'lab' },
            { label: 'Сравнить', value: 'compare' },
          ]}
          onChange={(next) => setMode(next as Mode)}
        />
        <Button icon={<ReloadOutlined />} onClick={reset}>
          Сбросить
        </Button>
      </div>

      <div className="units-cheatsheet__layout">
        <aside className="units-cheatsheet__controls">
          <section className="units-ctrl">
            <h2>Контекст</h2>

            <label className="units-ctrl__field">
              <PropLabel tip="font-size «корня» (как у html). От него считаются rem.">
                root font-size · {rootFont}px
              </PropLabel>
              <Slider
                min={10}
                max={32}
                value={rootFont}
                onChange={setRootFont}
                className={deps.includes('root') ? 'is-hot' : undefined}
              />
            </label>

            <label className="units-ctrl__field">
              <PropLabel tip="Ширина родителя в % от viewport-рамки. База для width: %.">
                parent width · {parentWidth}%
              </PropLabel>
              <Slider
                min={30}
                max={100}
                value={parentWidth}
                onChange={setParentWidth}
                className={deps.includes('parent') ? 'is-hot' : undefined}
              />
            </label>

            <label className="units-ctrl__field">
              <PropLabel tip="Шрифт родителя. База для em (у font-size) и часто для наследуемого текста.">
                parent font-size · {parentFont}px
              </PropLabel>
              <Slider
                min={10}
                max={40}
                value={parentFont}
                onChange={setParentFont}
                className={deps.includes('parent') ? 'is-hot' : undefined}
              />
            </label>

            <label className="units-ctrl__field">
              <PropLabel tip="Ширина учебной рамки-viewport. База для vw / vmin / vmax.">
                viewport width · {viewportWidth}px
              </PropLabel>
              <Slider
                min={320}
                max={900}
                step={10}
                value={viewportWidth}
                onChange={setViewportWidth}
                className={deps.includes('viewport') ? 'is-hot' : undefined}
              />
            </label>

            <label className="units-ctrl__field">
              <PropLabel tip="Высота учебной рамки-viewport. База для vh / vmin / vmax.">
                viewport height · {viewportHeight}px
              </PropLabel>
              <Slider
                min={220}
                max={560}
                step={10}
                value={viewportHeight}
                onChange={setViewportHeight}
                className={deps.includes('viewport') ? 'is-hot' : undefined}
              />
            </label>
          </section>

          <section className="units-ctrl">
            <h2>Target</h2>

            <label className="units-ctrl__field">
              <PropLabel tip={PROP_TIPS[prop]}>свойство</PropLabel>
              <Select
                value={prop}
                options={optionList(PROPS)}
                onChange={(next) => setProp(next as TargetProp)}
                style={{ width: '100%' }}
              />
            </label>

            <div className="units-ctrl__row">
              <label className="units-ctrl__field">
                <PropLabel tip="Число перед единицей.">значение</PropLabel>
                <InputNumber
                  min={0}
                  max={200}
                  step={prop === 'font-size' || unit === 'em' || unit === 'rem' ? 0.1 : 1}
                  value={value}
                  onChange={(next) => setValue(typeof next === 'number' ? next : 0)}
                  style={{ width: '100%' }}
                />
              </label>
              <label className="units-ctrl__field">
                <PropLabel tip={UNIT_TIPS[unit]}>единица</PropLabel>
                <Select
                  value={unit}
                  options={UNITS.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  onChange={(next) => setUnit(next as Unit)}
                  style={{ width: '100%' }}
                />
              </label>
            </div>

            <div className="units-ctrl__presets">
              {PRESETS.map((preset) => (
                <button
                  key={`${preset.prop}-${preset.value}${preset.unit}`}
                  type="button"
                  className="units-cheatsheet__chip"
                  onClick={() => applyPreset(preset)}
                >
                  {preset.prop}: {preset.value}
                  {preset.unit}
                </button>
              ))}
            </div>

            {mode === 'lab' && (
              <div className="units-cheatsheet__computed">
                <span>Вычислено</span>
                <strong>{formatPx(computedPx)}</strong>
                <code>
                  {prop}: {cssValue}
                </code>
              </div>
            )}

            {deps.length > 0 && (
              <p className="units-cheatsheet__deps">
                Зависит от:{' '}
                {deps.map((dep) => (
                  <span key={dep} className="units-cheatsheet__dep">
                    {dep === 'root' && 'root font'}
                    {dep === 'parent' && 'parent'}
                    {dep === 'viewport' && 'viewport'}
                  </span>
                ))}
              </p>
            )}
          </section>
        </aside>

        <div className="units-cheatsheet__stage">
          <div
            className="units-cheatsheet__viewport"
            style={{
              width: Math.min(viewportWidth, 900),
              height: viewportHeight,
              fontSize: rootFont,
            }}
          >
            <div className="units-cheatsheet__viewport-label">
              viewport · {viewportWidth}×{viewportHeight}
            </div>

            <div
              className={`units-cheatsheet__parent${deps.includes('parent') ? ' is-hot' : ''}`}
              style={{
                width: `${parentWidth}%`,
                height: '85%',
                fontSize: parentFont,
              }}
            >
              <div className="units-cheatsheet__box-label">
                parent · width {parentWidth}% · font {parentFont}px
              </div>

              {mode === 'lab' ? (
                <div
                  ref={targetRef}
                  className={`units-cheatsheet__target${deps.length ? ' is-hot' : ''}`}
                  style={targetStyle}
                >
                  <div className="units-cheatsheet__box-label">
                    target · {prop}: {cssValue}
                  </div>
                  {prop === 'gap' ? (
                    <>
                      <span className="units-cheatsheet__gap-item">A</span>
                      <span className="units-cheatsheet__gap-item">B</span>
                      <span className="units-cheatsheet__gap-item">C</span>
                    </>
                  ) : (
                    <p className="units-cheatsheet__sample">
                      Текст внутри target. Меняйте контекст слева и смотрите px.
                    </p>
                  )}
                </div>
              ) : (
                <div className="units-cheatsheet__compare">
                  {UNITS.map((u) => (
                    <div key={u} className="units-cheatsheet__compare-card">
                      <div className="units-cheatsheet__compare-head">
                        <code>
                          {value}
                          {u}
                        </code>
                        <strong>{formatPx(comparePx[u] ?? null)}</strong>
                      </div>
                      <div
                        ref={(node) => {
                          compareRefs.current[u] = node
                        }}
                        className="units-cheatsheet__target is-compare"
                        style={compareTargetStyle(u)}
                      >
                        {prop === 'gap' ? (
                          <>
                            <span className="units-cheatsheet__gap-item">A</span>
                            <span className="units-cheatsheet__gap-item">B</span>
                          </>
                        ) : (
                          <span>target</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Typography.Text type="secondary" className="units-cheatsheet__hint">
            {mode === 'lab'
              ? 'Подсвеченные слайдеры — база текущей единицы. Справа сверху рамка = учебный viewport.'
              : `Одно число (${value}) в разных единицах для свойства ${prop}.`}
          </Typography.Text>

          <pre className="units-cheatsheet__code">
            <code>{cssSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
