FROM node:18

WORKDIR /back-70210

COPY package*.json ./
#COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]