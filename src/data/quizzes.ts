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
]

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id)
}
