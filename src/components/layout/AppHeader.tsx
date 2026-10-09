import {
  BookOutlined,
  ControlOutlined,
  FormOutlined,
  HomeOutlined,
  MoonOutlined,
  SunOutlined,
  CodeOutlined,
} from '@ant-design/icons'
import { Button, Flex, Typography } from 'antd'
import { useAtom, useAtomValue } from 'jotai'
import { NavLink, useLocation } from 'react-router-dom'
import { progressAtom } from '@/store/progressAtom'
import { themeModeAtom, toggleThemeAtom } from '@/store/themeAtom'
import { tasks } from '@/data/tasks'
import { quizzes } from '@/data/quizzes'
import './AppHeader.scss'

const links = [
  { to: '/', label: 'Главная', icon: <HomeOutlined />, end: true },
  { to: '/tasks', label: 'Задания', icon: <CodeOutlined /> },
  { to: '/quizzes', label: 'Квизы', icon: <FormOutlined /> },
  { to: '/cheatsheets', label: 'Шпаргалки', icon: <ControlOutlined /> },
  { to: '/articles', label: 'Статьи', icon: <BookOutlined /> },
]

export function AppHeader() {
  const location = useLocation()
  const mode = useAtomValue(themeModeAtom)
  const [, toggleTheme] = useAtom(toggleThemeAtom)
  const progress = useAtomValue(progressAtom)

  const completedTasks = Object.values(progress.tasks).filter((t) => t.completed).length
  const completedQuizzes = Object.values(progress.quizzes).filter((q) => q.completed).length

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <NavLink to="/" className="app-header__brand">
          <span className="app-header__mark" aria-hidden>
            <span className="app-header__mark-html">&lt;/&gt;</span>
          </span>
          <span className="app-header__brand-text">
            <Typography.Text className="app-header__name">Markup Lab</Typography.Text>
            <Typography.Text type="secondary" className="app-header__tagline">
              HTML · CSS практика
            </Typography.Text>
          </span>
        </NavLink>

        <nav className="app-header__nav" aria-label="Основная навигация">
          {links.map((link) => {
            const active = link.end
              ? location.pathname === link.to
              : location.pathname.startsWith(link.to)
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={`app-header__link${active ? ' is-active' : ''}`}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <Flex align="center" gap={10} className="app-header__actions">
          <div className="app-header__progress" title="Прогресс в localStorage">
            <span>
              {completedTasks}/{tasks.length}
            </span>
            <span className="app-header__dot" />
            <span>
              {completedQuizzes}/{quizzes.length}
            </span>
          </div>
          <Button
            type="text"
            shape="circle"
            aria-label={mode === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
            icon={mode === 'light' ? <MoonOutlined /> : <SunOutlined />}
            onClick={() => toggleTheme()}
          />
        </Flex>
      </div>
    </header>
  )
}
