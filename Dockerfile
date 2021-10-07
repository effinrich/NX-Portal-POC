#
# Step 0: Base
#
FROM node:14.15.4-buster-slim as base

RUN apt-get update && apt-get install --no-install-recommends --yes openssl

ENV TZ=America/Los_Angeles
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /apps

#
# Step 1: Builder
#
FROM base as builder

COPY package.json tsconfig*.json yarn.lock nx.json workspace.json ./
COPY apps/portal ./apps/portal

RUN yarn install --pure-lockfile

COPY libs ./libs

RUN yarn nx build portal --prod

#
# Step 2: Runner
#
FROM base as runner

COPY --from=builder /apps/portal/ ./dist
COPY --from=builder /node_modules ./node_modules

EXPOSE 4000

CMD [ "node", "dist/main" ]


# # pull official base image
# FROM node:15-alpine

# # set working directory
# WORKDIR /apps

# # add `/apps/node_modules/.bin` to $PATH
# ENV PATH /apps/node_modules/.bin:$PATH

# # install apps dependencies
# COPY package.json ./
# COPY yarn.lock ./
# RUN yarn
# # RUN yarn add react-scripts@4.0.3 -g

# # add apps
# COPY . ./

# # start apps
# CMD ["yarn", "start"]





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
