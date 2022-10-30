FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# RUN npm ci --only=production
EXPOSE 3000
COPY . .
CMD [ "npm", "run", "start" ]
