# Build from the repo root: docker build -f apps/api/Dockerfile .
FROM node:24-slim AS build
RUN npm install -g pnpm@12.14.0
WORKDIR /repo
COPY . .
RUN pnpm install --frozen-lockfile --filter api... \
  && pnpm --filter @app/shared build \
  && pnpm --filter api build \
  && pnpm --filter api deploy --prod /app

FROM node:24-slim
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app .
USER node
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/main.js"]
