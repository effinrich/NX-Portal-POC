# FROM nginx:stable-alpine

# RUN apk --no-cache add nodejs yarn \
#         --repository=http:#dl-cdn.alpinelinux.org/alpine/edge/community

# # Fix this
# COPY . .

# RUN yarn install

# RUN yarn test

# RUN yarn build

# EXPOSE 8080:80

# ENTRYPOINT ["nginx","-g","daemon off;"]


FROM node:14 as build-deps

# Install http apt transport (for yarn)
# RUN apt-get update \
# && apt-get install -qqy apt-transport-https

# Add the yarn repo
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.# list

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY . ./
RUN yarn
# RUN yarn test
RUN yarn build

# FROM nginx:stable-alpine
# COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html
EXPOSE 8080:80

# CMD ["nginx","-g","daemon off;"]
ENTRYPOINT ["nginx","-g","daemon off;"]
