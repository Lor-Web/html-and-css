import { CheckCircleFilled } from '@ant-design/icons'
import { Col, Row, Space, Typography } from 'antd'
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
        <p className="section-lead">Короткие проверки теории. Результат сохранится локально.</p>
      </header>

      <Row gutter={[16, 16]}>
        {quizzes.map((quiz) => {
          const result = progress.quizzes[quiz.id]
          return (
            <Col xs={24} md={12} key={quiz.id}>
              <Link to={`/quizzes/${quiz.id}`} className="content-card">
                <Space style={{ marginBottom: 10 }}>
                  <DifficultyTag level={quiz.difficulty} />
                  {result?.completed && (
                    <Typography.Text type="success">
                      <CheckCircleFilled /> {result.score}/{quiz.questions.length}
                    </Typography.Text>
                  )}
                </Space>
                <h2>{quiz.title}</h2>
                <p>{quiz.description}</p>
                <Typography.Text type="secondary">
                  {quiz.questions.length} вопросов
                </Typography.Text>
              </Link>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
