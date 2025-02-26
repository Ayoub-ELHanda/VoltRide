# Use Node.js as the base image
FROM node:18-alpine

# Install bash
RUN apk add --no-cache bash

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the backend directory to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and .env file
COPY prisma ./prisma
COPY .env .env
COPY wait-for-it.sh ./wait-for-it.sh

# Copy the rest of the backend source code
COPY . .

# Make wait-for-it.sh executable
RUN chmod +x wait-for-it.sh

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
