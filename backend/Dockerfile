FROM node:latest
WORKDIR /usr/local/app
COPY package*.json ./
COPY . .
RUN npm ci --only=production
RUN npm run build
CMD [ "node", "build/main.js" ]