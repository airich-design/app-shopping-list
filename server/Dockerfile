FROM node:20-alpine

WORKDIR /app

# Copy root tsconfig.json
COPY tsconfig.json .

# Copy and build shared module first
COPY shared /app/shared/
WORKDIR /app/shared
COPY shared/package*.json ./
RUN npm install
COPY shared/src ./src
COPY shared/tsconfig.json .
RUN npm run build
RUN npm link

# Set up server
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
RUN npm link @shopping-list/shared

# Copy server source code
COPY server/src ./src
COPY server/tsconfig.json .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"] 