import { MinusOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Segmented, Select, Slider, Space, Typography } from 'antd'
import { useMemo, useRef, useState, type CSSProperties } from 'react'
import { PropLabel } from '@/components/cheatsheets/PropLabel'
import './FlexboxCheatsheet.scss'

type FlexDirection = NonNullable<CSSProperties['flexDirection']>
type FlexWrap = NonNullable<CSSProperties['flexWrap']>
type JustifyContent = NonNullable<CSSProperties['justifyContent']>
type AlignItems = NonNullable<CSSProperties['alignItems']>
type AlignContent = NonNullable<CSSProperties['alignContent']>
type AlignSelf = NonNullable<CSSProperties['alignSelf']>

interface ItemState {
  id: number
  grow: number
  shrink: number
  basis: string
  alignSelf: AlignSelf | 'auto'
  order: number
}

const DIRECTIONS: FlexDirection[] = ['row', 'row-reverse', 'column', 'column-reverse']
const WRAPS: FlexWrap[] = ['nowrap', 'wrap', 'wrap-reverse']
const JUSTIFY: JustifyContent[] = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
]
const ALIGN: AlignItems[] = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline']
const ALIGN_CONTENT: AlignContent[] = [
  'stretch',
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
]
const ALIGN_SELF: Array<AlignSelf | 'auto'> = [
  'auto',
  'stretch',
  'flex-start',
  'flex-end',
  'center',
  'baseline',
]
const BASIS_PRESETS = ['auto', '0', '80px', '120px', '30%', '50%']

function createItem(id: number, partial?: Partial<ItemState>): ItemState {
  return {
    id,
    grow: partial?.grow ?? 0,
    shrink: partial?.shrink ?? 1,
    basis: partial?.basis ?? 'auto',
    alignSelf: partial?.alignSelf ?? 'auto',
    order: partial?.order ?? 0,
  }
}

function optionList(values: string[]) {
  return values.map((value) => ({ label: value, value }))
}

export function FlexboxCheatsheet() {
  const nextIdRef = useRef(4)
  const [direction, setDirection] = useState<FlexDirection>('row')
  const [wrap, setWrap] = useState<FlexWrap>('nowrap')
  const [justify, setJustify] = useState<JustifyContent>('flex-start')
  const [alignItems, setAlignItems] = useState<AlignItems>('stretch')
  const [alignContent, setAlignContent] = useState<AlignContent>('stretch')
  const [gap, setGap] = useState(12)
  const [items, setItems] = useState<ItemState[]>(() => [
    createItem(1),
    createItem(2),
    createItem(3),
  ])
  const [selectedId, setSelectedId] = useState(1)

  const selected = items.find((item) => item.id === selectedId) ?? items[0]

  const containerStyle = useMemo(
    () =>
      ({
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems,
        alignContent,
        gap: `${gap}px`,
      }) satisfies CSSProperties,
    [alignContent, alignItems, direction, gap, justify, wrap],
  )

  const cssSnippet = useMemo(() => {
    const lines = [
      '.container {',
      '  display: flex;',
      `  flex-direction: ${direction};`,
      `  flex-wrap: ${wrap};`,
      `  justify-content: ${justify};`,
      `  align-items: ${alignItems};`,
      `  align-content: ${alignContent};`,
      `  gap: ${gap}px;`,
      '}',
    ]

    if (selected) {
      lines.push(
        '',
        `.item-${selected.id} {`,
        `  flex-grow: ${selected.grow};`,
        `  flex-shrink: ${selected.shrink};`,
        `  flex-basis: ${selected.basis};`,
        `  align-self: ${selected.alignSelf};`,
        `  order: ${selected.order};`,
        '}',
      )
    }

    return lines.join('\n')
  }, [alignContent, alignItems, direction, gap, justify, selected, wrap])

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
    nextIdRef.current = 4
    setDirection('row')
    setWrap('nowrap')
    setJustify('flex-start')
    setAlignItems('stretch')
    setAlignContent('stretch')
    setGap(12)
    setItems([createItem(1), createItem(2), createItem(3)])
    setSelectedId(1)
  }

  return (
    <div className="flex-cheatsheet">
      <div className="flex-cheatsheet__toolbar">
        <Typography.Text type="secondary">
          Тыкайте свойства слева — раскладка справа обновляется сразу.
        </Typography.Text>
        <Button icon={<ReloadOutlined />} onClick={reset}>
          Сбросить
        </Button>
      </div>

      <div className="flex-cheatsheet__layout">
        <aside className="flex-cheatsheet__controls">
          <section className="flex-ctrl">
            <h2>Контейнер</h2>

            <label className="flex-ctrl__field">
              <PropLabel tip="Направление главной оси: ряд или колонка, обычный или зеркальный порядок.">
                flex-direction
              </PropLabel>
              <Select
                value={direction}
                options={optionList(DIRECTIONS)}
                onChange={setDirection}
                style={{ width: '100%' }}
              />
            </label>

            <label className="flex-ctrl__field">
              <PropLabel tip="Переносить ли элементы на новую линию, если не хватает места.">
                flex-wrap
              </PropLabel>
              <Segmented
                block
                value={wrap}
                options={WRAPS}
                onChange={(value) => setWrap(value as FlexWrap)}
              />
            </label>

            <label className="flex-ctrl__field">
              <PropLabel tip="Как распределить элементы вдоль главной оси (горизонталь при row).">
                justify-content
              </PropLabel>
              <Select
                value={justify}
                options={optionList(JUSTIFY)}
                onChange={setJustify}
                style={{ width: '100%' }}
              />
            </label>

            <label className="flex-ctrl__field">
              <PropLabel tip="Как выровнять элементы по поперечной оси (вертикаль при row).">
                align-items
              </PropLabel>
              <Select
                value={alignItems}
                options={optionList(ALIGN)}
                onChange={setAlignItems}
                style={{ width: '100%' }}
              />
            </label>

            <label className="flex-ctrl__field">
              <PropLabel tip="Как распределить несколько линий при wrap. Без переноса почти не заметен.">
                align-content
              </PropLabel>
              <Select
                value={alignContent}
                options={optionList(ALIGN_CONTENT)}
                onChange={setAlignContent}
                style={{ width: '100%' }}
                disabled={wrap === 'nowrap'}
              />
            </label>

            <label className="flex-ctrl__field">
              <PropLabel tip="Промежуток между элементами (и между линиями при wrap).">
                gap · {gap}px
              </PropLabel>
              <Slider min={0} max={48} value={gap} onChange={setGap} />
            </label>
          </section>

          <section className="flex-ctrl">
            <div className="flex-ctrl__head">
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
                <label className="flex-ctrl__field">
                  <PropLabel tip="Насколько элемент может расти и забирать свободное место по главной оси.">
                    flex-grow · {selected.grow}
                  </PropLabel>
                  <Slider
                    min={0}
                    max={5}
                    value={selected.grow}
                    onChange={(value) => updateSelected({ grow: value })}
                  />
                </label>

                <label className="flex-ctrl__field">
                  <PropLabel tip="Насколько элемент может сжиматься, если места не хватает.">
                    flex-shrink · {selected.shrink}
                  </PropLabel>
                  <Slider
                    min={0}
                    max={5}
                    value={selected.shrink}
                    onChange={(value) => updateSelected({ shrink: value })}
                  />
                </label>

                <label className="flex-ctrl__field">
                  <PropLabel tip="Стартовый размер элемента до роста и сжатия (ширина или высота по оси).">
                    flex-basis
                  </PropLabel>
                  <Select
                    value={selected.basis}
                    options={optionList(BASIS_PRESETS)}
                    onChange={(value) => updateSelected({ basis: value })}
                    style={{ width: '100%' }}
                  />
                </label>

                <label className="flex-ctrl__field">
                  <PropLabel tip="Личное выравнивание по поперечной оси — перекрывает align-items контейнера.">
                    align-self
                  </PropLabel>
                  <Select
                    value={selected.alignSelf}
                    options={optionList(ALIGN_SELF)}
                    onChange={(value) =>
                      updateSelected({ alignSelf: value as AlignSelf | 'auto' })
                    }
                    style={{ width: '100%' }}
                  />
                </label>

                <label className="flex-ctrl__field">
                  <PropLabel tip="Визуальный порядок среди соседей: меньше — раньше, больше — позже.">
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

        <div className="flex-cheatsheet__stage">
          <div className="flex-cheatsheet__preview-wrap">
            <div className="flex-cheatsheet__preview" style={containerStyle}>
              {items.map((item, index) => {
                const tall = index % 3 === 1
                const mid = index % 3 === 2
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`flex-cheatsheet__item${selectedId === item.id ? ' is-selected' : ''}${tall ? ' is-tall' : ''}${mid ? ' is-mid' : ''}`}
                    style={{
                      flexGrow: item.grow,
                      flexShrink: item.shrink,
                      flexBasis: item.basis,
                      alignSelf: item.alignSelf === 'auto' ? 'auto' : item.alignSelf,
                      order: item.order,
                    }}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <span className="flex-cheatsheet__item-id">{item.id}</span>
                    <span className="flex-cheatsheet__item-meta">
                      {item.grow}/{item.shrink}/{item.basis}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <pre className="flex-cheatsheet__code">
            <code>{cssSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
