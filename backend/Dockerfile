FROM node:18-alpine

# Install bash for wait-for-it script
RUN apk add --no-cache bash

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npm run prisma:generate:postgres

# Build the application
RUN npm run build

# Make wait-for-it.sh executable
RUN chmod +x wait-for-it.sh

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
