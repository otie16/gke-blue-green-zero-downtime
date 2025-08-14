# ---- Base (build dependencies not needed for prod here, but keep clean stages) ----
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production
COPY app/package*.json ./
RUN npm ci --omit=dev
COPY app/. .

# ---- Runtime (small, non-root) ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
# Create non-root user
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
COPY --from=base /app /app
USER nodejs
EXPOSE 8080
CMD ["node", "server.js"]

