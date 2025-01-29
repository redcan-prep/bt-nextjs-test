# ------------------------------------------------------
# 1) Build stage
# ------------------------------------------------------
    FROM node:18-alpine AS builder

    WORKDIR /app
    
    # Copy only package.json and package-lock.json (or yarn.lock) first
    COPY package*.json ./
    
    # Install dependencies (you need dev dependencies here to build)
    RUN npm install
    
    # Now copy all source code
    COPY . .
    
    # Build the Next.js project (includes TypeScript compilation)
    RUN npm run build
    
    # ------------------------------------------------------
    # 2) Production stage
    # ------------------------------------------------------
    FROM node:18-alpine AS runner
    
    WORKDIR /app
    
    # Copy necessary files from builder
    COPY --from=builder /app/.next/ ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/next.config.js ./
    # (Optional) If you have custom server code, copy it similarly.
    
    # Expose the port where Next.js will run
    EXPOSE 80
    
    # Set NODE_ENV to production
    ENV NODE_ENV production
    
    # Start the app
    CMD ["npm", "run", "start"]