# pull official base image
FROM node:15-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn
RUN yarn add react-scripts@4.0.3 -g

# add app
COPY . ./

# start app
CMD ["yarn", "start"]


# FROM node:15-alpine as builder

# # set some ENV vars
# ENV HOME /root
# ENV TERM=xterm-256color
# ENV PROJECT_ROOT /opt/app

# WORKDIR $PROJECT_ROOT


# RUN npm install -g nx

# # use changes to package.json to force Docker not to use the cache
# # when we change our application's nodejs dependencies:
# COPY package.json yarn.lock $PROJECT_ROOT/
# # RUN NODE_ENV=development yarn --pure-lockfile
# RUN yarn --pure-lockfile

# # Copy working files
# COPY . $PROJECT_ROOT/

# # Build App
# RUN yarn build && yarn build-storybook

# EXPOSE 3000

# CMD ["yarn", "start"]
