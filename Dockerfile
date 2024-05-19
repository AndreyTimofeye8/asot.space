# базовый образ Node.js
FROM node:20 AS dev

# рабочая директория в контейнере
WORKDIR /app

# копируем package-lock и package
COPY package*.json ./

# устанавливаем зависимости
RUN npm i

# копируем остальную часть
COPY . .

# сборка проекта
RUN npm run build

# порт приложения
EXPOSE 3000

# запуск приложения в режиме разработки
CMD ["npm", "run", "start:dev"]