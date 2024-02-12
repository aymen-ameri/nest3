# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# The app binds to port 3002. Expose it to the Docker daemon.
EXPOSE 3002

# Command to start the application
CMD ["npm", "run", "start:dev"]
