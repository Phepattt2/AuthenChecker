FROM node:18-slim
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . .
RUN npm run build 
EXPOSE 2122
CMD [ "npm" , "run", "start" ]