FROM node:lts-alpine
RUN mkdir /home/application
WORKDIR /home/application
COPY package*.json ./
COPY . .
RUN yarn bootstrap
EXPOSE 3000
ENTRYPOINT [ "yarn", "start" ]