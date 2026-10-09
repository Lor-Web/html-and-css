export interface CheatsheetMeta {
  id: string
  title: string
  description: string
  tags: string[]
}

export const cheatsheets: CheatsheetMeta[] = [
  {
    id: 'flexbox',
    title: 'Flexbox',
    description:
      'Крутите свойства контейнера и элементов — смотрите, как меняется раскладка.',
    tags: ['css', 'flexbox', 'layout'],
  },
  {
    id: 'grid',
    title: 'Grid',
    description:
      'Меняйте колонки, строки и размещение ячеек — сетка реагирует сразу.',
    tags: ['css', 'grid', 'layout'],
  },
  {
    id: 'units',
    title: 'Единицы',
    description:
      'Меняйте html, родителя и viewport — смотрите, во что превращаются px, %, em, rem, vw…',
    tags: ['css', 'единицы', 'px', 'rem'],
  },
  {
    id: 'nth-child',
    title: ':nth-child',
    description:
      'Крутите формулу и тип псевдокласса — совпадения подсвечиваются в списке.',
    tags: ['css', 'селекторы', 'nth-child'],
  },
  {
    id: 'colors',
    title: 'Цвета',
    description:
      'Палитра, RGB/HSL-микшер и форматы записи — сразу на фоне, тексте или рамке.',
    tags: ['css', 'цвет', 'hex', 'hsl'],
  },
]

export function getCheatsheetById(id: string): CheatsheetMeta | undefined {
  return cheatsheets.find((item) => item.id === id)
}
