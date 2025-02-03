# Use Node 20 image
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Run Prisma migration
#RUN npx prisma migrate dev --name init

RUN npm run build

# Expose port (the backend service will run on this port)
EXPOSE 1337

# Command to start the backend server
CMD ["npm", "run", "start"]



