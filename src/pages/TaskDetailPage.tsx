import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { DifficultyTag } from '@/components/common/DifficultyTag'
import { CodeSandbox } from '@/components/sandbox/CodeSandbox'
import { getTaskById } from '@/data/tasks'

export function TaskDetailPage() {
  const { taskId } = useParams()
  const task = taskId ? getTaskById(taskId) : undefined

  if (!task) {
    return (
      <div className="page">
        <Typography.Title level={2}>Задание не найдено</Typography.Title>
        <Link to="/tasks">
          <Button icon={<ArrowLeftOutlined />}>К списку</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="page page-wide fade-up">
      <Space direction="vertical" size={4} style={{ marginBottom: 16 }}>
        <Link to="/tasks">
          <Button type="link" icon={<ArrowLeftOutlined />} style={{ paddingInline: 0 }}>
            Все задания
          </Button>
        </Link>
        <Space wrap>
          <DifficultyTag level={task.difficulty} />
          <Typography.Text type="secondary">{task.tags.join(' · ')}</Typography.Text>
        </Space>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {task.title}
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0, maxWidth: 60 * 8 }}>
          {task.description}
        </Typography.Paragraph>
      </Space>

      <CodeSandbox task={task} />
    </div>
  )
}
