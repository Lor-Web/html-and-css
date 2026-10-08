import { CheckCircleFilled } from '@ant-design/icons'
import { Col, Row, Space, Tag, Typography } from 'antd'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'
import { DifficultyTag } from '@/components/common/DifficultyTag'
import { tasks } from '@/data/tasks'
import { progressAtom } from '@/store/progressAtom'
import './ContentList.scss'

export function TasksPage() {
  const progress = useAtomValue(progressAtom)

  return (
    <div className="page fade-up">
      <header className="content-head">
        <h1 className="section-title">Задания</h1>
        <p className="section-lead">
          Откройте задание и работайте в песочнице: HTML, CSS, превью и автопроверки.
        </p>
      </header>

      <Row gutter={[16, 16]}>
        {tasks.map((task) => {
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
    </div>
  )
}
