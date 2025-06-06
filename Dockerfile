# Use Node.js 20 for compatibility with NestJS 11
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy essential files first to optimize caching
COPY package.json package-lock.json ./

# Install all dependencies (including dev) to ensure Husky is available
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env and .env.development files
COPY .env .env.local ./

# Expose the API port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
