# could use smaller image like alpine but giving me an error with tailwind :(
FROM node:18 

WORKDIR /app

COPY package.json .
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]