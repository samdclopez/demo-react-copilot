# ---------- Build Stage ----------
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- Server Stage ----------
FROM nginx:stable-alpine
# Copy built files to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Add custom nginx.conf if you need specific routing or MIME type fixes
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# FROM node:20-alpine

# WORKDIR /app

# COPY package.json .

# RUN npm install

# RUN npm i -g serve

# COPY . .

# RUN npm run build

# EXPOSE 3001

# CMD ["serve", "-s", "dist", "-l", "3001"]