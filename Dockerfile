FROM node:lts-alpine
RUN mkdir /home/application
WORKDIR /home/application
COPY package*.json ./
COPY . .
RUN yarn install
EXPOSE 3000
ENTRYPOINT [ "yarn", "start" ]