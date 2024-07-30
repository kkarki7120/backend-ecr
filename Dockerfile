#import node image
FROM node:14-alpine

# Define build-time argument
ARG PORT

# Set environment variable for the container
ENV PORT=${PORT}

#set working directory in the container
WORKDIR /app

#copy package.json file
COPY package*json ./

#install dependency
RUN npm install

#copy the entire project
COPY . .


#command to run the application
CMD [ "node","server.js" ]