import { MinusOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Input, Select, Slider, Space, Switch, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { PropLabel } from '@/components/cheatsheets/PropLabel'
import './NthChildCheatsheet.scss'

type Pseudo =
  | 'nth-child'
  | 'nth-of-type'
  | 'nth-last-child'
  | 'nth-last-of-type'

type ItemTag = 'div' | 'p' | 'span'

interface ListItem {
  id: number
  tag: ItemTag
}

const PRESETS = [
  'odd',
  'even',
  '1',
  '2',
  '3',
  '2n',
  '2n+1',
  '3n',
  '3n+1',
  '3n+2',
  'n+3',
  '-n+3',
  '4n+1',
]

const PSEUDO_TIPS: Record<Pseudo, string> = {
  'nth-child': 'Считает всех соседей по порядку, тип тега не важен.',
  'nth-of-type': 'Считает только элементы того же тега (div среди div, p среди p).',
  'nth-last-child': 'Как nth-child, но нумерация с конца.',
  'nth-last-of-type': 'Как nth-of-type, но нумерация с конца среди того же тега.',
}

const TAG_CYCLE: ItemTag[] = ['div', 'p', 'div', 'span', 'div', 'p']

function createItems(count: number, mixed: boolean): ListItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    tag: mixed ? TAG_CYCLE[index % TAG_CYCLE.length] : 'div',
  }))
}

function isValidFormula(formula: string): boolean {
  const trimmed = formula.trim()
  if (!trimmed) return false
  try {
    document.createElement('div').matches(`:nth-child(${trimmed})`)
    return true
  } catch {
    return false
  }
}

function matchesPseudo(
  index: number,
  items: ListItem[],
  pseudo: Pseudo,
  formula: string,
): boolean {
  if (!isValidFormula(formula)) return false

  const probe = document.createElement('div')
  for (const item of items) {
    probe.appendChild(document.createElement(item.tag))
  }

  const child = probe.children[index]
  if (!child) return false

  try {
    return child.matches(`:${pseudo}(${formula.trim()})`)
  } catch {
    return false
  }
}

export function NthChildCheatsheet() {
  const [pseudo, setPseudo] = useState<Pseudo>('nth-child')
  const [formula, setFormula] = useState('2n+1')
  const [count, setCount] = useState(8)
  const [mixed, setMixed] = useState(false)
  const [items, setItems] = useState<ListItem[]>(() => createItems(8, false))

  const formulaOk = isValidFormula(formula)

  const matchFlags = useMemo(
    () => items.map((_, index) => matchesPseudo(index, items, pseudo, formula)),
    [items, pseudo, formula],
  )

  const matchedCount = matchFlags.filter(Boolean).length
  const matchedIndexes = matchFlags
    .map((matched, index) => (matched ? index + 1 : null))
    .filter((value): value is number => value !== null)

  const cssSnippet = useMemo(() => {
    const safe = formulaOk ? formula.trim() : '/* неверная формула */'
    return [
      `.list > *:${pseudo}(${safe}) {`,
      '  /* совпадение */',
      '  outline: 2px solid highlight;',
      '}',
    ].join('\n')
  }, [formula, formulaOk, pseudo])

  const rebuild = (nextCount: number, nextMixed: boolean) => {
    setCount(nextCount)
    setMixed(nextMixed)
    setItems(createItems(nextCount, nextMixed))
  }

  const reset = () => {
    setPseudo('nth-child')
    setFormula('2n+1')
    rebuild(8, false)
  }

  const addItem = () => {
    if (count >= 16) return
    rebuild(count + 1, mixed)
  }

  const removeItem = () => {
    if (count <= 3) return
    rebuild(count - 1, mixed)
  }

  return (
    <div className="nth-cheatsheet">
      <div className="nth-cheatsheet__toolbar">
        <Typography.Text type="secondary">
          Меняйте формулу — совпадения подсвечиваются в списке.
        </Typography.Text>
        <Button icon={<ReloadOutlined />} onClick={reset}>
          Сбросить
        </Button>
      </div>

      <div className="nth-cheatsheet__layout">
        <aside className="nth-cheatsheet__controls">
          <section className="nth-ctrl">
            <h2>Селектор</h2>

            <label className="nth-ctrl__field">
              <PropLabel tip={PSEUDO_TIPS[pseudo]}>псевдокласс</PropLabel>
              <Select
                value={pseudo}
                style={{ width: '100%' }}
                options={(
                  [
                    'nth-child',
                    'nth-of-type',
                    'nth-last-child',
                    'nth-last-of-type',
                  ] as Pseudo[]
                ).map((value) => ({
                  value,
                  label: `:${value}`,
                }))}
                onChange={(value) => setPseudo(value)}
              />
            </label>

            <label className="nth-ctrl__field">
              <PropLabel tip="Формула An+B, odd/even или номер. Примеры: 2n, 3n+1, -n+3.">
                формула
              </PropLabel>
              <Input
                value={formula}
                status={formulaOk ? undefined : 'error'}
                onChange={(event) => setFormula(event.target.value)}
                placeholder="2n+1"
                addonBefore={`:${pseudo}(`}
                addonAfter=")"
              />
              {!formulaOk && (
                <Typography.Text type="danger" style={{ fontSize: 12 }}>
                  Браузер не понял формулу
                </Typography.Text>
              )}
            </label>

            <div className="nth-ctrl__presets">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className={`nth-cheatsheet__chip${formula.trim() === preset ? ' is-active' : ''}`}
                  onClick={() => setFormula(preset)}
                >
                  {preset}
                </button>
              ))}
            </div>
          </section>

          <section className="nth-ctrl">
            <h2>Список</h2>

            <label className="nth-ctrl__field">
              <PropLabel tip="Сколько элементов в учебном списке.">
                элементов · {count}
              </PropLabel>
              <div className="nth-ctrl__count">
                <Button
                  size="small"
                  icon={<MinusOutlined />}
                  onClick={removeItem}
                  disabled={count <= 3}
                  aria-label="Убрать элемент"
                />
                <Slider
                  min={3}
                  max={16}
                  value={count}
                  onChange={(value) => rebuild(value, mixed)}
                  style={{ flex: 1 }}
                />
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={addItem}
                  disabled={count >= 16}
                  aria-label="Добавить элемент"
                />
              </div>
            </label>

            <label className="nth-ctrl__field nth-ctrl__switch">
              <PropLabel tip="Чередовать div / p / span — чтобы увидеть разницу child и of-type.">
                разные теги
              </PropLabel>
              <Switch checked={mixed} onChange={(checked) => rebuild(count, checked)} />
            </label>

            <div className="nth-cheatsheet__stats">
              <span>Совпадений</span>
              <strong>
                {matchedCount} из {items.length}
              </strong>
              <code>
                {matchedIndexes.length
                  ? matchedIndexes.map((n) => `#${n}`).join(' ')
                  : 'нет'}
              </code>
            </div>
          </section>
        </aside>

        <div className="nth-cheatsheet__stage">
          <div className="nth-cheatsheet__preview-wrap">
            <div className="nth-cheatsheet__legend">
              <Space size={12} wrap>
                <span>
                  <i className="nth-cheatsheet__swatch is-match" /> совпало
                </span>
                <span>
                  <i className="nth-cheatsheet__swatch" /> мимо
                </span>
                {mixed && (
                  <span className="nth-cheatsheet__legend-note">
                    тег написан на карточке
                  </span>
                )}
              </Space>
            </div>

            <div className="nth-cheatsheet__list" role="list">
              {items.map((item, index) => {
                const matched = matchFlags[index]
                const Tag = item.tag
                return (
                  <Tag
                    key={item.id}
                    role="listitem"
                    className={`nth-cheatsheet__item${matched ? ' is-match' : ''}`}
                  >
                    <span className="nth-cheatsheet__item-index">{index + 1}</span>
                    <span className="nth-cheatsheet__item-body">
                      <strong>&lt;{item.tag}&gt;</strong>
                      <small>
                        {matched ? 'match' : '—'}
                        {pseudo.includes('last')
                          ? ` · с конца ${items.length - index}`
                          : ''}
                      </small>
                    </span>
                  </Tag>
                )
              })}
            </div>
          </div>

          <pre className="nth-cheatsheet__code">
            <code>{cssSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
