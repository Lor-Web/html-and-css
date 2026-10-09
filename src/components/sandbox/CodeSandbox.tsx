import { CheckCircleOutlined, PlayCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import { Alert, Button, Collapse, Flex, List, Space, Tag, Typography, message } from 'antd'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Group, Panel, Separator, useDefaultLayout } from 'react-resizable-panels'
import type { Task } from '@/types/content'
import { progressAtom, upsertTaskProgressAtom } from '@/store/progressAtom'
import { buildPreviewDocument, runTaskChecks } from '@/utils/taskChecks'
import { LightboxImage } from '@/components/common/LightboxImage'
import { RichGoalText } from '@/components/common/RichGoalText'
import { SandboxCodeEditor } from './SandboxCodeEditor'
import './CodeSandbox.scss'

interface CodeSandboxProps {
  task: Task
}

export function CodeSandbox({ task }: CodeSandboxProps) {
  const progress = useAtomValue(progressAtom)
  const [, upsert] = useAtom(upsertTaskProgressAtom)
  const saved = progress.tasks[task.id]

  const htmlOnly = Boolean(task.htmlOnly)
  const [html, setHtml] = useState(saved?.html || task.starterHtml)
  const [css, setCss] = useState(saved?.css || task.starterCss)
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html')
  const [passedChecks, setPassedChecks] = useState<string[]>(saved?.passedChecks ?? [])
  const [checked, setChecked] = useState(Boolean(saved?.completed))
  const [openPanels, setOpenPanels] = useState<string[]>(['goals'])
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const checksPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (htmlOnly) setActiveTab('html')
  }, [htmlOnly, task.id])

  useEffect(() => {
    setOpenPanels(['goals'])
  }, [task.id])

  const { defaultLayout: workLayout, onLayoutChanged: onWorkLayoutChanged } = useDefaultLayout({
    id: 'sandbox-work',
    panelIds: ['editor', 'preview'],
    storage: localStorage,
  })

  const srcDoc = useMemo(() => buildPreviewDocument(html, css), [html, css])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      upsert({
        taskId: task.id,
        patch: { html, css, passedChecks },
      })
    }, 400)
    return () => window.clearTimeout(timer)
  }, [html, css, passedChecks, task.id, upsert])

  const handleCheck = () => {
    const doc = iframeRef.current?.contentDocument
    if (!doc) {
      message.error('Превью ещё не готово')
      return
    }

    const results = runTaskChecks(doc, task.checks)
    const passed = results.filter((r) => r.passed).map((r) => r.id)
    setPassedChecks(passed)
    setChecked(true)

    const allPassed = passed.length === task.checks.length
    upsert({
      taskId: task.id,
      patch: {
        html,
        css,
        passedChecks: passed,
        completed: allPassed,
        completedAt: allPassed ? new Date().toISOString() : undefined,
      },
    })

    if (allPassed) {
      message.success('Все проверки пройдены!')
    } else {
      message.info(`Пройдено ${passed.length} из ${task.checks.length}`)
    }

    setOpenPanels((prev) => (prev.includes('checks') ? prev : [...prev, 'checks']))
    window.setTimeout(() => {
      checksPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 180)
  }

  const resetStarter = () => {
    setHtml(task.starterHtml)
    setCss(task.starterCss)
    setPassedChecks([])
    setChecked(false)
    upsert({
      taskId: task.id,
      patch: {
        html: task.starterHtml,
        css: task.starterCss,
        passedChecks: [],
        completed: false,
        completedAt: undefined,
      },
    })
  }

  return (
    <div className="sandbox">
      <div className="sandbox__workspace">
        <Group
          orientation="horizontal"
          className="sandbox__work-group"
          defaultLayout={workLayout}
          onLayoutChanged={onWorkLayoutChanged}
        >
          <Panel id="editor" defaultSize="52%" minSize="28%">
            <div className="sandbox__panel sandbox__editors">
              <div className="sandbox__tabs">
                <button
                  type="button"
                  className={`sandbox__tab${activeTab === 'html' || htmlOnly ? ' is-active html' : ''}`}
                  onClick={() => setActiveTab('html')}
                >
                  HTML
                </button>
                {!htmlOnly && (
                  <button
                    type="button"
                    className={`sandbox__tab${activeTab === 'css' ? ' is-active css' : ''}`}
                    onClick={() => setActiveTab('css')}
                  >
                    CSS
                  </button>
                )}
                {htmlOnly && (
                  <Typography.Text type="secondary" className="sandbox__html-only-hint">
                    Только HTML
                  </Typography.Text>
                )}
              </div>

              {htmlOnly || activeTab === 'html' ? (
                <SandboxCodeEditor
                  language="html"
                  value={html}
                  onChange={setHtml}
                  label="HTML редактор"
                />
              ) : (
                <SandboxCodeEditor
                  language="css"
                  value={css}
                  onChange={setCss}
                  label="CSS редактор"
                />
              )}
            </div>
          </Panel>

          <Separator className="sandbox__separator sandbox__separator--vertical" />

          <Panel id="preview" defaultSize="48%" minSize="28%">
            <div className="sandbox__panel sandbox__preview-wrap">
              <div className="sandbox__preview-bar">
                <Typography.Text type="secondary">Превью</Typography.Text>
                <Space size={8}>
                  <Button icon={<ReloadOutlined />} onClick={resetStarter}>
                    Сбросить
                  </Button>
                  <Button type="primary" icon={<PlayCircleOutlined />} onClick={handleCheck}>
                    Проверить
                  </Button>
                </Space>
              </div>
              <iframe
                ref={iframeRef}
                className="sandbox__preview"
                title={`Превью: ${task.title}`}
                sandbox="allow-same-origin"
                srcDoc={srcDoc}
              />
            </div>
          </Panel>
        </Group>
      </div>

      <aside className="sandbox__meta">
        <Collapse
          className="sandbox__meta-collapse"
          activeKey={openPanels}
          onChange={(keys) => setOpenPanels(Array.isArray(keys) ? keys : [keys])}
          items={[
            {
              key: 'goals',
              label: 'Что сделать',
              children: (
                <List
                  size="small"
                  dataSource={task.goals}
                  renderItem={(item) => (
                    <List.Item>
                      <Typography.Text>
                        <RichGoalText text={item} />
                      </Typography.Text>
                    </List.Item>
                  )}
                />
              ),
            },
            ...(task.exampleImage
              ? [
                  {
                    key: 'example',
                    label: 'Как должно получиться',
                    children: (
                      <LightboxImage
                        className="sandbox__example-image"
                        src={task.exampleImage}
                        alt={`Пример результата: ${task.title}`}
                      />
                    ),
                  },
                ]
              : []),
            ...(task.sources && task.sources.length > 0
              ? [
                  {
                    key: 'sources',
                    label: 'Исходники',
                    children: (
                      <ul className="sandbox__sources">
                        {task.sources.map((source) => (
                          <li
                            key={`${source.label}-${source.url ?? source.text}`}
                            className="sandbox__source-item"
                          >
                            <Typography.Text strong>{source.label}</Typography.Text>
                            {source.url && (
                              <Typography.Paragraph
                                copyable={{ text: source.url }}
                                className="sandbox__source-url"
                                style={{ marginBottom: 0 }}
                              >
                                <a href={source.url} target="_blank" rel="noreferrer">
                                  {source.url}
                                </a>
                              </Typography.Paragraph>
                            )}
                            {source.text && (
                              <Typography.Paragraph
                                copyable={{ text: source.text }}
                                className="sandbox__source-text"
                                style={{ marginBottom: 0 }}
                              >
                                {source.text}
                              </Typography.Paragraph>
                            )}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                ]
              : []),
            {
              key: 'checks',
              label: (
                <span ref={checksPanelRef} id="sandbox-autochecks">
                  Автопроверки
                </span>
              ),
              children: (
                <>
                  <Flex wrap gap={8}>
                    {task.checks.map((check) => {
                      const ok = passedChecks.includes(check.id)
                      return (
                        <Tag
                          key={check.id}
                          color={ok ? 'success' : checked ? 'error' : 'default'}
                          icon={ok ? <CheckCircleOutlined /> : undefined}
                          style={{ whiteSpace: 'normal', padding: '0.35rem 0.55rem' }}
                        >
                          <RichGoalText text={check.label} />
                        </Tag>
                      )
                    })}
                  </Flex>

                  {saved?.completed && (
                    <Alert
                      style={{ marginTop: 12 }}
                      type="success"
                      showIcon
                      message="Задание выполнено"
                      description="Прогресс сохранён в localStorage"
                    />
                  )}
                </>
              ),
            },
          ]}
        />
      </aside>
    </div>
  )
}
