import type { Quiz } from '@/types/content'

export const quizzes: Quiz[] = [
  {
    id: 'html-tags',
    title: 'HTML: теги',
    description: 'Базовые теги: структура, текст, ссылки, списки и семантика.',
    difficulty: 'easy',
    tags: ['html', 'теги', 'новичкам'],
    questions: [
      {
        id: 'ht-1',
        prompt: 'Какой тег задаёт заголовок страницы во вкладке браузера?',
        options: ['<head>', '<title>', '<header>', '<h1>'],
        correctIndexes: [1],
        explanation: '<title> лежит внутри <head> и задаёт текст вкладки.',
      },
      {
        id: 'ht-2',
        prompt: 'Какой тег используется для главного заголовка страницы?',
        options: ['<h1>', '<header>', '<title>', '<strong>'],
        correctIndexes: [0],
        explanation: '<h1> — заголовок высшего уровня на странице.',
      },
      {
        id: 'ht-3',
        prompt: 'Какой тег создаёт абзац текста?',
        options: ['<span>', '<div>', '<p>', '<br>'],
        correctIndexes: [2],
        explanation: '<p> — абзац. <br> только переносит строку, не создаёт абзац.',
      },
      {
        id: 'ht-4',
        prompt: 'Какие теги делают текст жирным по смыслу или визуально?',
        options: ['<strong>', '<b>', '<em>', '<i>'],
        correctIndexes: [0, 1],
        explanation:
          '<strong> — смысловой акцент, <b> — визуально жирный без особого смысла.',
      },
      {
        id: 'ht-5',
        prompt: 'Какой тег создаёт ссылку на другую страницу?',
        options: ['<link>', '<a>', '<nav>', '<url>'],
        correctIndexes: [1],
        explanation: 'Гиперссылка создаётся тегом <a href="...">.',
      },
      {
        id: 'ht-6',
        prompt: 'Какой атрибут у <img> описывает изображение для доступности?',
        options: ['src', 'title', 'alt', 'name'],
        correctIndexes: [2],
        explanation: 'alt читают скринридеры и показывают, если картинка не загрузилась.',
      },
      {
        id: 'ht-7',
        prompt: 'Какие теги нужны для маркированного списка?',
        options: ['<ul>', '<ol>', '<li>', '<list>'],
        correctIndexes: [0, 2],
        explanation: 'Маркированный список — <ul>, пункты — <li>. <ol> это нумерованный список.',
      },
      {
        id: 'ht-8',
        prompt: 'Какой тег создаёт нумерованный список?',
        options: ['<ul>', '<ol>', '<nl>', '<list>'],
        correctIndexes: [1],
        explanation: '<ol> — ordered list, нумерованный список.',
      },
      {
        id: 'ht-9',
        prompt: 'Какой тег подходит для независимого смыслового блока, например карточки статьи?',
        options: ['<div>', '<span>', '<article>', '<br>'],
        correctIndexes: [2],
        explanation: '<article> — самостоятельный фрагмент контента.',
      },
      {
        id: 'ht-10',
        prompt: 'Какие теги относятся к семантическим ориентирам страницы?',
        options: ['<header>', '<main>', '<footer>', '<span>'],
        correctIndexes: [0, 1, 2],
        explanation:
          '<header>, <main> и <footer> задают структуру. <span> — нейтральный инлайн-контейнер.',
      },
      {
        id: 'ht-11',
        prompt: 'Чем <div> отличается от <span>?',
        options: [
          'div — блочный контейнер, span — строчный',
          'span нельзя стилизовать',
          'div запрещён во вложенности',
          'Это полные синонимы',
        ],
        correctIndexes: [0],
        explanation: 'Оба нейтральны по смыслу, но div блочный, а span строчный.',
      },
      {
        id: 'ht-12',
        prompt: 'Какой тег вставляет перевод строки без нового абзаца?',
        options: ['<p>', '<hr>', '<br>', '<lb>'],
        correctIndexes: [2],
        explanation: '<br> — break, принудительный перенос строки.',
      },
      {
        id: 'ht-13',
        prompt: 'Какой тег используют для кнопки действия на странице?',
        options: ['<a>', '<button>', '<input type="text">', '<div onclick>'],
        correctIndexes: [1],
        explanation: 'Для действия на месте — <button>. Ссылка ведёт куда-то по адресу.',
      },
      {
        id: 'ht-14',
        prompt: 'Какие теги помогают оформить цитату?',
        options: ['<blockquote>', '<cite>', '<q>', '<code>'],
        correctIndexes: [0, 1, 2],
        explanation:
          '<blockquote> — длинная цитата, <q> — короткая, <cite> — источник. <code> для кода.',
      },
      {
        id: 'ht-15',
        prompt: 'Какой тег оборачивает содержимое всей HTML-страницы?',
        options: ['<body>', '<html>', '<head>', '<main>'],
        correctIndexes: [1],
        explanation: 'Корневой элемент документа — <html>. Внутри него <head> и <body>.',
      },
    ],
  },
  {
    id: 'html-tags-2',
    title: 'HTML: теги — 2-я часть',
    description:
      'Формы, таблицы, медиа, списки определений и менее очевидная семантика.',
    difficulty: 'medium',
    tags: ['html', 'теги', 'средний'],
    questions: [
      {
        id: 'ht2-1',
        prompt: 'Какой тег подходит для боковой колонки со связанным, но не главным контентом?',
        options: ['<aside>', '<section>', '<nav>', '<article>'],
        correctIndexes: [0],
        explanation:
          '<aside> — побочный контент (заметка, реклама, доп. блок). <nav> — навигация.',
      },
      {
        id: 'ht2-2',
        prompt: 'Какие теги нужны для списка определений (термин → описание)?',
        options: ['<dl>', '<dt>', '<dd>', '<dfn>'],
        correctIndexes: [0, 1, 2],
        explanation:
          '<dl> — список, <dt> — термин, <dd> — описание. <dfn> отмечает определение слова в тексте.',
      },
      {
        id: 'ht2-3',
        prompt: 'Чем <em> отличается от <i>?',
        options: [
          '<em> — смысловой акцент, <i> — скорее визуальный/иной голос',
          'Оба одинаково обязательны для SEO',
          '<i> нельзя стилизовать CSS',
          '<em> работает только внутри <strong>',
        ],
        correctIndexes: [0],
        explanation:
          'Как и у <strong>/<b>: <em> меняет смысл (ударение), <i> часто для идиом, терминов, мыслей.',
      },
      {
        id: 'ht2-4',
        prompt: 'Какие теги оборачивают изображение с подписью?',
        options: ['<figure>', '<figcaption>', '<caption>', '<picture>'],
        correctIndexes: [0, 1],
        explanation:
          '<figure> + <figcaption>. <caption> — для таблицы, <picture> — для адаптивных картинок.',
      },
      {
        id: 'ht2-5',
        prompt: 'Какой тег задаёт заголовок ячейки в таблице?',
        options: ['<td>', '<th>', '<thead>', '<caption>'],
        correctIndexes: [1],
        explanation: '<th> — header cell. <td> — обычная ячейка данных.',
      },
      {
        id: 'ht2-6',
        prompt: 'Какие теги обычно входят в структуру таблицы?',
        options: ['<table>', '<tr>', '<td>', '<row>'],
        correctIndexes: [0, 1, 2],
        explanation: 'Таблица — <table>, строка — <tr>, ячейка — <td>/<th>. Тега <row> нет.',
      },
      {
        id: 'ht2-7',
        prompt: 'Как правильно связать подпись с полем ввода?',
        options: [
          '<label for="id"> и input с тем же id',
          'Только обернуть input в <span>',
          'Атрибут name у label',
          'Тег <caption> рядом с input',
        ],
        correctIndexes: [0],
        explanation:
          'for у label должен совпадать с id поля — клик по подписи фокусирует input.',
      },
      {
        id: 'ht2-8',
        prompt: 'Какие элементы обычно живут внутри <form>?',
        options: ['<input>', '<textarea>', '<select>', '<meta>'],
        correctIndexes: [0, 1, 2],
        explanation:
          'Поля формы — input, textarea, select (и button). <meta> относится к <head>.',
      },
      {
        id: 'ht2-9',
        prompt: 'Чем <textarea> отличается от <input type="text">?',
        options: [
          'textarea — многострочное поле',
          'textarea нельзя отправить в форме',
          'input type="text" поддерживает только цифры',
          'Разницы нет',
        ],
        correctIndexes: [0],
        explanation: '<textarea> для длинного текста в несколько строк.',
      },
      {
        id: 'ht2-10',
        prompt: 'Какие теги нужны для выпадающего списка?',
        options: ['<select>', '<option>', '<datalist>', '<dropdown>'],
        correctIndexes: [0, 1],
        explanation:
          'Классический select — <select> + <option>. <datalist> — подсказки к input. <dropdown> нет.',
      },
      {
        id: 'ht2-11',
        prompt: 'Какой тег показывает код с сохранением пробелов и переносов?',
        options: ['<code>', '<pre>', '<samp>', '<kbd>'],
        correctIndexes: [1],
        explanation:
          '<pre> сохраняет форматирование. <code> часто кладут внутрь <pre>, но сам по себе пробелы схлопывает.',
      },
      {
        id: 'ht2-12',
        prompt: 'Какие теги подходят для клавиатурного ввода и вывода программы?',
        options: ['<kbd>', '<samp>', '<var>', '<mark>'],
        correctIndexes: [0, 1],
        explanation:
          '<kbd> — ввод с клавиатуры, <samp> — вывод программы. <var> — переменная, <mark> — выделение.',
      },
      {
        id: 'ht2-13',
        prompt: 'Какой тег вставляет горизонтальный разделитель?',
        options: ['<hr>', '<br>', '<separator>', '<divider>'],
        correctIndexes: [0],
        explanation: '<hr> — thematic break / горизонтальная линия. <br> только перенос строки.',
      },
      {
        id: 'ht2-14',
        prompt: 'Какие теги используют для видео со несколькими источниками?',
        options: ['<video>', '<source>', '<track>', '<media>'],
        correctIndexes: [0, 1],
        explanation:
          '<video> + вложенные <source>. <track> — субтитры. Тега <media> нет.',
      },
      {
        id: 'ht2-15',
        prompt: 'Для чего нужен тег <details> вместе с <summary>?',
        options: [
          'Раскрывающийся блок «спойлер» без JS',
          'Только для FAQ в PDF',
          'Подключение внешних скриптов',
          'Описание таблицы',
        ],
        correctIndexes: [0],
        explanation: '<details>/<summary> — нативный accordion: клик по summary открывает содержимое.',
      },
      {
        id: 'ht2-16',
        prompt: 'Какие теги отмечают удалённый и добавленный текст при правках?',
        options: ['<del>', '<ins>', '<s>', '<u>'],
        correctIndexes: [0, 1],
        explanation:
          '<del> — удалено, <ins> — вставлено. <s> — больше не актуально, <u> — подчёркивание.',
      },
      {
        id: 'ht2-17',
        prompt: 'Какой тег лучше для даты/времени с машиночитаемым значением?',
        options: ['<time>', '<date>', '<meta>', '<data>'],
        correctIndexes: [0],
        explanation:
          '<time datetime="...">. Тега <date> нет; <data> — для произвольных значений value.',
      },
      {
        id: 'ht2-18',
        prompt: 'Какие теги группируют поля формы и дают группе подпись?',
        options: ['<fieldset>', '<legend>', '<label>', '<optgroup>'],
        correctIndexes: [0, 1],
        explanation:
          '<fieldset> группирует поля, <legend> — заголовок группы. <optgroup> — только внутри <select>.',
      },
    ],
  },
  {
    id: 'html-semantics',
    title: 'HTML: семантика',
    description:
      'Когда какой тег уместен: landmarks, article vs section, заголовки и доступность.',
    difficulty: 'medium',
    tags: ['html', 'семантика', 'a11y'],
    questions: [
      {
        id: 'sem-1',
        prompt: 'В чём главная идея семантической вёрстки?',
        options: [
          'Теги передают смысл содержимого, а не только внешний вид',
          'Чем больше div, тем лучше SEO',
          'Все блоки обязаны быть <section>',
          'Семантика заменяет CSS',
        ],
        correctIndexes: [0],
        explanation:
          'Семантика помогает браузерам, скринридерам и поисковикам понять структуру документа.',
      },
      {
        id: 'sem-2',
        prompt: 'Сколько элементов <main> обычно должно быть на странице?',
        options: ['Ровно один видимый', 'Сколько угодно', 'Только внутри <article>', 'Ноль — main устарел'],
        correctIndexes: [0],
        explanation:
          'По спецификации — один видимый <main> с основным содержимым документа.',
      },
      {
        id: 'sem-3',
        prompt: 'Когда уместнее <article>, а не <section>?',
        options: [
          'Контент можно переиспользовать отдельно (пост, карточка, комментарий)',
          'Любой блок с фоном',
          'Только для новостных сайтов',
          'Когда нужен inline-элемент',
        ],
        correctIndexes: [0],
        explanation:
          '<article> — самостоятельная единица. <section> — тематический раздел внутри страницы.',
      },
      {
        id: 'sem-4',
        prompt: 'Для чего предназначен <nav>?',
        options: [
          'Основные навигационные ссылки',
          'Любой список ссылок в футере обязательно',
          'Замена <ul>',
          'Только мобильное меню',
        ],
        correctIndexes: [0],
        explanation:
          '<nav> — блоки навигации (меню, оглавление). Не каждый набор ссылок обязан быть nav.',
      },
      {
        id: 'sem-5',
        prompt: 'Какие теги относятся к landmark-ролям страницы?',
        options: ['<header>', '<nav>', '<main>', '<div>'],
        correctIndexes: [0, 1, 2],
        explanation:
          'Landmarks помогают ориентироваться: header, nav, main, footer, aside… <div> роли не даёт.',
      },
      {
        id: 'sem-6',
        prompt: 'Можно ли вкладывать <header> внутрь <article>?',
        options: [
          'Да — header статьи, не путать с шапкой сайта',
          'Нет — header только один на документ',
          'Только если нет <h1>',
          'Только в <footer>',
        ],
        correctIndexes: [0],
        explanation:
          '<header> может быть у секции/статьи: вводный блок именно этого раздела.',
      },
      {
        id: 'sem-7',
        prompt: 'Как лучше выстроить заголовки на странице?',
        options: [
          'Иерархия без скачков: h1 → h2 → h3…',
          'Все заголовки сделать h1 для SEO',
          'Пропускать уровни для красоты',
          'Заголовки только в <header>',
        ],
        correctIndexes: [0],
        explanation:
          'Логичная иерархия важна для доступности и понимания структуры.',
      },
      {
        id: 'sem-8',
        prompt: 'Чем <section> отличается от <div>?',
        options: [
          'section — тематический раздел, обычно со своим заголовком',
          'div запрещён в HTML5',
          'section нельзя стилизовать',
          'Разницы нет',
        ],
        correctIndexes: [0],
        explanation:
          '<div> — нейтральный контейнер. <section> несёт смысл «раздел темы».',
      },
      {
        id: 'sem-9',
        prompt: 'Куда логично положить контактный адрес организации?',
        options: ['<address>', '<aside>', '<cite>', '<pre>'],
        correctIndexes: [0],
        explanation:
          '<address> — контактная информация автора/организации (не любой почтовый адрес в тексте).',
      },
      {
        id: 'sem-10',
        prompt: 'Какие теги усиливают смысл текста, а не только начертание?',
        options: ['<strong>', '<em>', '<b>', '<i>'],
        correctIndexes: [0, 1],
        explanation:
          '<strong> и <em> — семантика. <b> и <i> чаще про оформление без смены смысла.',
      },
      {
        id: 'sem-11',
        prompt: 'Почему плохая идея делать кнопку через <div onclick>?',
        options: [
          'Нет клавиатурной и ролевой семантики кнопки',
          'div нельзя стилизовать',
          'onclick запрещён в HTML',
          'Поисковики блокируют div',
        ],
        correctIndexes: [0],
        explanation:
          '<button> сразу доступен с клавиатуры и понятен вспомогательным технологиям.',
      },
      {
        id: 'sem-12',
        prompt: 'Какой тег лучше для основного содержимого блог-поста на странице поста?',
        options: ['<article>', '<aside>', '<nav>', '<span>'],
        correctIndexes: [0],
        explanation: 'Сам пост — самостоятельный <article> (часто внутри <main>).',
      },
      {
        id: 'sem-13',
        prompt: 'Что верно про <footer>?',
        options: [
          'Может быть у страницы и у article/section',
          'Разрешён только один на весь сайт',
          'Только для копирайта©',
          'Заменяет <aside>',
        ],
        correctIndexes: [0],
        explanation:
          'Футер документа или футер конкретной секции/статьи — оба варианта валидны.',
      },
      {
        id: 'sem-14',
        prompt: 'Какие практики помогают семантике и доступности?',
        options: [
          'Осмысленные теги вместо «див-супа»',
          'Связка label + input',
          'alt у значимых изображений',
          'Все тексты только в canvas',
        ],
        correctIndexes: [0, 1, 2],
        explanation:
          'Семантика, подписи полей и alt — база. Текст в canvas скринридерам почти недоступен.',
      },
    ],
  },
  {
    id: 'html-seo',
    title: 'HTML: SEO-теги',
    description:
      'Title, meta, canonical, Open Graph, заголовки и атрибуты, важные для поиска.',
    difficulty: 'medium',
    tags: ['html', 'seo', 'meta'],
    questions: [
      {
        id: 'seo-1',
        prompt: 'Какой тег сильнее всего влияет на заголовок сниппета в поиске?',
        options: ['<title>', '<h1>', '<meta name="title">', '<header>'],
        correctIndexes: [0],
        explanation:
          'В выдаче обычно берут <title>. <h1> важен на странице, но это не то же самое.',
      },
      {
        id: 'seo-2',
        prompt: 'Где должен лежать <title>?',
        options: ['Внутри <head>', 'Внутри <body>', 'Внутри <footer>', 'Только в sitemap'],
        correctIndexes: [0],
        explanation: '<title> — обязательный элемент документа в <head>.',
      },
      {
        id: 'seo-3',
        prompt: 'Для чего нужен <meta name="description">?',
        options: [
          'Краткое описание страницы; часто попадает в сниппет',
          'Обязательный рейтинг в Google',
          'Замена <title>',
          'Подключение CSS',
        ],
        correctIndexes: [0],
        explanation:
          'Description не «ранжирует» напрямую, но влияет на кликабельность сниппета.',
      },
      {
        id: 'seo-4',
        prompt: 'Какой атрибут у <html> помогает поисковикам и браузеру с языком?',
        options: ['lang', 'locale', 'xml:lang только', 'translate'],
        correctIndexes: [0],
        explanation: 'Например: <html lang="ru">.',
      },
      {
        id: 'seo-5',
        prompt: 'Что делает <link rel="canonical" href="...">?',
        options: [
          'Указывает предпочтительный URL при дублях',
          'Редиректит пользователя на HTTPS',
          'Добавляет страницу в Яндекс.Вебмастер',
          'Включает минификацию HTML',
        ],
        correctIndexes: [0],
        explanation:
          'Canonical говорит: «основная версия вот эта» — полезно при параметрах и копиях.',
      },
      {
        id: 'seo-6',
        prompt: 'Какие meta помогают управлять индексацией?',
        options: [
          '<meta name="robots" content="noindex">',
          '<meta name="googlebot" content="nofollow">',
          '<meta charset="utf-8">',
          '<meta name="viewport" ...>',
        ],
        correctIndexes: [0, 1],
        explanation:
          'robots/googlebot влияют на индекс и follow. charset и viewport — не про индексацию.',
      },
      {
        id: 'seo-7',
        prompt: 'Зачем Open Graph-теги вроде og:title и og:image?',
        options: [
          'Красивые превью при шаринге в соцсетях',
          'Обязательны для попадания в топ-1',
          'Заменяют sitemap.xml',
          'Ускоряют First Contentful Paint',
        ],
        correctIndexes: [0],
        explanation: 'OG читают соцсети и мессенджеры при формировании карточки ссылки.',
      },
      {
        id: 'seo-8',
        prompt: 'Какие практики по заголовкам полезны для SEO и UX?',
        options: [
          'Один понятный h1 с темой страницы',
          'Логичная иерархия h2/h3',
          'Десять одинаковых h1 «купить»',
          'Прятать весь текст в картинках',
        ],
        correctIndexes: [0, 1],
        explanation:
          'Ясная структура заголовков помогает и людям, и роботам. Спам и текст-в-картинке — вред.',
      },
      {
        id: 'seo-9',
        prompt: 'Почему важен осмысленный alt у изображений?',
        options: [
          'Доступность + понимание картинки поиском',
          'Google ранжирует только по alt',
          'Без alt страница не валидна всегда',
          'alt заменяет src',
        ],
        correctIndexes: [0],
        explanation:
          'alt нужен скринридерам и помогает понять изображение; для декоративных — пустой alt=""',
      },
      {
        id: 'seo-10',
        prompt: 'Какой тег подключает фавикон?',
        options: [
          '<link rel="icon" href="...">',
          '<meta name="favicon">',
          '<icon src="...">',
          '<img rel="icon">',
        ],
        correctIndexes: [0],
        explanation: 'Классика: <link rel="icon" href="/favicon.ico"> в <head>.',
      },
      {
        id: 'seo-11',
        prompt: 'Что делает <meta charset="utf-8">?',
        options: [
          'Задаёт кодировку документа',
          'Включает HTTPS',
          'Ставит noindex',
          'Подключает шрифты Google',
        ],
        correctIndexes: [0],
        explanation: 'Без правильной кодировки кириллица «поедет». Ставят в начале <head>.',
      },
      {
        id: 'seo-12',
        prompt: 'Какие URL-практики дружелюбны к SEO?',
        options: [
          'Читаемый путь: /blog/html-semantics',
          'Один контент — один канонический URL',
          'Одинаковый текст на сотне ?id=',
          'Дубли http и https без canonical/редиректа',
        ],
        correctIndexes: [0, 1],
        explanation: 'Понятные URL и борьба с дублями важнее «магических» meta.',
      },
      {
        id: 'seo-13',
        prompt: 'Для чего <meta name="viewport" content="width=device-width, initial-scale=1">?',
        options: [
          'Корректное отображение на мобильных',
          'Ускорение серверного рендера',
          'Отключение CSS',
          'Индексация PDF',
        ],
        correctIndexes: [0],
        explanation:
          'Без viewport мобильный Google может считать страну «неудобной» для mobile-first.',
      },
      {
        id: 'seo-14',
        prompt: 'Какие элементы помогают поисковику понять структуру контента?',
        options: ['Семантические теги', 'Осмысленные заголовки', 'Только <div class="seo">', 'Скрытый текст display:none спамом'],
        correctIndexes: [0, 1],
        explanation:
          'Нормальная семантика и заголовки — да. SEO-div и скрытый спам — нет (и рискованно).',
      },
      {
        id: 'seo-15',
        prompt: 'Где размещают <meta name="description"> и canonical?',
        options: ['В <head>', 'В конце <body>', 'Внутри <h1>', 'В robots.txt как HTML'],
        correctIndexes: [0],
        explanation: 'Метаданные документа живут в <head>.',
      },
    ],
  },
  {
    id: 'css-basics-1',
    title: 'CSS: база — 1-я часть',
    description:
      'Селекторы, цвета, шрифты, box model, display и базовые свойства.',
    difficulty: 'easy',
    tags: ['css', 'база', 'новичкам'],
    questions: [
      {
        id: 'css1-1',
        prompt: 'Как подключить внешний CSS-файл?',
        options: [
          '<link rel="stylesheet" href="styles.css">',
          '<style src="styles.css">',
          '<css href="styles.css">',
          '<script href="styles.css">',
        ],
        correctIndexes: [0],
        explanation: 'Внешний файл подключают через <link> в <head>.',
      },
      {
        id: 'css1-2',
        prompt: 'Что выбирает селектор .card?',
        options: [
          'Элементы с class="card"',
          'Элемент <card>',
          'Элемент с id="card"',
          'Все дочерние теги',
        ],
        correctIndexes: [0],
        explanation: 'Точка — селектор класса. Решётка # — id.',
      },
      {
        id: 'css1-3',
        prompt: 'Что выбирает селектор #hero?',
        options: [
          'Элемент с id="hero"',
          'Все элементы class="hero"',
          'Псевдокласс :hero',
          'Тег <hero>',
        ],
        correctIndexes: [0],
        explanation: '# — селектор id. Id на странице должен быть уникальным.',
      },
      {
        id: 'css1-4',
        prompt: 'Какие записи задают цвет текста?',
        options: ['color: red;', 'color: #f06529;', 'color: rgb(40, 40, 40);', 'font-color: black;'],
        correctIndexes: [0, 1, 2],
        explanation: 'Свойство — color. Свойства font-color в CSS нет.',
      },
      {
        id: 'css1-5',
        prompt: 'Какое свойство меняет размер шрифта?',
        options: ['font-size', 'text-size', 'font-weight', 'line-height'],
        correctIndexes: [0],
        explanation: 'Размер — font-size. font-weight — насыщенность, line-height — высота строки.',
      },
      {
        id: 'css1-6',
        prompt: 'Что входит в CSS box model?',
        options: ['content', 'padding', 'border', 'margin'],
        correctIndexes: [0, 1, 2, 3],
        explanation: 'Все четыре слоя — классическая модель коробки.',
      },
      {
        id: 'css1-7',
        prompt: 'Чем padding отличается от margin?',
        options: [
          'padding — внутри рамки, margin — снаружи',
          'margin нельзя задавать отрицательным никогда',
          'padding только для inline',
          'Это синонимы',
        ],
        correctIndexes: [0],
        explanation: 'Внутренний отступ vs внешний. У margin бывает collapse между блоками.',
      },
      {
        id: 'css1-8',
        prompt: 'Что делает box-sizing: border-box?',
        options: [
          'width включает padding и border',
          'Убирает margin',
          'Делает элемент flex-контейнером',
          'Сбрасывает все отступы',
        ],
        correctIndexes: [0],
        explanation:
          'При border-box ширина «как на макете»: padding/border не раздувают блок поверх width.',
      },
      {
        id: 'css1-9',
        prompt: 'Какие значения display встречаются чаще всего на старте?',
        options: ['block', 'inline', 'inline-block', 'magic'],
        correctIndexes: [0, 1, 2],
        explanation: 'block, inline, inline-block — база. Значения magic нет.',
      },
      {
        id: 'css1-10',
        prompt: 'Чем <span> обычно отличается от <div> по display по умолчанию?',
        options: [
          'span — inline, div — block',
          'Оба flex',
          'span — block, div — inline',
          'Оба none',
        ],
        correctIndexes: [0],
        explanation: 'Дефолтные display совпадают с природой этих тегов.',
      },
      {
        id: 'css1-11',
        prompt: 'Как сделать текст жирным через CSS?',
        options: ['font-weight: bold;', 'font-weight: 700;', 'text-bold: true;', 'font-style: bold;'],
        correctIndexes: [0, 1],
        explanation: 'font-weight: bold или число 700. font-style отвечает за italic/oblique.',
      },
      {
        id: 'css1-12',
        prompt: 'Какое свойство выравнивает текст внутри блока?',
        options: ['text-align', 'align-text', 'justify-items', 'vertical-align для блока целиком'],
        correctIndexes: [0],
        explanation: 'Горизонтальное выравнивание текста — text-align (left/center/right/justify).',
      },
      {
        id: 'css1-13',
        prompt: 'Что делает селектор p.note?',
        options: [
          'Теги <p> с классом note',
          'Любой .note внутри p',
          'Только id="note" у p',
          'Все параграфы и все .note',
        ],
        correctIndexes: [0],
        explanation: 'Составной селектор: элемент p И класс note на нём же.',
      },
      {
        id: 'css1-14',
        prompt: 'Какие единицы длины относительные?',
        options: ['em', 'rem', '%', 'px'],
        correctIndexes: [0, 1, 2],
        explanation: 'px — абсолютные CSS-пиксели. em/rem/% зависят от контекста.',
      },
      {
        id: 'css1-15',
        prompt: 'Что победит при равной специфичности: .a { color: red } или .a { color: blue } ниже в файле?',
        options: [
          'blue — побеждает то, что объявлено позже',
          'red — всегда первое правило',
          'Оба применятся сразу',
          'Браузер выберет случайно',
        ],
        correctIndexes: [0],
        explanation: 'Каскад: при равной специфичности побеждает более позднее объявление.',
      },
    ],
  },
  {
    id: 'css-basics-2',
    title: 'CSS: база — 2-я часть',
    description:
      'Фоны, рамки, тени, позиционирование, псевдоклассы, overflow и лёгкая анимация.',
    difficulty: 'medium',
    tags: ['css', 'оформление', 'position'],
    questions: [
      {
        id: 'css2-1',
        prompt: 'Какие свойства задают фон элемента?',
        options: [
          'background-color',
          'background-image',
          'background-size',
          'font-background',
        ],
        correctIndexes: [0, 1, 2],
        explanation:
          'Цвет, картинка и размер фона — валидные свойства. font-background не существует.',
      },
      {
        id: 'css2-2',
        prompt: 'Что делает border-radius: 50% у квадрата?',
        options: [
          'Превращает его в круг',
          'Удаляет border',
          'Делает элемент sticky',
          'Добавляет тень',
        ],
        correctIndexes: [0],
        explanation: 'У равной ширины и высоты 50% скругляет до круга.',
      },
      {
        id: 'css2-3',
        prompt: 'Чем box-shadow отличается от text-shadow?',
        options: [
          'box-shadow — тень блока, text-shadow — тень глифов текста',
          'Это полные синонимы',
          'text-shadow работает только на img',
          'box-shadow нельзя размывать',
        ],
        correctIndexes: [0],
        explanation: 'Разные цели: коробка vs текст.',
      },
      {
        id: 'css2-4',
        prompt: 'Какие значения position встречаются на практике?',
        options: ['static', 'relative', 'absolute', 'float-fixed'],
        correctIndexes: [0, 1, 2],
        explanation:
          'Ещё есть fixed и sticky. Значения float-fixed нет (float — отдельное свойство).',
      },
      {
        id: 'css2-5',
        prompt: 'Что верно про position: absolute?',
        options: [
          'Позиционируется относительно ближайшего non-static предка',
          'Всегда относительно окна браузера',
          'Нельзя задавать top/left',
          'Отключает color',
        ],
        correctIndexes: [0],
        explanation:
          'Ищут предка с position ≠ static. Если нет — относительно начального containing block.',
      },
      {
        id: 'css2-6',
        prompt: 'Для чего чаще всего нужен z-index?',
        options: [
          'Управлять наложением слоёв у позиционированных элементов',
          'Задать ширину колонок',
          'Включить flex',
          'Заменить margin',
        ],
        correctIndexes: [0],
        explanation: 'z-index работает в контексте наложения (обычно при position ≠ static).',
      },
      {
        id: 'css2-7',
        prompt: 'Какие псевдоклассы полезны для интерактива и доступности?',
        options: [':hover', ':focus', ':focus-visible', ':center'],
        correctIndexes: [0, 1, 2],
        explanation: ':hover/:focus/:focus-visible — да. Псевдокласса :center нет.',
      },
      {
        id: 'css2-8',
        prompt: 'Что делает overflow: hidden?',
        options: [
          'Обрезает содержимое, выходящее за границы',
          'Увеличивает padding',
          'Делает текст жирным',
          'Включает горизонтальный скролл всегда',
        ],
        correctIndexes: [0],
        explanation: 'Лишнее прячется. Для скролла — auto или scroll.',
      },
      {
        id: 'css2-9',
        prompt: 'Какое свойство плавно меняет, например, цвет за 0.2s?',
        options: ['transition', 'animation-delay alone', 'transform-origin', 'will-change обязательно'],
        correctIndexes: [0],
        explanation:
          'transition: color 0.2s ease. animation — для keyframes; will-change — подсказка оптимизации.',
      },
      {
        id: 'css2-10',
        prompt: 'Что умеет transform?',
        options: [
          'translate() — сдвинуть',
          'scale() — масштабировать',
          'rotate() — повернуть',
          'margin() — задать отступ',
        ],
        correctIndexes: [0, 1, 2],
        explanation: 'transform для геометрии. Отступы — через margin, не через transform.',
      },
      {
        id: 'css2-11',
        prompt: 'Как сделать полупрозрачный блок целиком (включая текст)?',
        options: [
          'opacity: 0.5',
          'color: transparent только',
          'visibility: collapse у flex-элемента как аналог',
          'z-index: 0.5',
        ],
        correctIndexes: [0],
        explanation:
          'opacity влияет на весь элемент и потомков. Для фона без текста — rgba()/hsla().',
      },
      {
        id: 'css2-12',
        prompt: 'Какие свойства оформляют рамку?',
        options: ['border-width', 'border-style', 'border-color', 'outline-radius'],
        correctIndexes: [0, 1, 2],
        explanation:
          'Ширина, стиль и цвет рамки. outline — отдельная обводка; outline-radius в стандарте нет.',
      },
      {
        id: 'css2-13',
        prompt: 'Чем outline часто удобнее border для :focus?',
        options: [
          'Не влияет на размер box model',
          'Всегда толще border',
          'Работает только в Firefox',
          'Заменяет alt у картинок',
        ],
        correctIndexes: [0],
        explanation: 'outline рисуется снаружи и не сдвигает раскладку — удобно для фокуса.',
      },
      {
        id: 'css2-14',
        prompt: 'Что делает object-fit: cover у img/video в фиксированном боксе?',
        options: [
          'Масштабирует с обрезкой, заполняя контейнер',
          'Всегда показывает картинку целиком с полями',
          'Удаляет src',
          'Включает lazy-loading',
        ],
        correctIndexes: [0],
        explanation: 'cover заполняет область (может обрезать). contain — целиком внутри.',
      },
      {
        id: 'css2-15',
        prompt: 'Какие значения cursor встречаются в UI?',
        options: ['pointer', 'not-allowed', 'text', 'clickable'],
        correctIndexes: [0, 1, 2],
        explanation: 'pointer/not-allowed/text — стандарт. Значения clickable нет.',
      },
    ],
  },
  {
    id: 'css-basics-3',
    title: 'CSS: база — 3-я часть',
    description:
      'Flexbox, Grid, gap, медиазапросы и адаптивные единицы — раскладка страницы.',
    difficulty: 'medium',
    tags: ['css', 'flexbox', 'grid', 'responsive'],
    questions: [
      {
        id: 'css3-1',
        prompt: 'Как сделать flex-контейнер?',
        options: [
          'display: flex',
          'display: inline-flex',
          'position: flex',
          'float: flex',
        ],
        correctIndexes: [0, 1],
        explanation: 'flex или inline-flex. Отдельного position/float: flex нет.',
      },
      {
        id: 'css3-2',
        prompt: 'За что отвечает justify-content во flex-контейнере?',
        options: [
          'Распределение по главной оси',
          'Распределение по поперечной оси',
          'Только цвет текста',
          'Только gap',
        ],
        correctIndexes: [0],
        explanation:
          'Главная ось — justify-content. Поперечная — align-items / align-content.',
      },
      {
        id: 'css3-3',
        prompt: 'Что делает align-items: center у flex-контейнера?',
        options: [
          'Центрирует элементы по поперечной оси',
          'Всегда включает wrap',
          'Удаляет margin у детей',
          'Меняет order на 0',
        ],
        correctIndexes: [0],
        explanation: 'Классика вертикального центрирования при flex-direction: row.',
      },
      {
        id: 'css3-4',
        prompt: 'Какие свойства управляют «гибкостью» flex-элемента?',
        options: ['flex-grow', 'flex-shrink', 'flex-basis', 'flex-shadow'],
        correctIndexes: [0, 1, 2],
        explanation: 'Рост, сжатие и базовая ширина. Shorthand: flex. flex-shadow нет.',
      },
      {
        id: 'css3-5',
        prompt: 'Что делает flex-wrap: wrap?',
        options: [
          'Переносит элементы на новую строку при нехватке места',
          'Обрезает текст многоточием',
          'Включает Grid',
          'Фиксирует ширину 100vw',
        ],
        correctIndexes: [0],
        explanation: 'По умолчанию nowrap — элементы стараются уместиться в одну линию.',
      },
      {
        id: 'css3-6',
        prompt: 'Как включить CSS Grid у контейнера?',
        options: [
          'display: grid',
          'display: inline-grid',
          'display: flex-grid',
          'position: grid',
        ],
        correctIndexes: [0, 1],
        explanation: 'grid / inline-grid. Значения flex-grid нет.',
      },
      {
        id: 'css3-7',
        prompt: 'Что описывает grid-template-columns: 1fr 2fr?',
        options: [
          'Две колонки: вторая вдвое шире первой',
          'Две строки одинаковой высоты',
          'Отступ 1fr',
          'Только для flex',
        ],
        correctIndexes: [0],
        explanation: 'fr — доля свободного пространства в grid.',
      },
      {
        id: 'css3-8',
        prompt: 'Для чего удобен gap в flex/grid?',
        options: [
          'Равномерные промежутки между элементами без «лишних» margin',
          'Замена padding у каждого ребёнка обязательно',
          'Только для position: absolute',
          'Отключение media queries',
        ],
        correctIndexes: [0],
        explanation: 'gap задаёт расстояние между треками/flex-элементами.',
      },
      {
        id: 'css3-9',
        prompt: 'Какая конструкция — медиазапрос?',
        options: [
          '@media (max-width: 768px) { ... }',
          '@query screen 768',
          '@responsive 768px',
          'media-width: 768px',
        ],
        correctIndexes: [0],
        explanation: 'Стили по условию viewport/устройства пишут через @media.',
      },
      {
        id: 'css3-10',
        prompt: 'Какие единицы связаны с размером viewport?',
        options: ['vw', 'vh', 'vmin', 'cm-only'],
        correctIndexes: [0, 1, 2],
        explanation: 'vw/vh/vmin/vmax — относительно окна. cm — абсолютная печатная единица.',
      },
      {
        id: 'css3-11',
        prompt: 'Чем min-width полезен в адаптивной вёрстке?',
        options: [
          'Не даёт элементу стать уже заданного порога',
          'Всегда равна 100%',
          'Отключает flex-shrink навсегда',
          'Работает только в Grid',
        ],
        correctIndexes: [0],
        explanation: 'Пара min-width / max-width ограничивает «резиновость» блоков.',
      },
      {
        id: 'css3-12',
        prompt: 'Что делает position: sticky?',
        options: [
          'Элемент «прилипает» при скролле в пределах предка',
          'То же, что absolute без top',
          'Фиксирует только на печати',
          'Заменяет overflow: auto',
        ],
        correctIndexes: [0],
        explanation:
          'sticky = относительное поведение до порога, затем как fixed в пределах контейнера.',
      },
      {
        id: 'css3-13',
        prompt: 'Чем Grid обычно удобнее Flex для «двухмерных» макетов?',
        options: [
          'Легко задавать и строки, и колонки одновременно',
          'Grid запрещает gap',
          'Flex не умеет центрировать',
          'Grid работает только в IE6',
        ],
        correctIndexes: [0],
        explanation: 'Flex силён в одном направлении; Grid — в сетке по двум осям.',
      },
      {
        id: 'css3-14',
        prompt: 'Какие подходы помогают мобильной вёрстке?',
        options: [
          'Гибкие ширины и max-width',
          'Медиазапросы',
          'Мета viewport',
          'Фиксированная ширина 1920px у body',
        ],
        correctIndexes: [0, 1, 2],
        explanation: 'Резина + @media + viewport. Жёсткие 1920px ломают телефоны.',
      },
      {
        id: 'css3-15',
        prompt: 'Что делает order у flex/grid-элемента?',
        options: [
          'Меняет визуальный порядок без изменения HTML',
          'Задаёт z-index автоматически',
          'Включает transition',
          'Удаляет элемент из потока навсегда',
        ],
        correctIndexes: [0],
        explanation:
          'order влияет на отрисовку. Для доступности лучше не ломать логический порядок без нужды.',
      },
    ],
  },
  {
    id: 'css-flexbox',
    title: 'CSS: Flexbox',
    description:
      'Оси, выравнивание, flex-шорткаты, wrap, align-self и типичные паттерны раскладки.',
    difficulty: 'medium',
    tags: ['css', 'flexbox', 'layout'],
    questions: [
      {
        id: 'flex-1',
        prompt: 'Кто является flex-контейнером, а кто — flex-элементом?',
        options: [
          'Контейнер — у кого display: flex; элементы — его прямые дети',
          'Любой потомок на любой глубине — flex-элемент',
          'flex задаётся только на html',
          'Контейнер и элемент — одно и то же',
        ],
        correctIndexes: [0],
        explanation:
          'Flex действует на прямых детей. Внуки не становятся flex-items, пока сами не окажутся в своём flex-контейнере.',
      },
      {
        id: 'flex-2',
        prompt: 'Что делает flex-direction: column?',
        options: [
          'Главная ось становится вертикальной',
          'Всегда включает wrap',
          'Меняет HTML-порядок тегов',
          'Отключает gap',
        ],
        correctIndexes: [0],
        explanation:
          'При column главная ось сверху вниз; justify-content тогда работает по вертикали.',
      },
      {
        id: 'flex-3',
        prompt: 'Какие значения flex-direction валидны?',
        options: ['row', 'row-reverse', 'column', 'column-reverse'],
        correctIndexes: [0, 1, 2, 3],
        explanation: 'Все четыре — стандартные направления главной оси.',
      },
      {
        id: 'flex-4',
        prompt: 'Чем align-content отличается от align-items?',
        options: [
          'align-content — распределение линий при wrap; align-items — элементы в линии',
          'Это полные синонимы',
          'align-content работает только без wrap',
          'align-items только для Grid',
        ],
        correctIndexes: [0],
        explanation:
          'align-content заметен, когда несколько рядов (flex-wrap: wrap) и есть свободное место по поперечной оси.',
      },
      {
        id: 'flex-5',
        prompt: 'Что означает запись flex: 1?',
        options: [
          'Элемент может расти и занимать свободное место (часто как 1 1 0%)',
          'Ширина ровно 1px',
          'order: 1',
          'Только flex-shrink: 1 без роста',
        ],
        correctIndexes: [0],
        explanation:
          'Шорткат flex: 1 обычно даёт grow=1 — делит свободное пространство с соседями.',
      },
      {
        id: 'flex-6',
        prompt: 'Что задаёт flex-basis?',
        options: [
          'Базовый размер элемента до роста/сжатия',
          'Только z-index',
          'Цвет фона flex-линии',
          'Обязательный min-width: 0',
        ],
        correctIndexes: [0],
        explanation:
          'basis — стартовая ширина/высота вдоль главной оси (в зависимости от direction).',
      },
      {
        id: 'flex-7',
        prompt: 'Зачем на flex-элементе часто ставят min-width: 0?',
        options: [
          'Чтобы длинный контент мог сжаться, а не раздувать контейнер',
          'Чтобы отключить flex',
          'Это синоним width: 0',
          'Только для Safari print',
        ],
        correctIndexes: [0],
        explanation:
          'По умолчанию min-width: auto мешает сжиматься ниже размера контента — текст/картинки «распирают» ряд.',
      },
      {
        id: 'flex-8',
        prompt: 'Что делает align-self: flex-end у одного элемента?',
        options: [
          'Переопределяет align-items только для него',
          'Меняет flex-direction контейнера',
          'Включает position: absolute',
          'Работает только с grid-area',
        ],
        correctIndexes: [0],
        explanation: 'align-self — индивидуальное выравнивание на поперечной оси.',
      },
      {
        id: 'flex-9',
        prompt: 'Как центрировать один блок и по горизонтали, и по вертикали во flex?',
        options: [
          'justify-content: center и align-items: center',
          'Только text-align: center',
          'Только margin: auto у контейнера без flex',
          'float: center',
        ],
        correctIndexes: [0],
        explanation:
          'Классический паттерн: display: flex + центрирование по обеим осям.',
      },
      {
        id: 'flex-10',
        prompt: 'Что делает justify-content: space-between?',
        options: [
          'Первый у края старта, последний у края конца, между ними — свободное место',
          'Одинаковые поля со всех сторон у каждого',
          'Склеивает элементы в центр',
          'Добавляет gap: 0 принудительно',
        ],
        correctIndexes: [0],
        explanation: 'Крайние элементы прижаты к краям, промежутки — между ними.',
      },
      {
        id: 'flex-11',
        prompt: 'Чем space-around отличается от space-evenly?',
        options: [
          'around — полполя с краёв; evenly — одинаковые интервалы везде, включая края',
          'Разницы нет',
          'evenly только в Grid',
          'around игнорирует flex-wrap',
        ],
        correctIndexes: [0],
        explanation:
          'При space-around внешние отступы вдвое меньше внутренних. space-evenly делит поровну.',
      },
      {
        id: 'flex-12',
        prompt: 'Какие свойства задают на контейнере, а не на элементе?',
        options: [
          'justify-content',
          'align-items',
          'flex-wrap',
          'flex-grow',
        ],
        correctIndexes: [0, 1, 2],
        explanation: 'grow/shrink/basis/align-self/order — у элемента. wrap и выравнивание линий — у контейнера.',
      },
      {
        id: 'flex-13',
        prompt: 'Что происходит при flex-direction: row-reverse?',
        options: [
          'Главная ось идёт справа налево, визуальный порядок зеркалится',
          'HTML в DOM переписывается',
          'Отключается клавиатура',
          'Включается Grid автоматически',
        ],
        correctIndexes: [0],
        explanation:
          'Визуальный порядок меняется; для a11y осторожнее с reverse и order.',
      },
      {
        id: 'flex-14',
        prompt: 'Как сделать «шапка | контент растёт | футер» колонкой?',
        options: [
          'column + flex: 1 на среднем блоке',
          'Только float: left у всех',
          'grid запрещён рядом с flex навсегда',
          'height: 1% у футера',
        ],
        correctIndexes: [0],
        explanation:
          'Колоночный flex на странице/секции и flex: 1 у main — частый sticky-footer паттерн.',
      },
      {
        id: 'flex-15',
        prompt: 'Что верно про gap во Flexbox?',
        options: [
          'Задаёт промежутки между элементами/линиями',
          'Работает вместе с wrap',
          'Заменяет собой padding контейнера полностью всегда',
          'Существует только в Grid, во Flex запрещён',
        ],
        correctIndexes: [0, 1],
        explanation:
          'gap поддерживается и во Flex. Это не полная замена внутренних отступов контейнера.',
      },
      {
        id: 'flex-16',
        prompt: 'Запись flex: 0 0 200px означает…',
        options: [
          'Не расти, не сжиматься, базовая ширина 200px',
          'Всегда 0px ширины',
          'grow=200',
          'Только для column',
        ],
        correctIndexes: [0],
        explanation: 'Жёсткий размер 200px вдоль главной оси (если не мешают min/max).',
      },
    ],
  },
  {
    id: 'css-grid',
    title: 'CSS: Grid',
    description:
      'Треки, fr, template areas, размещение items, auto-fit/fill и выравнивание в сетке.',
    difficulty: 'medium',
    tags: ['css', 'grid', 'layout'],
    questions: [
      {
        id: 'grid-1',
        prompt: 'Из чего состоит CSS Grid на базовом уровне?',
        options: [
          'Строки и колонки (треки), на пересечении — ячейки',
          'Только одна ось, как у Flex',
          'Только float-колонки',
          'Только table-layout',
        ],
        correctIndexes: [0],
        explanation: 'Двумерная сетка: rows × columns.',
      },
      {
        id: 'grid-2',
        prompt: 'Что делает repeat(3, 1fr)?',
        options: [
          'Три равные доли свободного пространства',
          'Три пикселя',
          'Три media query',
          'Только три строки named lines',
        ],
        correctIndexes: [0],
        explanation: 'Кратко для grid-template-columns/rows: три одинаковых fr-трека.',
      },
      {
        id: 'grid-3',
        prompt: 'Чем fr отличается от % в grid-треках?',
        options: [
          'fr делит свободное место после фиксированных треков и gap',
          '% и fr всегда считаются одинаково',
          'fr запрещён в rows',
          'fr работает только с flex',
        ],
        correctIndexes: [0],
        explanation:
          'fr удобнее для «остатка»; % считаются от размера контейнера и хуже дружат со сложными треками.',
      },
      {
        id: 'grid-4',
        prompt: 'Что описывает minmax(200px, 1fr)?',
        options: [
          'Трек не уже 200px, но может расти долей fr',
          'Всегда ровно 200px',
          'Максимум 200px и минимум 1fr одновременно как константа',
          'Отключает auto-placement',
        ],
        correctIndexes: [0],
        explanation: 'Частый паттерн резиновых колонок с нижним порогом.',
      },
      {
        id: 'grid-5',
        prompt: 'Для чего grid-template-areas?',
        options: [
          'Именовать зоны сетки и класть в них элементы через grid-area',
          'Только анимация областей',
          'Замена @media',
          'Отключение gap',
        ],
        correctIndexes: [0],
        explanation:
          'Рисуете раскладку строками "header header" / "nav main" и назначаете детям grid-area: header.',
      },
      {
        id: 'grid-6',
        prompt: 'Что делают grid-column: 1 / 3?',
        options: [
          'Элемент занимает колонки от линии 1 до линии 3 (две колонки)',
          'Ставит order: 3',
          'Создаёт 3fr',
          'Только margin-left: 1',
        ],
        correctIndexes: [0],
        explanation: 'Указываются линии сетки: старт / конец.',
      },
      {
        id: 'grid-7',
        prompt: 'Чем span 2 полезен в grid-column?',
        options: [
          'Растянуть элемент на две колонки',
          'Сделать z-index: 2',
          'Включить subgrid',
          'Задать gap: 2',
        ],
        correctIndexes: [0],
        explanation: 'Например: grid-column: span 2.',
      },
      {
        id: 'grid-8',
        prompt: 'В чём идея auto-fit vs auto-fill в repeat?',
        options: [
          'Оба набирают столько колонок, сколько влезает; fit схлопывает пустые треки',
          'auto-fill запрещён в Chrome',
          'Разницы нет никогда',
          'auto-fit работает только с px, не с minmax',
        ],
        correctIndexes: [0],
        explanation:
          'Классика: repeat(auto-fit, minmax(240px, 1fr)) — адаптивная сетка карточек.',
      },
      {
        id: 'grid-9',
        prompt: 'Что делает justify-items: center в Grid?',
        options: [
          'Выравнивает содержимое ячеек по горизонтали (ось строк)',
          'То же, что justify-content у всего грида всегда',
          'Только для flex-элементов',
          'Меняет template areas',
        ],
        correctIndexes: [0],
        explanation:
          'justify-items/align-items — внутри ячеек. justify-content/align-content — вся сетка в контейнере.',
      },
      {
        id: 'grid-10',
        prompt: 'Когда заметны justify-content / align-content у grid-контейнера?',
        options: [
          'Когда суммарный размер треков меньше контейнера',
          'Только если нет ни одной колонки',
          'Только при display: flex',
          'Всегда перекрывают width: 100%',
        ],
        correctIndexes: [0],
        explanation: 'Свободное место вокруг всей сетки распределяют content-свойства.',
      },
      {
        id: 'grid-11',
        prompt: 'Что такое grid-auto-rows?',
        options: [
          'Размер неявно создаваемых строк',
          'Только имена areas',
          'Шорткат для flex-basis',
          'Псевдокласс :rows',
        ],
        correctIndexes: [0],
        explanation:
          'Если элементов больше явного шаблона, появляются неявные треки — их размер задаёт auto-rows/columns.',
      },
      {
        id: 'grid-12',
        prompt: 'Какие единицы/функции часто встречаются в треках?',
        options: ['fr', 'minmax()', 'repeat()', 'flex-grow'],
        correctIndexes: [0, 1, 2],
        explanation: 'fr/minmax/repeat — язык Grid. flex-grow — свойство Flex-элемента.',
      },
      {
        id: 'grid-13',
        prompt: 'Что делает place-items: center?',
        options: [
          'Шорткат для align-items и justify-items: center',
          'Центрирует только текст через text-align',
          'Создаёт одну колонку 1fr',
          'Включает masonry во всех браузерах',
        ],
        correctIndexes: [0],
        explanation: 'Удобно центрировать содержимое всех ячеек одной записью.',
      },
      {
        id: 'grid-14',
        prompt: 'Можно ли совмещать Grid и Flex на одной странице?',
        options: [
          'Да: например, страница на Grid, навбар на Flex',
          'Нет: только что-то одно на документ',
          'Только если отключить gap',
          'Только внутри table',
        ],
        correctIndexes: [0],
        explanation: 'Инструменты дополняют друг друга на разных уровнях вложенности.',
      },
      {
        id: 'grid-15',
        prompt: 'Что описывает запись grid-template-columns: 200px 1fr auto?',
        options: [
          'Фиксированная, доля остатка и по содержимому',
          'Три равные колонки',
          'Только для строк',
          'Невалидный CSS',
        ],
        correctIndexes: [0],
        explanation: 'Смешанные треки — обычная практика сайдбар + контент + компактная колонка.',
      },
      {
        id: 'grid-16',
        prompt: 'Какие способы разместить item в конкретной зоне верны?',
        options: [
          'grid-area: header',
          'grid-row: 1 / 2 вместе с grid-column',
          'float: grid-area',
          'align-self без координат всегда достаточно для зоны header',
        ],
        correctIndexes: [0, 1],
        explanation:
          'Именованная area или линии row/column. float: grid-area нет; align-self только выравнивает в ячейке.',
      },
    ],
  },
]

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id)
}
