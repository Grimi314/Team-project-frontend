# Природні Мандри Frontend

Frontend частина вебзастосунку **«Природні Мандри»**.

Проєкт створений для мандрівників, які хочуть ділитися власними історіями, знаходити натхнення в досвіді інших користувачів, зберігати цікаві матеріали та формувати власну добірку подорожей.

## Tech Stack

- Next.js
- React
- TypeScript
- Axios
- TanStack React Query
- Formik + Yup
- Zustand
- CSS Modules

## Features

- Реєстрація та авторизація користувача
- Перегляд історій мандрівників
- Фільтрація історій за категоріями
- Перегляд популярних історій
- Перегляд рекомендованих історій
- Детальна сторінка історії
- Збереження історій у профіль
- Видалення історій зі збережених
- Перегляд власних історій
- Створення нової історії
- Редагування профілю користувача
- Перегляд інших мандрівників

## Pages

- `/` — головна сторінка
- `/stories` — список історій
- `/stories/:storyId` — детальна сторінка історії
- `/stories/new` — створення історії
- `/profile` — збережені історії користувача
- `/profile/own` — власні історії користувача
- `/travellers` — список мандрівників
- `/travellers/:travellerId` — сторінка мандрівника
- `/auth/register` — реєстрація
- `/auth/login` — вхід

## Project Structure

```bash
src/
  app/                  # pages and routing
  app/components/       # reusable UI components
  auth/                 # auth API and auth state
  lib/api/              # API client and requests
  providers/            # global providers
  types/                # shared TypeScript types
```

## API

Frontend взаємодіє з backend API через Axios.  
Основні API-запити винесені в окремі модулі в `src/lib/api`.

## Deployment

Frontend задеплоєний на **Vercel**.
