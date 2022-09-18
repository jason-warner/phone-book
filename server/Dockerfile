FROM node:18

WORKDIR /usr/gql-server

COPY package.json yarn.lock ./

COPY . .

RUN cd /usr/gql-server \
    && yarn install --pure-lockfile

RUN yarn build

EXPOSE 4000

ENV MONGO_PHONE_USER='MONGO_PHONE_USER'
ENV MONGO_PHONE_PASS='3#SomePassword#3'

CMD ["yarn", "start"]