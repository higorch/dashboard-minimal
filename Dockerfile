FROM higorch/env-webpack-frontend

WORKDIR /var/www/html/dashboard-minimal

COPY package.json .
RUN npm install

COPY . .

COPY .docker/nginx/nginx.conf /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]