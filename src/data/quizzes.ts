import type { Quiz } from '@/types/content'

export const quizzes: Quiz[] = [
  {
    id: 'html-basics',
    title: 'Основы HTML',
    description: 'Семантика, структура документа и базовые теги.',
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        prompt: 'Какой тег задаёт заголовок документа во вкладке браузера?',
        options: ['<head>', '<title>', '<header>', '<h1>'],
        correctIndex: 1,
        explanation: '<title> находится внутри <head> и задаёт текст вкладки.',
      },
      {
        id: 'q2',
        prompt: 'Какой атрибут у <img> обязателен для доступности?',
        options: ['src', 'title', 'alt', 'loading'],
        correctIndex: 2,
        explanation: 'alt описывает изображение для скринридеров и при ошибке загрузки.',
      },
      {
        id: 'q3',
        prompt: 'Чем <section> отличается от <div>?',
        options: [
          'Ничем — это синонимы',
          'section семантически группирует тематический блок',
          'div нельзя стилизовать',
          'section запрещён во вложенности',
        ],
        correctIndex: 1,
        explanation:
          '<section> несёт смысл тематической секции, <div> — нейтральный контейнер.',
      },
    ],
  },
  {
    id: 'css-layout',
    title: 'CSS Layout',
    description: 'Flexbox, Grid и позиционирование — короткий чек.',
    difficulty: 'medium',
    questions: [
      {
        id: 'q1',
        prompt: 'Какое свойство включает Flexbox?',
        options: ['position: flex', 'display: flex', 'flex: true', 'layout: flex'],
        correctIndex: 1,
        explanation: 'Flex-контейнер создаётся через display: flex (или inline-flex).',
      },
      {
        id: 'q2',
        prompt: 'justify-content управляет осями…',
        options: [
          'только поперечной (cross)',
          'только главной (main)',
          'обеими сразу',
          'только отступами',
        ],
        correctIndex: 1,
        explanation: 'justify-content распределяет элементы вдоль главной оси.',
      },
      {
        id: 'q3',
        prompt: 'Как сделать три равные колонки в Grid?',
        options: [
          'grid-template-columns: 3',
          'grid-template-columns: repeat(3, 1fr)',
          'columns: 3fr',
          'display: columns-3',
        ],
        correctIndex: 1,
        explanation: 'repeat(3, 1fr) создаёт три равные доли свободного пространства.',
      },
      {
        id: 'q4',
        prompt: 'position: absolute позиционируется относительно…',
        options: [
          'viewport всегда',
          'ближайшего предка с position ≠ static',
          'только body',
          'flex-контейнера всегда',
        ],
        correctIndex: 1,
        explanation:
          'Containing block — ближайший предок с position relative/absolute/fixed/sticky.',
      },
    ],
  },
]

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id)
}
