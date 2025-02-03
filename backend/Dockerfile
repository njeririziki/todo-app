# Use Node 20 image as a build stage
FROM node:20 AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy backend files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build application
RUN npm run build

# Final production image
FROM node:20 AS production

WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

# Expose application port
EXPOSE 1337

# Run Prisma migrations at runtime
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]