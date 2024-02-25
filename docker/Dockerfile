FROM node:21

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm install

COPY . /code

EXPOSE 3333

# CMD ["node", "index.js"] for deploy
CMD [ "npm", "run", "dev" ]
