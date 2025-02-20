
FROM node:18 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=production
COPY . .

FROM node:18-slim
WORKDIR /app
COPY --from=builder /app /app
CMD ["node", "index.js"]
