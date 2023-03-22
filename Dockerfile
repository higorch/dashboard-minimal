FROM higorch/env-webpack-frontend

WORKDIR /var/www/html/dashboard-minimal

COPY . .

RUN groupadd -g 1000 appgroup && useradd -u 1000 -ms /bin/bash -g appgroup appuser

RUN usermod -u 1000 appuser && groupmod -g 1000 appgroup && chown -R appuser:appgroup /var/www/html

EXPOSE 3000

USER appuser

CMD ["nginx" "-g" "daemon off;"]