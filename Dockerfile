FROM node:8.15.0-alpine
RUN mkdir -p /ui
WORKDIR /ui
COPY . /ui/
RUN yarn --pure-lockfile
EXPOSE 3000
CMD yarn start
