# Frontend and Reverse proxy
# Setting up the base image
FROM ubuntu:24.04

# Update + Upgrade and nginx installation
RUN apt-get update && apt-get upgrade && apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy your frontend files
COPY . /var/www/html

# Copy the nginx configratoin
COPY nginx.conf /etc/nginx/nginx.conf

# Expose PORT 80
EXPOSE 80

CMD ["nginx" , "-g" , "daemon off;"]