FROM node:21

WORKDIR /code

COPY . /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm install
RUN npm install -g nodemon
RUN npm install express

EXPOSE 3333

# CMD ["node", "index.js"] for deploy
CMD [ "npm", "run", "dev" ]
