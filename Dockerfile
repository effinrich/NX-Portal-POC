# FROM node:14-alpine
# ENV NODE_ENV=production

# RUN yarn add -g nx

# WORKDIR /usr/src/app

# COPY ["package.json", "yarn.lock", "./"]
# RUN yarn build
# RUN yarn --production --silent && mv node_modules ../
# COPY . .

# EXPOSE 4200
# EXPOSE 8080

# RUN chown -R node /usr/src/app

# USER node
# CMD ["yarn", "start"]

# FROM node:15-alpine

# # set some ENV vars
# # ENV PROJECT_ROOT /opt/app

# WORKDIR /app

# RUN npm install -g nx

# # use changes to package.json to force Docker not to use the cache
# # when we change our application's nodejs dependencies:
# # COPY package.json yarn.lock $PROJECT_ROOT/
# COPY package.json yarn.lock ./
# RUN yarn install --production

# # Build App
# RUN yarn build

# # Copy working files
# COPY ./dist/ ./

# EXPOSE 4200
# EXPOSE 8080

# CMD ["yarn", "start"]

# FROM node:14-alpine as build

# COPY . .

# RUN yarn install

# RUN yarn nx build portal --prod

# FROM nginx:1.19.9-alpine

# COPY --from=build /dist/apps/portal/ /usr/share/nginx/html/

# CMD [ "node", "dist/apps/portal/main.js" ]

# --- -base- ---
# FROM node:14-alpine as build

# COPY . .

# RUN yarn global add nx

# RUN yarn install

# RUN yarn nx build portal --prod

# FROM nginx:1.19.9-alpine

# COPY --from=build /dist/apps/portal/ /usr/share/nginx/html/

# --- --- ---
# CMD ls -las /root/app && tail -f /dev/null

# Use below nginx version
FROM nginx:1.15.2-alpine

# Copy the build folder of the react app

COPY ./dist/apps/portal /var/www

# Copy the ngnix configrations
COPY ./apps/portal/nginx.conf /etc/nginx/nginx.conf

# Expose it on port 80
EXPOSE 8080

ENTRYPOINT ["nginx","-g","daemon off;"]

# build environment
# FROM node:14-alpine as react-build
# # WORKDIR /app
# COPY . ./
# RUN yarn global add nx
# RUN yarn
# RUN yarn nx build portal --prod

# # server environment
# FROM nginx:1.19.9-alpine
# COPY nginx.conf /etc/nginx/conf.d/configfile.template

# COPY --from=react-build /dist/apps/portal/ /usr/share/nginx/html/

# ENV PORT 8080
# ENV HOST 0.0.0.0
# EXPOSE 8080
# CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
