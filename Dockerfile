FROM node:14-alpine


#set working directory inside the contianer
WORKDIR /app

#copy package.json and install dependencies
COPY package*.json ./
RUN npm install

#compy the rest of the app code
COPY . .

#build the react app 
RUN npm run build

#expose the port the app runs on
EXPOSE 3000

#start the app
CMD ["npm", "start"]