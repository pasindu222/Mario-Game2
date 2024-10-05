# Use an official Node runtime as the parent image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the local app files to the container's working directory
COPY . .

# Install the app dependencies
RUN npm install --legacy-peer-deps

# Expose the port on which the app runs
EXPOSE 3008

# Command to run the app
CMD ["npm", "start"]
