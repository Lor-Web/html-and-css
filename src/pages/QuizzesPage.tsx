import { CheckCircleFilled } from '@ant-design/icons'
import { Col, Progress, Row, Space, Typography } from 'antd'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'
import { DifficultyTag } from '@/components/common/DifficultyTag'
import { quizzes } from '@/data/quizzes'
import { progressAtom } from '@/store/progressAtom'
import './ContentList.scss'

export function QuizzesPage() {
  const progress = useAtomValue(progressAtom)

  return (
    <div className="page fade-up">
      <header className="content-head">
        <h1 className="section-title">Квизы</h1>
        <p className="section-lead">Один вопрос на экран. Прогресс сохраняется локально.</p>
      </header>

      <Row gutter={[16, 16]}>
        {quizzes.map((quiz) => {
          const result = progress.quizzes[quiz.id]
          const score = result?.score ?? 0
          const total = quiz.questions.length
          const percent = Math.round((score / total) * 100)

          return (
            <Col xs={24} md={12} key={quiz.id}>
              <Link to={`/quizzes/${quiz.id}`} className="content-card content-card--quiz">
                <Space style={{ marginBottom: 10 }} wrap>
                  <DifficultyTag level={quiz.difficulty} />
                  {result?.completed && (
                    <Typography.Text type="success">
                      <CheckCircleFilled /> Пройден
                    </Typography.Text>
                  )}
                </Space>
                <h2>{quiz.title}</h2>
                <p>{quiz.description}</p>
                <Progress
                  percent={percent}
                  size="small"
                  strokeColor={{ from: '#f06529', to: '#2965f1' }}
                />
                <Typography.Text type="secondary">{total} вопросов</Typography.Text>
              </Link>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
