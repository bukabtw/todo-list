# Список дел на Vue 3

![Vue.js](https://img.shields.io/badge/vue-3.5.34-%234FC08D.svg?style=for-the-badge&logo=vuedotjs&logoColor=white) ![Vuetify](https://img.shields.io/badge/vuetify-4.0.7-%231867C0.svg?style=for-the-badge&logo=vuetify&logoColor=white) ![Vuex](https://img.shields.io/badge/vuex-4.1.0-%2335495e.svg?style=for-the-badge&logo=vue.js&logoColor=white) ![Vue Router](https://img.shields.io/badge/vue_router-4.6.4-%2342b883.svg?style=for-the-badge&logo=vue.js&logoColor=white)

Современное веб-приложение для управления задачами, построенное на стеке Vue 3 + Vuetify 3 + Vuex 4 + Vue Router 4.

## Возможности

- Добавление новых задач
- Отметка задач как выполненных
- Удаление отдельных задач
- Очистка всех выполненных задач
- Статистика выполнения задач
- Сохранение данных в localStorage
- Уведомления о действиях с задачами
- Современный UI на Vuetify 3
- Адаптивный дизайн
- Быстрая навигация между страницами

## Стек технологий

- **Vue 3** — прогрессивный JavaScript-фреймворк
- **Vuetify 3** — UI-компоненты в стиле Material Design
- **Vuex 4** — управление состоянием приложения
- **Vue Router 4** — маршрутизация между страницами
- **Vite** — сборка и hot-reload разработочный сервер
- **Material Design Icons** — иконки для интерфейса

## Предварительные требования

Перед запуском убедитесь, что у вас установлены:

- [Node.js](https://nodejs.org/) (версия 16+ или 18+)
- [npm](https://www.npmjs.com/) или [yarn](https://yarnpkg.com/)

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/bukabtw/todo-list.git
cd todo-list
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: [http://localhost:5173](http://localhost:5173)

### 4. Сборка для продакшена

```bash
npm run build
```

### 5. Просмотр продакшн-версии

```bash
npm run preview
```

## Структура проекта

```
todo-list/
├── index.html              # Точка входа HTML
├── package.json            # Зависимости и скрипты
├── vite.config.js          # Конфигурация Vite
└── src/
    ├── main.js             # Инициализация приложения
    ├── App.vue             # Корневой компонент
    ├── router/
    │   └── index.js        # Конфигурация маршрутов
    ├── store/
    │   └── index.js        # Vuex store (состояние)
    └── components/
        └── GithubProfile.vue  # Компонент профиля GitHub
    └── views/
        ├── TasksView.vue       # Страница списка задач
        ├── StatsView.vue       # Страница статистики
        ├── ProfileView.vue     # Страница профиля
        ├── AboutView.vue       # Страница о проекте
        └── NotFoundView.vue    # Страница 404
```

## Архитектура приложения

### State Management (Vuex)

Приложение использует Vuex для централизованного управления состоянием:

**State:**
- `tasks` — массив всех задач
- `nextId` — следующий ID для новой задачи
- `notification` — текущее уведомление

**Getters:**
- `allTasks` — все задачи
- `completedTasks` — выполненные задачи
- `pendingTasks` — активные задачи
- `completedCount` — количество выполненных
- `pendingCount` — количество активных
- `totalCount` — общее количество задач

**Actions:**
- `addTask(title)` — добавление задачи
- `toggleTask(id)` — переключение статуса задачи
- `removeTask(id)` — удаление задачи
- `clearCompleted()` — очистка выполненных задач
- `loadTasks()` — загрузка задач из localStorage

### Маршрутизация

- `/` — список задач (TasksView)
- `/stats` — статистика (StatsView)
- `/profile` — профиль разработчика (ProfileView)
- `/about` — информация о проекте (AboutView)
- `*` — страница 404 (NotFoundView)

## Настройка темы

Цвета темы настроены в `src/main.js`:

```javascript
theme: {
  defaultTheme: 'light',
  themes: {
    light: {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        error: '#dc3545',
        success: '#21ba45',
        info: '#2185d0',
        background: '#f5f5f5',
      },
    },
  },
}
```

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера с hot-reload |
| `npm run build` | Сборка для продакшена |
| `npm run preview` | Просмотр продакшн-версии локально |


---

## Контакты
- Telegram: [@bukabtw](http://t.me/bukabtw)
- Email: [bukarev.k11@gmail.com](mailto:bukarev.k11@gmail.com)
- GitHub: [bukabtw](https://github.com/bukabtw)

*Выполнено в 2026 году в рамках производственной практики.*