# Use below nginx version - we want stable channel, which is 1.20 as of Oct 21, 2021
FROM nginx:stable-alpine

RUN apk --no-cache add nodejs yarn \
        --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

# Fix this
COPY . .

RUN yarn install

RUN yarn test

RUN yarn build


# Copy the build folder of the react app
#COPY dist/apps/portal /var/www

# Copy the ngnix configrations
#COPY nginx.conf /etc/nginx/nginx.conf

# Expose it on port 8080:80
EXPOSE 8080:80

ENTRYPOINT ["nginx","-g","daemon off;"]
