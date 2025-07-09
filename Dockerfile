# Use the same Node version as your local development
FROM node:18-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

CMD ["npm", "run", "preview"]

# Final stage, serve the compiled application
FROM nginx:alpine

# Copy files from the build stage to the web server's working directory
COPY --from=builder /app/dist /usr/share/nginx/html/

# Expose port 80 for the web server
EXPOSE 80

# Command to start the web server
CMD ["nginx", "-g", "daemon off;"]