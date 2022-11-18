FROM node:16-alpine as build
WORKDIR /frontend
COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]