FROM node:21

COPY . /code

WORKDIR /code
RUN npm install

EXPOSE 3333

# for deploy
CMD ["npm", "run", "start"] 
# CMD [ "npm", "run", "dev" ]
