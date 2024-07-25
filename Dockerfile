#import node image
FROM node:14-alpine

#set working directory in the container
WORKDIR /app

#copy package.json file
COPY package*json ./

#install dependency
RUN npm install

#copy the entire project
COPY . .

#expose on port
EXPOSE 4000

#command to run the application
CMD [ "node","server.js" ]