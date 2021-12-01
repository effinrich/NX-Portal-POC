# ---------- Base ----------
FROM node:14-alpine AS base

RUN apk add --no-cache python3 make g++

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# ---------- Builder ----------
# Creates:
# - node_modules: production dependencies (no dev dependencies)
# - dist: A production build compiled with Babel
FROM base AS builder

COPY package.json yarn.lock prepare.js ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn lint portal
RUN yarn format portal
RUN yarn test:noWatch

RUN yarn build

# ---------- Pre-release ----------
FROM base AS preRelease

# clean all depencies
RUN rm -rf node_modules
RUN yarn cache clean

# ---------- Release ----------
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf *

# Copy static assets from builder stage
COPY --from=builder /app/dist/apps/portal .

EXPOSE 80

# Entry point when Docker container has started
ENTRYPOINT ["nginx", "-g", "daemon off;"]
