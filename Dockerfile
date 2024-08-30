FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm run build

CMD ["npx", "serve", "-s", "build"]

EXPOSE 5174