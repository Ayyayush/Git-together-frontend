# ==========================
# Stage 1 - Build React App
# ==========================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files first for Docker layer caching
COPY package*.json ./

# Install exact dependencies from package-lock.json
RUN npm ci

# Copy application source
COPY . .

# Vite environment variable must be available at build time
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build production React app
RUN npm run build


# ==========================
# Stage 2 - Production Server
# ==========================
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite production build
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom Nginx config for React SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]