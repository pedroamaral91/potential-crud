FROM node:lts-alpine
RUN mkdir /home/application
WORKDIR /home/application
COPY package*.json ./
COPY . .
RUN yarn bootstrap
RUN yarn api:build
EXPOSE 3000
ENTRYPOINT [ "yarn", "start" ]