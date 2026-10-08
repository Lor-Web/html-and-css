import { ArrowRightOutlined, BookOutlined, CodeOutlined, FormOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Progress, Row, Typography } from 'antd'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router-dom'
import { articles } from '@/data/articles'
import { quizzes } from '@/data/quizzes'
import { tasks } from '@/data/tasks'
import { progressAtom } from '@/store/progressAtom'
import './HomePage.scss'

const tracks = [
  {
    to: '/tasks',
    title: 'Задания',
    text: 'Пишите HTML и CSS в песочнице и проходите автопроверки.',
    icon: <CodeOutlined />,
    accent: 'orange',
  },
  {
    to: '/quizzes',
    title: 'Квизы',
    text: 'Закрепляйте теорию короткими вопросами с объяснениями.',
    icon: <FormOutlined />,
    accent: 'blue',
  },
  {
    to: '/articles',
    title: 'Статьи',
    text: 'Короткие материалы по семантике, боксовой модели и layout.',
    icon: <BookOutlined />,
    accent: 'mixed',
  },
]

export function HomePage() {
  const progress = useAtomValue(progressAtom)
  const doneTasks = Object.values(progress.tasks).filter((t) => t.completed).length
  const doneQuizzes = Object.values(progress.quizzes).filter((q) => q.completed).length
  const readArticles = progress.readArticles.length

  const total = tasks.length + quizzes.length + articles.length
  const done = doneTasks + doneQuizzes + readArticles
  const percent = Math.round((done / total) * 100)

  return (
    <div className="page home fade-up">
      <section className="home-hero">
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow">Практика вёрстки</p>
          <h1 className="home-hero__brand">Markup Lab</h1>
          <p className="home-hero__lead">
            Учите HTML и CSS через задания в песочнице, квизы и короткие статьи. Весь прогресс
            хранится локально в браузере.
          </p>
          <Flex gap={12} wrap className="home-hero__cta">
            <Link to="/tasks">
              <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                К заданиям
              </Button>
            </Link>
            <Link to="/articles">
              <Button size="large">Читать статьи</Button>
            </Link>
          </Flex>
        </div>

        <div className="home-hero__visual" aria-hidden>
          <div className="home-hero__panel home-hero__panel--html">
            <span>&lt;div class="layout"&gt;</span>
            <span className="indent">&lt;header /&gt;</span>
            <span className="indent">&lt;main /&gt;</span>
            <span>&lt;/div&gt;</span>
          </div>
          <div className="home-hero__panel home-hero__panel--css">
            <span>.layout {'{'}</span>
            <span className="indent">display: grid;</span>
            <span className="indent">gap: 1rem;</span>
            <span>{'}'}</span>
          </div>
          <div className="home-hero__orb home-hero__orb--orange" />
          <div className="home-hero__orb home-hero__orb--blue" />
        </div>
      </section>

      <section className="home-progress">
        <div>
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            Ваш прогресс
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
            Задания, квизы и прочитанные статьи сохраняются в localStorage.
          </Typography.Paragraph>
          <Progress percent={percent} strokeColor={{ from: '#f06529', to: '#2965f1' }} />
          <Flex gap={16} wrap style={{ marginTop: 8 }}>
            <Typography.Text type="secondary">
              Задания: {doneTasks}/{tasks.length}
            </Typography.Text>
            <Typography.Text type="secondary">
              Квизы: {doneQuizzes}/{quizzes.length}
            </Typography.Text>
            <Typography.Text type="secondary">
              Статьи: {readArticles}/{articles.length}
            </Typography.Text>
          </Flex>
        </div>
      </section>

      <section className="home-tracks">
        <h2 className="section-title">Три трека обучения</h2>
        <p className="section-lead">Один фокус на секцию — выбирайте формат под настроение.</p>
        <Row gutter={[20, 20]} style={{ marginTop: 28 }}>
          {tracks.map((track) => (
            <Col xs={24} md={8} key={track.to}>
              <Link to={track.to} className={`home-track home-track--${track.accent}`}>
                <span className="home-track__icon">{track.icon}</span>
                <h3>{track.title}</h3>
                <p>{track.text}</p>
              </Link>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  )
}
