# --------------------------------------------
# 1) Build Stage
# --------------------------------------------
    FROM node:18-alpine AS builder

    # Make sure corepack is enabled for pnpm (or install pnpm globally)
    RUN corepack enable
    
    WORKDIR /app
    
    # Copy only package files first (for caching)
    COPY package.json pnpm-lock.yaml ./
    
    # Install dependencies (including dev deps for building)
    RUN pnpm install
    
    # Copy source code
    COPY . .
    
    # Build the Next.js standalone application
    RUN pnpm build
    
    # Prune devDependencies (optional if using the standalone approach)
    # RUN pnpm prune --prod
    
    
    # --------------------------------------------
    # 2) Production Stage
    # --------------------------------------------
    FROM node:18-alpine AS runner
    
    # Minimal environment variable
    ENV NODE_ENV=production
    
    WORKDIR /app
    
    # (Optional) If you need pnpm in the final image:
    # RUN corepack enable
    
    # Copy the "standalone" output plus the "static" files from builder
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    COPY --from=builder /app/public ./public
    
    # If you didn’t prune dev deps above, no worries—standalone includes only required modules in .next/standalone/node_modules
    
    EXPOSE 3000
    
    # Start the Next.js server from the compiled standalone app
    CMD ["node", "server.js"]