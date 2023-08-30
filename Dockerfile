# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY . .

# Expose the port that the React application listens on
EXPOSE 3000

# Set the command to run when the container starts
CMD ["npm", "start"]
