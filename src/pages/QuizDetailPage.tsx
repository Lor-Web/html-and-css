import { ArrowLeftOutlined } from '@ant-design/icons'
import { Alert, Button, Radio, Space, Typography } from 'antd'
import { useAtom } from 'jotai'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DifficultyTag } from '@/components/common/DifficultyTag'
import { getQuizById } from '@/data/quizzes'
import { saveQuizResultAtom } from '@/store/progressAtom'
import './QuizDetailPage.scss'

export function QuizDetailPage() {
  const { quizId } = useParams()
  const quiz = quizId ? getQuizById(quizId) : undefined
  const [, saveResult] = useAtom(saveQuizResultAtom)

  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    if (!quiz) return 0
    return quiz.questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctIndex ? 1 : 0)
    }, 0)
  }, [answers, quiz])

  if (!quiz) {
    return (
      <div className="page">
        <Typography.Title level={2}>Квиз не найден</Typography.Title>
        <Link to="/quizzes">
          <Button icon={<ArrowLeftOutlined />}>К списку</Button>
        </Link>
      </div>
    )
  }

  const allAnswered = quiz.questions.every((q) => answers[q.id] !== undefined)

  const handleSubmit = () => {
    setSubmitted(true)
    saveResult({ quizId: quiz.id, answers, score })
  }

  return (
    <div className="page fade-up quiz-page">
      <Space direction="vertical" size={4} style={{ marginBottom: 24 }}>
        <Link to="/quizzes">
          <Button type="link" icon={<ArrowLeftOutlined />} style={{ paddingInline: 0 }}>
            Все квизы
          </Button>
        </Link>
        <DifficultyTag level={quiz.difficulty} />
        <Typography.Title level={2} style={{ margin: 0 }}>
          {quiz.title}
        </Typography.Title>
        <Typography.Paragraph type="secondary">{quiz.description}</Typography.Paragraph>
      </Space>

      <div className="quiz-list">
        {quiz.questions.map((question, index) => {
          const selected = answers[question.id]
          const isCorrect = selected === question.correctIndex
          return (
            <article key={question.id} className="quiz-card">
              <Typography.Title level={4}>
                {index + 1}. {question.prompt}
              </Typography.Title>
              <Radio.Group
                disabled={submitted}
                value={selected}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))
                }
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                {question.options.map((option, optionIndex) => (
                  <Radio key={option} value={optionIndex}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>

              {submitted && (
                <Alert
                  style={{ marginTop: 14 }}
                  type={isCorrect ? 'success' : 'error'}
                  showIcon
                  message={isCorrect ? 'Верно' : 'Неверно'}
                  description={question.explanation}
                />
              )}
            </article>
          )
        })}
      </div>

      <div className="quiz-actions">
        {!submitted ? (
          <Button type="primary" size="large" disabled={!allAnswered} onClick={handleSubmit}>
            Проверить ответы
          </Button>
        ) : (
          <Alert
            type="info"
            showIcon
            message={`Результат: ${score} из ${quiz.questions.length}`}
            description="Сохранено в localStorage. Можно пройти квиз снова позже."
          />
        )}
      </div>
    </div>
  )
}
