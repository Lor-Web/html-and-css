import type { Difficulty } from '@/types/content'

const labels: Record<Difficulty, string> = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
}

const colors: Record<Difficulty, string> = {
  easy: 'success',
  medium: 'warning',
  hard: 'error',
}

export function difficultyLabel(level: Difficulty): string {
  return labels[level]
}

export function difficultyColor(level: Difficulty): string {
  return colors[level]
}
