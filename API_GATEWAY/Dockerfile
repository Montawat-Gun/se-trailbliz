# ---- Build Stage ----
# Base image for the build stage
FROM node:16 as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./
COPY yarn*.lock ./

# Install dependencies including Prisma CLI
RUN yarn install

# Copy Prisma schema and generate Prisma client
COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate

# Copy the application source code
COPY . .

# Build the application
RUN yarn build

# ---- Production Stage ----
# Base image for the production stage
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock for production dependencies
COPY package*.json ./
COPY yarn*.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3333

# Start the server using the production build
CMD ["node", "dist/main.js"]
