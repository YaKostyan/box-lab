FROM node:24-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8787
ENV DATABASE_PATH=/app/data/toffipacks.sqlite

COPY server ./server
COPY src/data.ts ./src/data.ts

RUN mkdir -p /app/data && chown -R node:node /app
USER node

VOLUME ["/app/data"]
EXPOSE 8787

CMD ["node", "server/index.mjs"]

