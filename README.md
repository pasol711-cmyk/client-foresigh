# Sales Navigator Pro

Мобильное приложение для менеджеров по продажам B2B (финансовые и технологические услуги). Построено на TanStack Start (SSR) + React 19 + Tailwind CSS v4, собирается под среду Cloudflare Workers (workerd).

## Локальный запуск (без Docker)

```bash
npm install
npm run dev
```

Приложение будет доступно на `http://localhost:5173`.

## Запуск в Docker

В репозитории есть `Dockerfile` (multi-stage сборка на `node:20-alpine`) и `.dockerignore`. Контейнер поднимает полноценный SSR через локальный `workerd` (`wrangler dev --local`), без подключения к аккаунту Cloudflare.

### Сборка образа

```bash
docker build -t sales-navigator .
```

### Запуск контейнера

```bash
docker run --rm -p 8080:8080 sales-navigator
```

После старта приложение доступно на `http://localhost:8080`.

### Порты

| Порт в контейнере | Назначение                          | Как пробросить       |
|-------------------|-------------------------------------|----------------------|
| `8080`            | HTTP-сервер SSR (workerd)           | `-p <host>:8080`     |

Если порт 8080 на хосте занят — пробросьте на любой другой, например `-p 3000:8080`, и открывайте `http://localhost:3000`.

### Переменные окружения

Для текущей демо-версии **обязательных переменных окружения нет** — все данные мокированы в `src/lib/mock-data.ts`, бэкенд не подключён.

На будущее, когда появится Lovable Cloud / Supabase / внешние API, переменные передаются стандартно через `-e` или `--env-file`:

```bash
# Через флаги
docker run --rm -p 8080:8080 \
  -e VITE_SUPABASE_URL=https://xxx.supabase.co \
  -e VITE_SUPABASE_PUBLISHABLE_KEY=eyJ... \
  -e SUPABASE_SERVICE_ROLE_KEY=eyJ... \
  sales-navigator

# Или через файл
docker run --rm -p 8080:8080 --env-file .env sales-navigator
```

Правила именования:

| Префикс              | Где доступно                  | Для чего                                   |
|----------------------|-------------------------------|--------------------------------------------|
| `VITE_*`             | Клиент + сервер (bundled)     | Публичные значения (URL API, public keys)  |
| без префикса         | Только сервер (`process.env`) | Секреты, service-role keys, webhook secrets|

**Важно:** `VITE_*` переменные подставляются на этапе `npm run build` (внутри stage `build` в Dockerfile). Если меняете их — образ нужно пересобрать. Серверные переменные (`process.env.X`) читаются в рантайме и применяются без пересборки.

### Полезные флаги

```bash
# Запуск в фоне с именем контейнера
docker run -d --name sales-navigator -p 8080:8080 sales-navigator

# Логи
docker logs -f sales-navigator

# Остановка и удаление
docker stop sales-navigator && docker rm sales-navigator
```

## Структура проекта

- `src/routes/` — файловый роутинг TanStack Start
- `src/components/` — UI-компоненты (shadcn/ui + кастомные)
- `src/lib/mock-data.ts` — мок-данные карточек продаж
- `wrangler.jsonc` — конфиг Cloudflare Worker (используется и в Docker, и при `Publish`)

## Деплой

Самый простой способ опубликовать приложение для демо — кнопка **Publish** прямо в Lovable. Альтернатива — контейнер выше можно запустить на любом хосте с Docker (VPS, Kubernetes, Fly.io machines и т.д.).
