FROM node:15-alpine as builder

# set some ENV vars
ENV HOME /root
# ENV TERM dumb
ENV TERM=xterm-256color
ENV PROJECT_ROOT /opt/app

WORKDIR $PROJECT_ROOT

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json yarn.lock $PROJECT_ROOT/
# RUN NODE_ENV=development yarn --pure-lockfile
RUN yarn --pure-lockfile

# Copy working files
COPY . $PROJECT_ROOT/

# Build App
RUN yarn build

# Build Storybook
# RUN yarn build-storybook

# RUN yarn global add nodemon@1.19.2

# WORKDIR /usr/app/client

# COPY package.json ./
# RUN yarn

# COPY . .
# EXPOSE 3000

# ENTRYPOINT [". ."]

CMD yarn build-storybook

# FROM node:10-stretch-slim

# RUN curl -o- -L https://yarnpkg.com/install.sh | \  bash -s -- --version 1.22.10
# RUN yarn global add nodemon@1.19.2

# RUN mkdir -p /usr/app/client

# ADD .yarn_cache /usr/local/share/.cache/yarn/v1/

# ADD ./package.json ./yarn.* /tmp/
# RUN cd /tmp && yarn
# RUN cd /usr/app/client && ln -s /tmp/node_modules

# ADD . /usr/app/client

# EXPOSE 3000

# WORKDIR /usr/app/client
