# Base Image 
FROM node:24.14.0

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

# Start the server
CMD ["node" , "index.js"]