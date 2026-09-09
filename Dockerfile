# ci-demo 容器镜像：多阶段构建
# 阶段一在镜像内执行与本地一致的构建契约，阶段二只保留产物与静态服务器

# ===== 阶段一：构建 =====
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ===== 阶段二：运行时 =====
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=build /app/dist ./dist
COPY server.mjs ./
EXPOSE 3000
USER node
CMD ["node", "server.mjs"]