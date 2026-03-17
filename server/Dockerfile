# Backend and API Server
# Base Image 
FROM node:22

# Setup the workdir
WORKDIR /app

# Install pnpm via nom globally
RUN npm install -g pnpm

# Copy the package.json, package-lock.json and the pnpm-lock.yaml file here
COPY package.json package-lock.json pnpm-lock.yaml ./

# Install the remaining dependencies
RUN pnpm install

# Copy all other thigns 
COPY . .

# Expose the port
EXPOSE 5000 

# Start the server
CMD ["node" , "index.js"]