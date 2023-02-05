# syntax=docker/dockerfile:1.4

# Create image based on the official Node image from dockerhub
FROM node:lts-buster AS development

# Create app directory
WORKDIR /usr/src/app

# Get all the code needed to run the app
COPY . /usr/src/app

# Install dependecies
RUN npm install
RUN npm run build

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npx", "serve", "-s", "build"]