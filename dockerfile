# FROM node:18

# WORKDIR /back-70210

# COPY package*.json ./
# #COPY package.json package-lock.json ./

# RUN npm install

# COPY . .

# EXPOSE 8080

# CMD ["npm", "start"]

# Imagen base más liviana
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /back-70210

# Copiar package.json y package-lock.json antes de instalar dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --only=production

# Copiar el resto del código
COPY . .

# Exponer el puerto 8080
EXPOSE 8080

# Comando de inicio
CMD ["npm", "start"]
