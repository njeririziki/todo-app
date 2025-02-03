FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Step 2: Use Nginx to serve the built files
FROM nginx:alpine
# Copy the built frontend files from the build step to Nginx's default directory
COPY --from=build /app/dist /var/www/html
# Expose port 80 (default for Nginx)
EXPOSE 80
# Start Nginx to serve the frontend
CMD ["nginx", "-g", "daemon off;"]