import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export interface TaskProgress {
  html: string
  css: string
  completed: boolean
  completedAt?: string
  passedChecks: string[]
}

export interface QuizProgress {
  answers: Record<string, number>
  score: number
  completed: boolean
  completedAt?: string
}

export interface ProgressState {
  tasks: Record<string, TaskProgress>
  quizzes: Record<string, QuizProgress>
  readArticles: string[]
}

const initialProgress: ProgressState = {
  tasks: {},
  quizzes: {},
  readArticles: [],
}

export const progressAtom = atomWithStorage<ProgressState>(
  'markup-lab:progress',
  initialProgress,
)

export const upsertTaskProgressAtom = atom(
  null,
  (get, set, payload: { taskId: string; patch: Partial<TaskProgress> }) => {
    const current = get(progressAtom)
    const prev = current.tasks[payload.taskId]
    set(progressAtom, {
      ...current,
      tasks: {
        ...current.tasks,
        [payload.taskId]: {
          html: prev?.html ?? '',
          css: prev?.css ?? '',
          completed: prev?.completed ?? false,
          passedChecks: prev?.passedChecks ?? [],
          ...payload.patch,
        },
      },
    })
  },
)

export const saveQuizResultAtom = atom(
  null,
  (
    get,
    set,
    payload: { quizId: string; answers: Record<string, number>; score: number },
  ) => {
    const current = get(progressAtom)
    set(progressAtom, {
      ...current,
      quizzes: {
        ...current.quizzes,
        [payload.quizId]: {
          answers: payload.answers,
          score: payload.score,
          completed: true,
          completedAt: new Date().toISOString(),
        },
      },
    })
  },
)

export const markArticleReadAtom = atom(null, (get, set, articleId: string) => {
  const current = get(progressAtom)
  if (current.readArticles.includes(articleId)) return
  set(progressAtom, {
    ...current,
    readArticles: [...current.readArticles, articleId],
  })
})

export const resetProgressAtom = atom(null, (_get, set) => {
  set(progressAtom, initialProgress)
})
