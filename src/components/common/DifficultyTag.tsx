import { Tag } from 'antd'
import type { Difficulty } from '@/types/content'
import { difficultyColor, difficultyLabel } from '@/utils/difficulty'

export function DifficultyTag({ level }: { level: Difficulty }) {
  return <Tag color={difficultyColor(level)}>{difficultyLabel(level)}</Tag>
}
