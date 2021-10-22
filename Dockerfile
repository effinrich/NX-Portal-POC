
# Use below nginx version
FROM nginx:1.15.2-alpine

# Copy the build folder of the react app
COPY ./dist/apps/portal /var/www

# Copy the ngnix configrations
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose it on port 8080:80
EXPOSE 8080:80

ENTRYPOINT ["nginx","-g","daemon off;"]
