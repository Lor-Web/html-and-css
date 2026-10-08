import type { Article } from '@/types/content'

export const articles: Article[] = [
  {
    id: 'box-model',
    title: 'Боксовая модель без сюрпризов',
    excerpt:
      'Как margin, border, padding и content складываются в итоговый размер элемента.',
    readingMinutes: 6,
    tags: ['css', 'basics'],
    content: [
      'В CSS каждый элемент — прямоугольник. Его размер складывается из content, padding, border и margin. Без box-sizing: border-box ширина width относится только к content — padding и border добавляются сверху.',
      'Практически всегда включайте глобально: *, *::before, *::after { box-sizing: border-box }. Тогда width включает padding и border, и вёрстка становится предсказуемее.',
      'Margin схлопывается у соседних блочных элементов по вертикали: побеждает большее значение. Это не баг, а особенность flow. Во flex и grid схлопывания margin нет.',
      'Инструменты DevTools → Computed / Box Model помогают увидеть реальные пиксели. Тренируйтесь читать эту схему — это экономит часы отладки.',
    ],
  },
  {
    id: 'flex-mental-model',
    title: 'Ментальная модель Flexbox',
    excerpt: 'Главная и поперечная оси, рост элементов и типичные паттерны раскладки.',
    readingMinutes: 8,
    tags: ['flexbox', 'layout'],
    content: [
      'Flexbox — одномерная раскладка: ряд или колонка. Сначала выберите flex-direction — это задаёт главную ось. justify-content работает по главной, align-items — по поперечной.',
      'gap заменяет большинство «хаков» с margin между элементами. Для «прижать футер / разнести края» используйте margin-left: auto у нужного ребёнка или space-between на контейнере.',
      'flex: 1 — удобный шортканд, когда элемент должен занять оставшееся место. Помните про min-width: auto у flex-элементов: длинный текст может не сжиматься без min-width: 0.',
      'Не превращайте всё в flex «на всякий случай». Если нужна двумерная сетка с явными рядами и колонками — берите Grid.',
    ],
  },
  {
    id: 'semantic-html',
    title: 'Семантика, которая помогает',
    excerpt: 'Почему header, main, nav и button лучше безликих div и span.',
    readingMinutes: 5,
    tags: ['html', 'a11y'],
    content: [
      'Семантические теги дают браузеру и вспомогательным технологиям структуру страницы. landmark-роли (banner, main, navigation) появляются «бесплатно» из header, main, nav.',
      'Кликабельное действие — это <button> или <a href>. div с onClick ломает клавиатуру и ожидания пользователя. Ссылки ведут куда-то, кнопки выполняют действие на месте.',
      'Заголовки стройте иерархией h1→h2→h3 без пропусков ради стиля. Визуальный размер задавайте CSS, а не уровнем тега.',
      'Хорошая семантика упрощает SEO, тестирование и рефакторинг: по разметке сразу видно блоки страницы.',
    ],
  },
]

export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id)
}
