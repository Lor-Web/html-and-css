# Markup Lab

Учебный фронтенд-проект для практики HTML и CSS: задания в песочнице, квизы и статьи.

## Стек

- React + TypeScript
- Vite
- Jotai (состояние + localStorage)
- React Router
- Ant Design
- pnpm

## Запуск

```bash
pnpm install
pnpm dev
```

Сборка:

```bash
pnpm build
pnpm preview
```

## Деплой

Проект готов к Netlify (`netlify.toml`): SPA-редирект на `index.html`, publish — `dist`.

## Что внутри

- **Задания** — редактор HTML/CSS, live-превью, автопроверки
- **Квизы** — вопросы с объяснениями
- **Статьи** — короткие материалы
- **Тема** — светлая / тёмная
- **Прогресс** — ключи `markup-lab:*` в localStorage
