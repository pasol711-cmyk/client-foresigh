## Контекст

Приложение собрано на TanStack Start с адаптером Cloudflare (`@cloudflare/vite-plugin`). Сборка `vite build` производит Worker-бандл для среды workerd, а не классический Node-сервер. Чтобы запустить SSR в контейнере для демонстрации, используем локальный workerd через `wrangler dev` — он умеет поднимать тот же бандл на произвольном порту.

## Что создаём

1. **`Dockerfile`** — multi-stage образ на базе `node:20-alpine`:
   - **stage `deps`**: копируем `package.json` + lock, ставим зависимости.
   - **stage `build`**: копируем исходники, запускаем `npm run build` → получаем `.output/` / `dist/` для Worker.
   - **stage `runtime`**: тонкий слой с production-зависимостями и собранным бандлом. Запускаем `npx wrangler dev --ip 0.0.0.0 --port 8080 --local` (локальный workerd, без обращения к Cloudflare-аккаунту).
   - `EXPOSE 8080`, `CMD ["npx", "wrangler", "dev", "--ip", "0.0.0.0", "--port", "8080", "--local"]`.

2. **`.dockerignore`** — исключаем `node_modules`, `.git`, `dist`, `.output`, `.wrangler`, `.lovable`, `*.md`, чтобы образ был компактным и сборка быстрой.

## Использование

```bash
docker build -t sales-navigator .
docker run --rm -p 8080:8080 sales-navigator
# открыть http://localhost:8080
```

## Важные замечания (для демо)

- Контейнер использует **workerd через wrangler**, потому что приложение собрано под Cloudflare Workers. Это полноценный SSR — серверные функции и роуты работают так же, как в продакшене на `*.lovable.app`.
- Образ не требует Cloudflare-аккаунта или токена — флаг `--local` запускает рантайм полностью на машине.
- Для прод-деплоя на собственный сервер (вместо Cloudflare) понадобится отдельная переработка под Node-адаптер — это вне рамок текущей задачи.

## Файлы

- `Dockerfile` — новый
- `.dockerignore` — новый

Никаких изменений в исходниках, конфигах сборки или `wrangler.jsonc` не требуется.
