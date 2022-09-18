FROM node:18

WORKDIR /usr/gql-server

COPY package.json yarn.lock ./

COPY . .

RUN cd /usr/gql-server \
    && yarn install --pure-lockfile

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]