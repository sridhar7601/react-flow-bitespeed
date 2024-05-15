FROM node:18-alpine
WORKDIR /app
COPY package*.json ./

# Install dependencies and copy
RUN npm install
COPY . .

# Build the React app and expose
RUN npm run build
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]