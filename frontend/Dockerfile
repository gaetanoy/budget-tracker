FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock ./
COPY . .
RUN yarn install

ENV VITE_FASTAPI_URL=/api

RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Ajouter un script d'injection de config
RUN echo '#!/bin/sh' > /docker-entrypoint.d/50-inject-config.sh && \
    echo 'if [ -f /usr/share/nginx/html/config.js ]; then' >> /docker-entrypoint.d/50-inject-config.sh && \
    echo '  cp /usr/share/nginx/html/config.js /usr/share/nginx/html/assets/' >> /docker-entrypoint.d/50-inject-config.sh && \
    echo 'fi' >> /docker-entrypoint.d/50-inject-config.sh && \
    chmod +x /docker-entrypoint.d/50-inject-config.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]