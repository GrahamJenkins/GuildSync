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

# Generate Prisma client
RUN npx prisma generate

# Build the project (compile TypeScript)
RUN yarn build

# Expose any ports if needed (Discord bot typically does not expose ports)
# EXPOSE 3000

# Entrypoint to run the bot
CMD ["node", "dist/index.js"]