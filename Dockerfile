FROM node:22-slim AS build

WORKDIR /app
    
# Install only prod deps for caching
COPY package*.json .
RUN npm install
    
# Copy the rest of the app
COPY . .
    
EXPOSE 3000
CMD ["node", "app.js"]
    