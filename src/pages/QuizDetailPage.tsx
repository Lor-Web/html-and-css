import {
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  ForwardOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import { Button, Progress, Typography, message } from 'antd'
import { useAtom, useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getQuizById } from '@/data/quizzes'
import {
  markQuizQuestionCorrectAtom,
  markQuizQuestionWrongAtom,
  progressAtom,
  resetQuizProgressAtom,
} from '@/store/progressAtom'
import type { Quiz, QuizQuestion } from '@/types/content'
import {
  areAnswersCorrect,
  getQuizRankTitle,
  isMultiAnswer,
  shuffleArray,
} from '@/utils/quiz'
import './QuizDetailPage.scss'

type Feedback = 'correct' | 'wrong' | null

function QuizPlayer({ quiz }: { quiz: Quiz }) {
  const progress = useAtomValue(progressAtom)
  const [, markCorrect] = useAtom(markQuizQuestionCorrectAtom)
  const [, markWrong] = useAtom(markQuizQuestionWrongAtom)
  const [, resetQuiz] = useAtom(resetQuizProgressAtom)

  const quizProgress = progress.quizzes[quiz.id]
  const score = quizProgress?.score ?? 0
  const wrongCount = quizProgress?.wrongCount ?? 0
  const completed = Boolean(quizProgress?.completed)
  const total = quiz.questions.length

  const [queue, setQueue] = useState<QuizQuestion[]>(() => {
    const answered = new Set(quizProgress?.correctIds ?? [])
    return shuffleArray(quiz.questions.filter((q) => !answered.has(q.id)))
  })
  const [selected, setSelected] = useState<number[]>([])
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [sessionDone, setSessionDone] = useState(() => {
    const answered = new Set(quizProgress?.correctIds ?? [])
    return answered.size >= quiz.questions.length
  })

  const current = queue[0]
  const remaining = queue.length
  const multi = current ? isMultiAnswer(current) : false

  const progressPercent = useMemo(() => {
    if (!total) return 0
    return Math.round((score / total) * 100)
  }, [score, total])

  const rebuildQueue = () => {
    const latest = progress.quizzes[quiz.id]
    const answered = new Set(latest?.correctIds ?? [])
    const leftover = quiz.questions.filter((q) => !answered.has(q.id))
    setQueue(shuffleArray(leftover))
    setSelected([])
    setFeedback(null)
    setSessionDone(leftover.length === 0)
  }

  const toggleOption = (index: number) => {
    if (feedback) return
    setSelected((prev) => {
      if (multi) {
        return prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      }
      return [index]
    })
  }

  const handleSkip = () => {
    if (!current || feedback) return
    setQueue((prev) => {
      if (prev.length <= 1) return prev
      const [first, ...rest] = prev
      return [...rest, first]
    })
    setSelected([])
    setFeedback(null)
  }

  const handleCheck = () => {
    if (!current || selected.length === 0) {
      message.info(multi ? 'Выберите один или несколько вариантов' : 'Выберите вариант')
      return
    }

    const ok = areAnswersCorrect(current, selected)
    if (ok) {
      setFeedback('correct')
      markCorrect({
        quizId: quiz.id,
        questionId: current.id,
        totalQuestions: quiz.questions.length,
      })
    } else {
      setFeedback('wrong')
      markWrong(quiz.id)
    }
  }

  const handleContinueAfterCorrect = () => {
    if (!current) return
    setSelected([])
    setFeedback(null)
    setQueue((prev) => {
      const next = prev.slice(1)
      if (next.length === 0) setSessionDone(true)
      return next
    })
  }

  const handleContinueAfterWrong = () => {
    if (!current) return
    setQueue((prev) => {
      const [first, ...rest] = prev
      return [...rest, first]
    })
    setSelected([])
    setFeedback(null)
  }

  const handleRestart = () => {
    resetQuiz(quiz.id)
    setQueue(shuffleArray(quiz.questions))
    setSelected([])
    setFeedback(null)
    setSessionDone(false)
  }

  if (completed || sessionDone || remaining === 0) {
    const rankTitle = completed
      ? getQuizRankTitle(quiz.id, wrongCount, total)
      : null

    return (
      <div className="quiz-player quiz-player--finish fade-up">
        <div className="quiz-player__finish">
          <p className="quiz-player__eyebrow">Квиз</p>
          <h1>{completed ? 'Квиз пройден!' : 'Пока есть вопросы'}</h1>
          {rankTitle && <p className="quiz-player__rank">{rankTitle}</p>}
          <p className="quiz-player__finish-lead">
            Верных ответов: <strong>{score}</strong> из <strong>{total}</strong>
            <br />
            Неверных попыток: <strong>{wrongCount}</strong>
          </p>
          <Progress
            percent={progressPercent}
            strokeColor={{ from: '#f06529', to: '#2965f1' }}
            style={{ maxWidth: 360, margin: '0 auto 1.5rem' }}
          />
          <div className="quiz-player__finish-actions">
            {!completed && (
              <Button type="primary" size="large" onClick={rebuildQueue}>
                Продолжить
              </Button>
            )}
            <Button size="large" icon={<ReloadOutlined />} onClick={handleRestart}>
              Начать заново
            </Button>
            <Link to="/quizzes">
              <Button size="large" icon={<ArrowLeftOutlined />}>
                К списку квизов
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`quiz-player fade-up${feedback ? ` is-${feedback}` : ''}`}>
      <div className="quiz-player__top">
        <Link to="/quizzes" className="quiz-player__back">
          <ArrowLeftOutlined /> Квизы
        </Link>
        <div className="quiz-player__meta">
          <span>{quiz.title}</span>
          <span className="quiz-player__score">
            {score}/{total}
          </span>
        </div>
        <Progress
          percent={progressPercent}
          showInfo={false}
          size="small"
          strokeColor={{ from: '#f06529', to: '#2965f1' }}
        />
      </div>

      <div className="quiz-player__stage">
        <p className="quiz-player__step">
          Осталось вопросов: {remaining}
          {multi ? ' · можно выбрать несколько' : ''}
        </p>
        <h1 className="quiz-player__prompt">{current.prompt}</h1>

        <div className="quiz-player__options" role={multi ? 'group' : 'radiogroup'}>
          {current.options.map((option, index) => {
            const active = selected.includes(index)
            const showWrongSingle = feedback === 'wrong' && !multi && active
            const showHintMulti = feedback === 'wrong' && multi && active
            const showCorrectPick = feedback === 'correct' && active

            return (
              <button
                key={`${current.id}-${option}`}
                type="button"
                className={[
                  'quiz-option',
                  active ? 'is-active' : '',
                  showWrongSingle ? 'is-wrong' : '',
                  showHintMulti ? 'is-hint' : '',
                  showCorrectPick ? 'is-correct' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => toggleOption(index)}
                disabled={Boolean(feedback)}
              >
                <span className="quiz-option__marker">{active ? '●' : '○'}</span>
                <span className="quiz-option__text">{option}</span>
              </button>
            )
          })}
        </div>

        {feedback === 'wrong' && (
          <div className={`quiz-player__feedback${multi ? ' is-hint' : ' is-wrong'}`}>
            <CloseOutlined />
            <div>
              <strong>Пока неверно</strong>
              <p>
                {multi
                  ? 'Здесь несколько правильных ответов — попробуйте выбрать другой набор вариантов.'
                  : 'Попробуйте ещё раз позже или пропустите вопрос.'}
              </p>
            </div>
          </div>
        )}

        {feedback === 'correct' && (
          <div className="quiz-player__feedback is-correct">
            <CheckOutlined />
            <div>
              <strong>Верно!</strong>
              <p>{current.explanation}</p>
            </div>
          </div>
        )}
      </div>

      <div className="quiz-player__actions">
        {feedback === 'correct' ? (
          <Button type="primary" size="large" onClick={handleContinueAfterCorrect}>
            Дальше
          </Button>
        ) : feedback === 'wrong' ? (
          <Button type="primary" size="large" onClick={handleContinueAfterWrong}>
            Дальше
          </Button>
        ) : (
          <>
            <Button
              size="large"
              icon={<ForwardOutlined />}
              onClick={handleSkip}
              disabled={remaining <= 1}
            >
              Пропустить
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<CheckOutlined />}
              onClick={handleCheck}
              disabled={selected.length === 0}
            >
              Ответить
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export function QuizDetailPage() {
  const { quizId } = useParams()
  const quiz = quizId ? getQuizById(quizId) : undefined

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

  return <QuizPlayer key={quiz.id} quiz={quiz} />
}
