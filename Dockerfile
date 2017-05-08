FROM node:6.10

ENV APP_DIR /usr/src/app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# set config
ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install -g nodemon webpack

COPY package.json ./
RUN npm install

COPY ./ ./

EXPOSE 3002

RUN npm run build

CMD ["./entrypoint.sh"]
