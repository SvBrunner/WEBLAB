# ---------- build ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

RUN npx ng build --configuration production

RUN /bin/sh -lc '\
  set -eu; \
  mkdir -p /app/dist; \
  if ls -d dist/*/browser >/dev/null 2>&1; then \
    cp -R dist/*/browser/* /app/dist/; \
  else \
    cp -R dist/*/* /app/dist/ 2>/dev/null || cp -R dist/* /app/dist/; \
  fi \
'

# ---------- run ----------
FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/dist ./dist
RUN npm i -g http-server@14

# ▼▼ Add these lines ▼▼
# default (can override via docker compose)
ENV API_BASE_URL=http://localhost:3000/api/v1

# write env.js at container start, then launch server
COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080
CMD ["/entrypoint.sh"]
