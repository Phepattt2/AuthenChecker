FROM node:18 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY tsconfig.json ./
RUN npm install

COPY . /usr/src/app

RUN npm run build 
EXPOSE 9000
CMD [ "npm" , "run", "start:prod" ]