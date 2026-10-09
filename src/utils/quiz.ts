import type { QuizQuestion } from '@/types/content'

export function shuffleArray<T>(items: T[]): T[] {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

export function isMultiAnswer(question: QuizQuestion): boolean {
  return question.correctIndexes.length > 1
}

export function areAnswersCorrect(
  question: QuizQuestion,
  selected: number[],
): boolean {
  if (selected.length !== question.correctIndexes.length) return false
  const expected = [...question.correctIndexes].sort((a, b) => a - b)
  const actual = [...selected].sort((a, b) => a - b)
  return expected.every((value, index) => value === actual[index])
}

type RankTier = 'perfect' | 'great' | 'solid' | 'learning' | 'fighter'

function getRankTier(wrongCount: number, total: number): RankTier {
  if (wrongCount <= 0) return 'perfect'
  if (wrongCount <= Math.max(1, Math.floor(total * 0.15))) return 'great'
  if (wrongCount <= Math.max(2, Math.floor(total * 0.4))) return 'solid'
  if (wrongCount <= total) return 'learning'
  return 'fighter'
}

const quizRankTitles: Record<string, Record<RankTier, string>> = {
  'html-tags': {
    perfect: 'Теперь ты сенсей по тегам!',
    great: 'Теперь ты ниндзя HTML-тегов!',
    solid: 'Теперь ты уверенный тег-мастер!',
    learning: 'Теперь ты подмастерье тегов — и это уже сила!',
    fighter: 'Теги сопротивлялись, но ты дожал — настоящий боец!',
  },
  'html-tags-2': {
    perfect: 'Теперь ты грандмастер разметки!',
    great: 'Теперь ты архитектор HTML!',
    solid: 'Теперь ты продвинутый тег-инженер!',
    learning: 'Вторая часть взята — ты уже не новичок!',
    fighter: '18 вопросов не сдались сразу, но ты сенсей упорства!',
  },
  'html-semantics': {
    perfect: 'Теперь ты сенсей семантики!',
    great: 'Теперь ты хранитель landmark-ов!',
    solid: 'Теперь ты осмысленный верстальщик!',
    learning: 'Семантика поддалась — ты на верном пути!',
    fighter: 'Див-суп отступил: ты дожал семантику!',
  },
  'html-seo': {
    perfect: 'Теперь ты SEO-сенсей сниппетов!',
    great: 'Теперь ты мастер meta и title!',
    solid: 'Теперь ты уверенный SEO-верстальщик!',
    learning: 'Каноникал понятен — ты уже не новичок в SEO!',
    fighter: 'Роботы уважают упорство — титул завоёван!',
  },
  'css-basics-1': {
    perfect: 'Теперь ты сенсей селекторов!',
    great: 'Теперь ты ниндзя box model!',
    solid: 'Теперь ты уверенный CSS-практик!',
    learning: 'База CSS взята — стиль уже с тобой!',
    fighter: 'Каскад сопротивлялся, но ты победил!',
  },
}

const defaultRankTitles: Record<RankTier, string> = {
  perfect: 'Идеальный проход — ты сенсей этого квиза!',
  great: 'Почти без осечек — ты ниндзя темы!',
  solid: 'Квиз в кармане — ты уверенный практик!',
  learning: 'Дошёл до финиша — ты упорный ученик!',
  fighter: 'Ошибок было много, но ты победил — легенда persistence!',
}

/** Титул по числу неверных попыток после прохождения квиза */
export function getQuizRankTitle(
  quizId: string,
  wrongCount: number,
  totalQuestions: number,
): string {
  const tier = getRankTier(wrongCount, totalQuestions)
  return quizRankTitles[quizId]?.[tier] ?? defaultRankTitles[tier]
}
