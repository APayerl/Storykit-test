FROM node:latest as build
WORKDIR /usr/local/app
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY angular.json ./
COPY src ./src
RUN npm ci
RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist/frontend /usr/share/nginx/html
EXPOSE 80