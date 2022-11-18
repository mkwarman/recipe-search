FROM node:16-buster
RUN apt-get install libcurl4
WORKDIR /backend

# Setup mongodb 6.0.3 binary so mongodb-memory-server doesn't try to download it every time
RUN wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-debian10-6.0.3.tgz && tar -xzf mongodb-linux-x86_64-debian10-6.0.3.tgz
RUN mv mongodb-linux-x86_64-debian10-6.0.3 mongodb
ENV MONGOMS_SYSTEM_BINARY=/backend/mongodb/bin/mongod

COPY package.json tsconfig.json /backend/
RUN yarn install

COPY --chown=node:node . /backend/
RUN yarn build

USER node
EXPOSE 4000
ENTRYPOINT ["node", "dist/index.js"]