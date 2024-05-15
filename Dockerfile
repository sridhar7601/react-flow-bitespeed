FROM node:18-alpine
WORKDIR /app
COPY package*.json ./

# Install dependencies and copy
RUN npm ci
COPY . .

# Build the React app and expose
RUN npm run build
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]