# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the entire frontend app
COPY . .

# Build the React app
RUN npm run build

# Expose React’s default port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]