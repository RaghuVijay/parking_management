# Use Node.js with Alpine (lightweight)
FROM node:23-alpine

# Install dependencies required for Puppeteer & Chromium
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    udev \
    font-noto-emoji \
    mesa-dri-gallium \
    mesa-egl \
    mesa-gl \
    mesa-glapi \
    && rm -rf /var/cache/apk/*

# Set Puppeteer to use the installed Chromium binary
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Increase Puppeteer timeout to prevent "Network.enable timed out" errors
ENV PUPPETEER_TIMEOUT=120000

# Ensure Puppeteer runs with proper flags
ENV PUPPETEER_ARGS="--no-sandbox --disable-setuid-sandbox --disable-gpu --disable-dev-shm-usage"

# Set the working directory in the container
WORKDIR /services

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package*.json ./

# Install dependencies (skip devDependencies for production)
RUN npm install --omit=dev --legacy-peer-deps

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN npm run build

# Expose the application port (make sure your app runs on port 3002 or change if needed)
EXPOSE 3002

# Start the application with Puppeteer flags for memory management
CMD ["sh", "-c", "NODE_OPTIONS=--max-old-space-size=2048 npm run start:prod"]