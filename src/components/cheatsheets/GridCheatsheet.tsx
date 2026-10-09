import { MinusOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Select, Slider, Space, Typography } from 'antd'
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { PropLabel } from '@/components/cheatsheets/PropLabel'
import './GridCheatsheet.scss'

type JustifyItems = NonNullable<CSSProperties['justifyItems']>
type AlignItems = NonNullable<CSSProperties['alignItems']>
type JustifyContent = NonNullable<CSSProperties['justifyContent']>
type AlignContent = NonNullable<CSSProperties['alignContent']>
type JustifySelf = NonNullable<CSSProperties['justifySelf']>
type AlignSelf = NonNullable<CSSProperties['alignSelf']>
type AutoFlow = NonNullable<CSSProperties['gridAutoFlow']>

interface ItemState {
  id: number
  column: string
  row: string
  justifySelf: JustifySelf | 'auto'
  alignSelf: AlignSelf | 'auto'
  order: number
}

const COL_TEMPLATES = [
  '1fr 1fr',
  '1fr 1fr 1fr',
  'repeat(3, 1fr)',
  '200px 1fr',
  '1fr 2fr 1fr',
  '80px 1fr 80px',
  'repeat(auto-fit, minmax(100px, 1fr))',
  'repeat(auto-fill, minmax(90px, 1fr))',
]

const ROW_TEMPLATES = [
  'auto',
  'auto auto',
  '100px 1fr',
  'repeat(2, 1fr)',
  '80px 1fr 80px',
  'minmax(80px, auto)',
]

const JUSTIFY_ITEMS: JustifyItems[] = ['stretch', 'start', 'end', 'center']
const ALIGN_ITEMS: AlignItems[] = ['stretch', 'start', 'end', 'center']
const JUSTIFY_CONTENT: JustifyContent[] = [
  'start',
  'end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
]
const ALIGN_CONTENT: AlignContent[] = [
  'start',
  'end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
]
const AUTO_FLOW: AutoFlow[] = ['row', 'column', 'row dense', 'column dense']
const LINE_PRESETS = ['auto', 'span 1', 'span 2', 'span 3', '1 / 3', '1 / -1', '2 / 4']
const SELF: Array<JustifySelf | AlignSelf | 'auto'> = [
  'auto',
  'stretch',
  'start',
  'end',
  'center',
]

function createItem(id: number, partial?: Partial<ItemState>): ItemState {
  return {
    id,
    column: partial?.column ?? 'auto',
    row: partial?.row ?? 'auto',
    justifySelf: partial?.justifySelf ?? 'auto',
    alignSelf: partial?.alignSelf ?? 'auto',
    order: partial?.order ?? 0,
  }
}

function optionList(values: string[]) {
  return values.map((value) => ({ label: value, value }))
}

function parseTrackSizes(value: string): number[] {
  if (!value || value === 'none') return []
  return value
    .split(/\s+/)
    .map((part) => Number.parseFloat(part))
    .filter((size) => Number.isFinite(size))
}

function parseGridLine(value: string): number | null {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : null
}

interface TrackInfo {
  columns: number[]
  rows: number[]
  columnGap: number
  rowGap: number
  padding: string
  selectedColumns: number[]
}

export function GridCheatsheet() {
  const nextIdRef = useRef(7)
  const previewRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(COL_TEMPLATES[2])
  const [rows, setRows] = useState(ROW_TEMPLATES[0])
  const [autoFlow, setAutoFlow] = useState<AutoFlow>('row')
  const [justifyItems, setJustifyItems] = useState<JustifyItems>('stretch')
  const [alignItems, setAlignItems] = useState<AlignItems>('stretch')
  const [justifyContent, setJustifyContent] = useState<JustifyContent>('start')
  const [alignContent, setAlignContent] = useState<AlignContent>('stretch')
  const [gap, setGap] = useState(12)
  const [items, setItems] = useState<ItemState[]>(() => [
    createItem(1),
    createItem(2),
    createItem(3),
    createItem(4),
    createItem(5),
    createItem(6),
  ])
  const [selectedId, setSelectedId] = useState(1)
  const [tracks, setTracks] = useState<TrackInfo>({
    columns: [],
    rows: [],
    columnGap: 12,
    rowGap: 12,
    padding: '0.5rem',
    selectedColumns: [],
  })

  const selected = items.find((item) => item.id === selectedId) ?? items[0]

  useLayoutEffect(() => {
    const node = previewRef.current
    if (!node) return

    const measure = () => {
      const style = getComputedStyle(node)
      const columnSizes = parseTrackSizes(style.gridTemplateColumns)
      const rowSizes = parseTrackSizes(style.gridTemplateRows)
      const selectedNode = node.querySelector<HTMLElement>(
        `[data-grid-item="${selectedId}"]`,
      )

      let selectedColumns: number[] = []
      if (selectedNode && columnSizes.length > 0) {
        const start = parseGridLine(getComputedStyle(selectedNode).gridColumnStart)
        const end = parseGridLine(getComputedStyle(selectedNode).gridColumnEnd)
        if (start !== null && end !== null) {
          const from = Math.min(start, end)
          const to = Math.max(start, end)
          for (let line = from; line < to; line += 1) {
            if (line >= 1 && line <= columnSizes.length) {
              selectedColumns.push(line)
            }
          }
        }
      }

      setTracks({
        columns: columnSizes,
        rows: rowSizes,
        columnGap: Number.parseFloat(style.columnGap) || 0,
        rowGap: Number.parseFloat(style.rowGap) || 0,
        padding: style.padding,
        selectedColumns,
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [
    alignContent,
    alignItems,
    autoFlow,
    columns,
    gap,
    items,
    justifyContent,
    justifyItems,
    rows,
    selectedId,
  ])

  const overlayStyle = useMemo(
    () =>
      ({
        display: 'grid',
        gridTemplateColumns: tracks.columns.map((size) => `${size}px`).join(' '),
        gridTemplateRows: tracks.rows.length
          ? tracks.rows.map((size) => `${size}px`).join(' ')
          : undefined,
        columnGap: tracks.columnGap,
        rowGap: tracks.rowGap,
        justifyContent,
        alignContent,
        padding: tracks.padding,
      }) satisfies CSSProperties,
    [alignContent, justifyContent, tracks],
  )

  const columnsLabel =
    tracks.columns.length === 1
      ? 'колонка'
      : tracks.columns.length >= 2 && tracks.columns.length <= 4
        ? 'колонки'
        : 'колонок'
  const rowsLabel =
    tracks.rows.length === 1
      ? 'ряд'
      : tracks.rows.length >= 2 && tracks.rows.length <= 4
        ? 'ряда'
        : 'рядов'

  const containerStyle = useMemo(
    () =>
      ({
        display: 'grid',
        gridTemplateColumns: columns,
        gridTemplateRows: rows === 'auto' ? undefined : rows,
        gridAutoFlow: autoFlow,
        justifyItems,
        alignItems,
        justifyContent,
        alignContent,
        gap: `${gap}px`,
      }) satisfies CSSProperties,
    [
      alignContent,
      alignItems,
      autoFlow,
      columns,
      gap,
      justifyContent,
      justifyItems,
      rows,
    ],
  )

  const cssSnippet = useMemo(() => {
    const lines = [
      '.container {',
      '  display: grid;',
      `  grid-template-columns: ${columns};`,
    ]
    if (rows !== 'auto') {
      lines.push(`  grid-template-rows: ${rows};`)
    }
    lines.push(
      `  grid-auto-flow: ${autoFlow};`,
      `  justify-items: ${justifyItems};`,
      `  align-items: ${alignItems};`,
      `  justify-content: ${justifyContent};`,
      `  align-content: ${alignContent};`,
      `  gap: ${gap}px;`,
      '}',
    )

    if (selected) {
      lines.push(
        '',
        `.item-${selected.id} {`,
        `  grid-column: ${selected.column};`,
        `  grid-row: ${selected.row};`,
        `  justify-self: ${selected.justifySelf};`,
        `  align-self: ${selected.alignSelf};`,
        `  order: ${selected.order};`,
        '}',
      )
    }

    return lines.join('\n')
  }, [
    alignContent,
    alignItems,
    autoFlow,
    columns,
    gap,
    justifyContent,
    justifyItems,
    rows,
    selected,
  ])

  const updateSelected = (patch: Partial<ItemState>) => {
    if (!selected) return
    setItems((prev) =>
      prev.map((item) => (item.id === selected.id ? { ...item, ...patch } : item)),
    )
  }

  const addItem = () => {
    const id = nextIdRef.current
    nextIdRef.current += 1
    const item = createItem(id)
    setItems((prev) => [...prev, item])
    setSelectedId(item.id)
  }

  const removeItem = () => {
    if (items.length <= 1) return
    setItems((prev) => {
      const next = prev.filter((item) => item.id !== selectedId)
      setSelectedId(next[0]?.id ?? 1)
      return next
    })
  }

  const reset = () => {
    nextIdRef.current = 7
    setColumns(COL_TEMPLATES[2])
    setRows(ROW_TEMPLATES[0])
    setAutoFlow('row')
    setJustifyItems('stretch')
    setAlignItems('stretch')
    setJustifyContent('start')
    setAlignContent('stretch')
    setGap(12)
    setItems([
      createItem(1),
      createItem(2),
      createItem(3),
      createItem(4),
      createItem(5),
      createItem(6),
    ])
    setSelectedId(1)
  }

  return (
    <div className="grid-cheatsheet">
      <div className="grid-cheatsheet__toolbar">
        <Typography.Text type="secondary">
          Меняйте треки и размещение — сетка справа обновляется сразу.
        </Typography.Text>
        <Button icon={<ReloadOutlined />} onClick={reset}>
          Сбросить
        </Button>
      </div>

      <div className="grid-cheatsheet__layout">
        <aside className="grid-cheatsheet__controls">
          <section className="grid-ctrl">
            <h2>Контейнер</h2>

            <label className="grid-ctrl__field">
              <PropLabel tip="Сколько колонок и какой у них размер: px, fr, repeat, minmax, auto-fit…">
                grid-template-columns
              </PropLabel>
              <Select
                value={columns}
                options={optionList(COL_TEMPLATES)}
                onChange={setColumns}
                style={{ width: '100%' }}
              />
            </label>

            <label className="grid-ctrl__field">
              <PropLabel tip="Явные размеры строк сетки. auto — пусть ряды подстроятся сами.">
                grid-template-rows
              </PropLabel>
              <Select
                value={rows}
                options={optionList(ROW_TEMPLATES)}
                onChange={setRows}
                style={{ width: '100%' }}
              />
            </label>

            <label className="grid-ctrl__field">
              <PropLabel tip="В каком порядке автоматом класть элементы: по рядам или колонкам, с dense или без.">
                grid-auto-flow
              </PropLabel>
              <Select
                value={autoFlow}
                options={optionList(AUTO_FLOW)}
                onChange={(value) => setAutoFlow(value as AutoFlow)}
                style={{ width: '100%' }}
              />
            </label>

            <label className="grid-ctrl__field">
              <PropLabel tip="Выравнивание содержимого ячеек по горизонтали (внутри каждой ячейки).">
                justify-items
              </PropLabel>
              <Select
                value={justifyItems}
                options={optionList(JUSTIFY_ITEMS)}
                onChange={setJustifyItems}
                style={{ width: '100%' }}
              />
            </label>

            <label className="grid-ctrl__field">
              <PropLabel tip="Выравнивание содержимого ячеек по вертикали (внутри каждой ячейки).">
                align-items
              </PropLabel>
              <Select
                value={alignItems}
                options={optionList(ALIGN_ITEMS)}
                onChange={setAlignItems}
                style={{ width: '100%' }}
              />
            </label>

            <label className="grid-ctrl__field">
              <PropLabel tip="Как сдвинуть всю сетку по горизонтали, если треки уже контейнера.">
                justify-content
              </PropLabel>
              <Select
                value={justifyContent}
                options={optionList(JUSTIFY_CONTENT)}
                onChange={setJustifyContent}
                style={{ width: '100%' }}
              />
            </label>

            <label className="grid-ctrl__field">
              <PropLabel tip="Как сдвинуть всю сетку по вертикали, если суммарная высота треков меньше контейнера.">
                align-content
              </PropLabel>
              <Select
                value={alignContent}
                options={optionList(ALIGN_CONTENT)}
                onChange={setAlignContent}
                style={{ width: '100%' }}
              />
            </label>

            <label className="grid-ctrl__field">
              <PropLabel tip="Промежутки между колонками и строками сетки.">
                gap · {gap}px
              </PropLabel>
              <Slider min={0} max={48} value={gap} onChange={setGap} />
            </label>
          </section>

          <section className="grid-ctrl">
            <div className="grid-ctrl__head">
              <h2>Элемент {selected ? `#${selected.id}` : ''}</h2>
              <Space size={6}>
                <Button
                  size="small"
                  icon={<MinusOutlined />}
                  onClick={removeItem}
                  disabled={items.length <= 1}
                  aria-label="Удалить элемент"
                />
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={addItem}
                  aria-label="Добавить элемент"
                />
              </Space>
            </div>

            {selected && (
              <>
                <label className="grid-ctrl__field">
                  <PropLabel tip="В каких колонках лежит элемент: span, линии старт/конец или auto.">
                    grid-column
                  </PropLabel>
                  <Select
                    value={selected.column}
                    options={optionList(LINE_PRESETS)}
                    onChange={(value) => updateSelected({ column: value })}
                    style={{ width: '100%' }}
                  />
                </label>

                <label className="grid-ctrl__field">
                  <PropLabel tip="В каких строках лежит элемент: span, линии старт/конец или auto.">
                    grid-row
                  </PropLabel>
                  <Select
                    value={selected.row}
                    options={optionList(LINE_PRESETS)}
                    onChange={(value) => updateSelected({ row: value })}
                    style={{ width: '100%' }}
                  />
                </label>

                <label className="grid-ctrl__field">
                  <PropLabel tip="Горизонтальное выравнивание этого элемента внутри своей ячейки.">
                    justify-self
                  </PropLabel>
                  <Select
                    value={selected.justifySelf}
                    options={optionList(SELF)}
                    onChange={(value) =>
                      updateSelected({ justifySelf: value as JustifySelf | 'auto' })
                    }
                    style={{ width: '100%' }}
                  />
                </label>

                <label className="grid-ctrl__field">
                  <PropLabel tip="Вертикальное выравнивание этого элемента внутри своей ячейки.">
                    align-self
                  </PropLabel>
                  <Select
                    value={selected.alignSelf}
                    options={optionList(SELF)}
                    onChange={(value) =>
                      updateSelected({ alignSelf: value as AlignSelf | 'auto' })
                    }
                    style={{ width: '100%' }}
                  />
                </label>

                <label className="grid-ctrl__field">
                  <PropLabel tip="Визуальный порядок авторазмещения: меньше — раньше, больше — позже.">
                    order · {selected.order}
                  </PropLabel>
                  <Slider
                    min={-2}
                    max={4}
                    value={selected.order}
                    onChange={(value) => updateSelected({ order: value })}
                  />
                </label>
              </>
            )}
          </section>
        </aside>

        <div className="grid-cheatsheet__stage">
          <div className="grid-cheatsheet__preview-wrap">
            <div className="grid-cheatsheet__stats">
              <span>
                {tracks.columns.length} {columnsLabel}
              </span>
              <span className="grid-cheatsheet__stats-sep" />
              <span>
                {tracks.rows.length} {rowsLabel}
              </span>
              {tracks.selectedColumns.length > 0 && (
                <>
                  <span className="grid-cheatsheet__stats-sep" />
                  <span>
                    элемент #{selectedId}: col{' '}
                    {tracks.selectedColumns[0]}
                    {tracks.selectedColumns.length > 1
                      ? `–${tracks.selectedColumns[tracks.selectedColumns.length - 1]}`
                      : ''}
                  </span>
                </>
              )}
            </div>

            <div className="grid-cheatsheet__preview-frame">
              {tracks.columns.length > 0 && (
                <div
                  className="grid-cheatsheet__tracks"
                  style={overlayStyle}
                  aria-hidden
                >
                  {tracks.columns.map((size, index) => {
                    const col = index + 1
                    const active = tracks.selectedColumns.includes(col)
                    return (
                      <div
                        key={`col-${col}`}
                        className={`grid-cheatsheet__track-col${active ? ' is-active' : ''}${index % 2 ? ' is-alt' : ''}`}
                        style={{
                          gridColumn: col,
                          gridRow: '1 / -1',
                        }}
                      >
                        <span className="grid-cheatsheet__track-badge">
                          {col}
                          <small>{Math.round(size)}px</small>
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}

              <div
                className="grid-cheatsheet__preview"
                ref={previewRef}
                style={containerStyle}
              >
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    data-grid-item={item.id}
                    className={`grid-cheatsheet__item${selectedId === item.id ? ' is-selected' : ''}`}
                    style={{
                      gridColumn: item.column,
                      gridRow: item.row,
                      justifySelf:
                        item.justifySelf === 'auto' ? 'auto' : item.justifySelf,
                      alignSelf:
                        item.alignSelf === 'auto' ? 'auto' : item.alignSelf,
                      order: item.order,
                    }}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <span className="grid-cheatsheet__item-id">{item.id}</span>
                    <span className="grid-cheatsheet__item-meta">
                      {item.column} · {item.row}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <pre className="grid-cheatsheet__code">
            <code>{cssSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
