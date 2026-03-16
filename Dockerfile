FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g ts-node typescript
COPY . .

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=admin

CMD ["ts-node", "src/app.ts"]
