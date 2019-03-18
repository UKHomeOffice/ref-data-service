FROM node:10-alpine as builder

RUN apk update && apk upgrade

RUN mkdir -p /src
WORKDIR /src

COPY package.json .
RUN npm install
COPY . /src

RUN npm run build

# Now build the final image based on Nginx

FROM nginx:1.15.9-alpine

COPY --from=builder /src/dist/ /usr/share/nginx/html
COPY /index.html /usr/share/nginx/html/index.html
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
