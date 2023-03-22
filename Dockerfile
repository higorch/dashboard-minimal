FROM higorch/env-webpack-frontend

WORKDIR /var/www/html/dashboard-minimal

COPY package.json .

RUN npm install
RUN npm install --save-dev webpack webpack-cli
RUN npm install -g npx

COPY . .

COPY .docker/nginx/nginx.conf /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]