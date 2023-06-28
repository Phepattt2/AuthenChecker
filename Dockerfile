FROM node:18 
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run build 
EXPOSE 9000
CMD [ "npm" , "run", "start" ]