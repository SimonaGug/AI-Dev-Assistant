FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn prisma generate

CMD ["yarn", "dev"]
CMD ["sh", "-c", "yarn prisma migrate deploy && yarn dev"]


EXPOSE 4000
