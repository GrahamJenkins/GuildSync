# Use official Node.js 20 LTS image as base
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package.json and yarn.lock for dependency caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Create data and db directories
RUN mkdir -p /app/data /app/db

# Copy .env.sample to /app/data/.env if .env does not exist
RUN if [ ! -f /app/data/.env ]; then cp /app/.env.sample /app/data/.env; fi

# Build the project (compile TypeScript)
RUN yarn build

# Expose any ports if needed (Discord bot typically does not expose ports)
# EXPOSE 3000

# Entrypoint to run the bot
CMD ["node", "dist/index.js"]