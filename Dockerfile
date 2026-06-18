# ---- Build stage ---------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

# Install deps first (layer cache)
COPY package*.json ./
RUN npm ci

# Build the static site
COPY . .
RUN npm run build

# ---- Serve stage ---------------------------------------------------
FROM nginx:1.27-alpine AS serve

# SPA-aware config with security headers + asset caching
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
