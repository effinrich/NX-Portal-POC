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
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose it on port 8080
EXPOSE 8080

ENTRYPOINT ["nginx","-g","daemon off;"]
