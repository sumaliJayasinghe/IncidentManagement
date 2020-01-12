FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# Copy app source code
COPY . .

EXPOSE 8000

# You can change this
CMD [ "npm", "start" ]