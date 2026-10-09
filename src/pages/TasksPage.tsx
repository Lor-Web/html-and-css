import { CheckCircleFilled } from '@ant-design/icons'
import { Col, Empty, Row, Segmented, Select, Space, Tag, Typography } from 'antd'
import { useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DifficultyTag } from '@/components/common/DifficultyTag'
import { tasks } from '@/data/tasks'
import { progressAtom } from '@/store/progressAtom'
import type { Difficulty } from '@/types/content'
import { difficultyLabel } from '@/utils/difficulty'
import './ContentList.scss'

type StatusFilter = 'all' | 'todo' | 'done'
type SortKey =
  | 'default'
  | 'difficulty-asc'
  | 'difficulty-desc'
  | 'title-asc'
  | 'title-desc'
  | 'done-first'
  | 'todo-first'

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  easy: 0,
  medium: 1,
  hard: 2,
}

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'difficulty-asc', label: 'Сначала лёгкие' },
  { value: 'difficulty-desc', label: 'Сначала сложные' },
  { value: 'title-asc', label: 'Название А–Я' },
  { value: 'title-desc', label: 'Название Я–А' },
  { value: 'todo-first', label: 'Сначала не сделанные' },
  { value: 'done-first', label: 'Сначала готовые' },
]

export function TasksPage() {
  const progress = useAtomValue(progressAtom)
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sort, setSort] = useState<SortKey>('default')

  const allTags = useMemo(
    () => Array.from(new Set(tasks.flatMap((task) => task.tags))).sort((a, b) => a.localeCompare(b, 'ru')),
    [],
  )

  const visibleTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const done = Boolean(progress.tasks[task.id]?.completed)

      if (difficulty !== 'all' && task.difficulty !== difficulty) return false
      if (status === 'done' && !done) return false
      if (status === 'todo' && done) return false
      if (selectedTags.length > 0 && !selectedTags.every((tag) => task.tags.includes(tag))) {
        return false
      }

      return true
    })

    const indexed = filtered.map((task, index) => ({ task, index }))

    indexed.sort((a, b) => {
      const aDone = Boolean(progress.tasks[a.task.id]?.completed)
      const bDone = Boolean(progress.tasks[b.task.id]?.completed)

      switch (sort) {
        case 'difficulty-asc':
          return (
            DIFFICULTY_ORDER[a.task.difficulty] - DIFFICULTY_ORDER[b.task.difficulty] ||
            a.index - b.index
          )
        case 'difficulty-desc':
          return (
            DIFFICULTY_ORDER[b.task.difficulty] - DIFFICULTY_ORDER[a.task.difficulty] ||
            a.index - b.index
          )
        case 'title-asc':
          return a.task.title.localeCompare(b.task.title, 'ru')
        case 'title-desc':
          return b.task.title.localeCompare(a.task.title, 'ru')
        case 'done-first':
          return Number(bDone) - Number(aDone) || a.index - b.index
        case 'todo-first':
          return Number(aDone) - Number(bDone) || a.index - b.index
        default:
          return a.index - b.index
      }
    })

    return indexed.map(({ task }) => task)
  }, [difficulty, progress.tasks, selectedTags, sort, status])

  const hasActiveFilters =
    difficulty !== 'all' || status !== 'all' || selectedTags.length > 0 || sort !== 'default'

  return (
    <div className="page fade-up">
      <header className="content-head">
        <h1 className="section-title">Задания</h1>
        <p className="section-lead">
          Откройте задание и работайте в песочнице: HTML, CSS, превью и автопроверки.
        </p>
      </header>

      <div className="content-toolbar">
        <div className="content-toolbar__row">
          <label className="content-toolbar__field">
            <span className="content-toolbar__label">Сложность</span>
            <Segmented
              value={difficulty}
              onChange={(value) => setDifficulty(value as Difficulty | 'all')}
              options={[
                { label: 'Все', value: 'all' },
                { label: difficultyLabel('easy'), value: 'easy' },
                { label: difficultyLabel('medium'), value: 'medium' },
                { label: difficultyLabel('hard'), value: 'hard' },
              ]}
            />
          </label>

          <label className="content-toolbar__field">
            <span className="content-toolbar__label">Статус</span>
            <Segmented
              value={status}
              onChange={(value) => setStatus(value as StatusFilter)}
              options={[
                { label: 'Все', value: 'all' },
                { label: 'Не сделаны', value: 'todo' },
                { label: 'Готовые', value: 'done' },
              ]}
            />
          </label>
        </div>

        <div className="content-toolbar__row">
          <label className="content-toolbar__field content-toolbar__field--grow">
            <span className="content-toolbar__label">Теги</span>
            <Select
              mode="multiple"
              allowClear
              placeholder="Все теги"
              value={selectedTags}
              onChange={setSelectedTags}
              options={allTags.map((tag) => ({ label: tag, value: tag }))}
              maxTagCount="responsive"
            />
          </label>

          <label className="content-toolbar__field">
            <span className="content-toolbar__label">Сортировка</span>
            <Select
              value={sort}
              onChange={setSort}
              options={SORT_OPTIONS}
              style={{ minWidth: 200 }}
            />
          </label>
        </div>

        <div className="content-toolbar__meta">
          <Typography.Text type="secondary">
            Показано {visibleTasks.length} из {tasks.length}
          </Typography.Text>
          {hasActiveFilters && (
            <button
              type="button"
              className="content-toolbar__reset"
              onClick={() => {
                setDifficulty('all')
                setStatus('all')
                setSelectedTags([])
                setSort('default')
              }}
            >
              Сбросить
            </button>
          )}
        </div>
      </div>

      {visibleTasks.length === 0 ? (
        <Empty description="Нет заданий по выбранным фильтрам" />
      ) : (
        <Row gutter={[16, 16]}>
          {visibleTasks.map((task) => {
            const done = progress.tasks[task.id]?.completed
            return (
              <Col xs={24} md={12} lg={8} key={task.id}>
                <Link to={`/tasks/${task.id}`} className="content-card content-card--task">
                  {task.exampleImage && (
                    <div className="content-card__preview">
                      <img
                        src={task.exampleImage}
                        alt={`Как должно получиться: ${task.title}`}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="content-card__body">
                    <Space style={{ marginBottom: 10 }}>
                      <DifficultyTag level={task.difficulty} />
                      {done && (
                        <Typography.Text type="success">
                          <CheckCircleFilled /> Готово
                        </Typography.Text>
                      )}
                    </Space>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <div className="content-card__tags">
                      {task.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </Link>
              </Col>
            )
          })}
        </Row>
      )}
    </div>
  )
}
