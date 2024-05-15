# Use the official Node.js 18 image
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci

COPY . .

EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]
