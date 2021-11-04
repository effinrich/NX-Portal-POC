#build environment
FROM node:14-alpine as build

RUN apk add --no-cache python g++ make

WORKDIR /app

# RUN apk --no-cache --virtual build-dependencies add \
#   python \
#   make \
#   g++

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./
RUN ["yarn", "lint"]
RUN ["yarn", "format"]
RUN ["yarn", "test"]
RUN yarn build

# production environment
FROM node:14-alpine

WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/
RUN yarn install --prod=true

CMD ["yarn", "start"]
