
ARG NODE_VERSION=22.13.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV=production


WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

COPY . .

RUN npx prisma generate && npm run build

EXPOSE 8000

CMD ["npm", "run", "start"]
