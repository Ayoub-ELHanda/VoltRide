# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the backend directory to the container
COPY backend/package.json ./
# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY backend/ ./

# Build the TypeScript application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
