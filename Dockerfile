FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

RUN apk add --no-cache postgresql-client curl

COPY . .

RUN yarn build

EXPOSE 8080
CMD ["yarn", "start"]
