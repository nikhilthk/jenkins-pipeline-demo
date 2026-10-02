FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
ARG BUILD_NUMBER=local
ENV BUILD_NUMBER=$BUILD_NUMBER
EXPOSE 3000
CMD ["npm", "start"]
