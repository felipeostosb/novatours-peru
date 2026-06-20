# Etapa 1: Compilar SCSS
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Esto generará el archivo main.css comprimido
RUN npm run build

# Etapa 2: Servidor Web
FROM nginx:alpine
# Copiar el archivo de configuración dinámico de Nginx para usar $PORT
COPY default.conf.template /etc/nginx/templates/default.conf.template
# Copiar todo el proyecto estático (y el CSS ya compilado) al directorio de Nginx
COPY --from=builder /app /usr/share/nginx/html
# Variables de entorno por defecto
ENV PORT=8080
EXPOSE 8080
