# syntax=docker/dockerfile:1.7

# --- deps: install all dependencies (including dev) for the build ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* bun.lockb* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# --- build: produce the Cloudflare Worker bundle via Vite ---
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- runtime: serve the built worker locally via wrangler (workerd) ---
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copy the built app and node_modules (wrangler is a devDependency transitive via @cloudflare/vite-plugin,
# so we keep node_modules from the build stage to avoid reinstalling).
COPY --from=build /app ./

EXPOSE 8080

# `wrangler dev` runs the same workerd runtime used in production, fully local (no Cloudflare account needed).
CMD ["npx", "wrangler", "dev", "--ip", "0.0.0.0", "--port", "8080", "--local"]
