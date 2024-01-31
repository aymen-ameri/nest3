# Step 1: Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock if using yarn)
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the application
RUN npm run build

# Your app binds to port 3000, so use the EXPOSE instruction to have it mapped
EXPOSE 3002

# Define the command to run your app
CMD [ "node", "dist/main" ]
