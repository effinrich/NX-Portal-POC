#build environment
FROM node:14-alpine as build

RUN apk add --no-cache python g++ make

WORKDIR /app

RUN apk --no-cache --virtual build-dependencies add \
  python \
  make \
  g++

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/.htpasswd /usr/share/nginx/.htpasswd
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/apps/portal /usr/share/nginx/html

EXPOSE 8080:80

CMD ["nginx", "-g", "daemon off;"]
