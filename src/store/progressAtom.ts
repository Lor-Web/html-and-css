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
  /** ID вопросов, на которые дан верный ответ */
  correctIds: string[]
  score: number
  /** Число неверных попыток ответа */
  wrongCount: number
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

export const markQuizQuestionCorrectAtom = atom(
  null,
  (
    get,
    set,
    payload: { quizId: string; questionId: string; totalQuestions: number },
  ) => {
    const current = get(progressAtom)
    const prev = current.quizzes[payload.quizId]
    const correctIds = Array.from(
      new Set([...(prev?.correctIds ?? []), payload.questionId]),
    )
    const score = correctIds.length
    const completed = score >= payload.totalQuestions

    set(progressAtom, {
      ...current,
      quizzes: {
        ...current.quizzes,
        [payload.quizId]: {
          correctIds,
          score,
          wrongCount: prev?.wrongCount ?? 0,
          completed,
          completedAt: completed
            ? (prev?.completedAt ?? new Date().toISOString())
            : undefined,
        },
      },
    })
  },
)

export const markQuizQuestionWrongAtom = atom(
  null,
  (get, set, quizId: string) => {
    const current = get(progressAtom)
    const prev = current.quizzes[quizId]

    set(progressAtom, {
      ...current,
      quizzes: {
        ...current.quizzes,
        [quizId]: {
          correctIds: prev?.correctIds ?? [],
          score: prev?.score ?? 0,
          wrongCount: (prev?.wrongCount ?? 0) + 1,
          completed: prev?.completed ?? false,
          completedAt: prev?.completedAt,
        },
      },
    })
  },
)

export const resetQuizProgressAtom = atom(null, (get, set, quizId: string) => {
  const current = get(progressAtom)
  const next = { ...current.quizzes }
  delete next[quizId]
  set(progressAtom, { ...current, quizzes: next })
})

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
