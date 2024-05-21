# nfactorial 2024

### https://nfactorial.timursaurus.com/

## Реализовано
 - Google Auth
 - Список мероприятий
 - Регистрация на мероприятие
 - Отмена регистрации
 - Создание события в Google Calendar
 - Удаление события из Google Calendar
 - Мои зарегистрированные мероприятия


## Компромиссы
 - Нет функционала для создания, редактирования мероприятий пользователем. Все делается в Supabase.
 - В БД описаны свойства заполненности мероприятий, но не инкрементируются при бронировании в текущей реализации.

 ## Misc
 - Hosted on Netlify https://nfactorial.timursaurus.com
 - Built with Nuxt
 - Supabase for auth and data storage


## Setup

`.env`-файл в корне проекта для запуска.
```env
SUPABASE_URL="https://<URL-проекта>.supabase.co"
SUPABASE_KEY="<API-ключ>"
```

В локальном запуске проекта нет необходимости. Проект задеплоен на https://nfactorial.timursaurus.com/

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

