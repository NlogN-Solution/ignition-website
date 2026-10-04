# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1

# ── deps ─────────────────────────────────────────────────────────
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── build ────────────────────────────────────────────────────────
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# .env.production (written by CI) supplies the NEXT_PUBLIC_* values.
# The build fetches the catalogue from NEXT_PUBLIC_API_BASE_URL, so the API
# must be live when this runs; if it isn't, the build silently uses data/.
RUN npm run build

# ── runtime ──────────────────────────────────────────────────────
FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
# owned by "node" so ISR and image optimisation can write under .next/
COPY --from=build --chown=node:node /app/public ./public
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
