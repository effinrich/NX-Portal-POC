# FROM node:14-alpine AS build-env

# Install http apt transport (for yarn)
# RUN apt-get update \
# && apt-get install -qqy apt-transport-https

# Add the yarn repo
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.# list

# WORKDIR /app

# COPY package.json yarn.lock ./
# RUN yarn
# # RUN yarn test
# RUN yarn build
# COPY . ./

# # FROM nginx:stable-alpine
# COPY --from=build-env /app/dist/apps/portal /usr/share/nginx/html

# EXPOSE 8080:80

# # CMD ["nginx","-g","daemon off;"]
# CMD ["nginx","-g","daemon off;"]

# pull official base image
FROM node:14-alpine

RUN apk add --no-cache python g++ make

# set working directory
WORKDIR /app

RUN apk --no-cache --virtual build-dependencies add \
  python \
  make \
  g++

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# add app
COPY . ./

# start app
CMD ["yarn", "start"]
