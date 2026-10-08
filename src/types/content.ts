export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Task {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  tags: string[]
  /** Если true — в песочнице только HTML, вкладка CSS скрыта */
  htmlOnly?: boolean
  starterHtml: string
  starterCss: string
  goals: string[]
  checks: TaskCheck[]
  /** Скриншот эталонного результата («Как должно получиться») */
  exampleImage?: string
  /** Ссылки на материалы для задания (изображения и т.п.) */
  sources?: TaskSource[]
}

export interface TaskSource {
  label: string
  /** Ссылка на файл или изображение */
  url?: string
  /** Готовый текст для копирования */
  text?: string
}

export interface TaskCheck {
  id: string
  label: string
  type:
    | 'selector-exists'
    | 'selector-style'
    | 'style-not'
    | 'selector-count'
    | 'attribute'
    | 'text-includes'
  selector?: string
  property?: string
  expected?: string
  text?: string
  /** Для selector-count: минимальное число совпадений */
  min?: number
  /** Для attribute: имя атрибута */
  attribute?: string
}

export interface QuizQuestion {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  questions: QuizQuestion[]
}

export interface Article {
  id: string
  title: string
  excerpt: string
  readingMinutes: number
  tags: string[]
  content: string[]
}
