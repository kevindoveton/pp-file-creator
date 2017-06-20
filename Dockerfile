FROM library/nginx:latest

# set the working directory
ENV webDir /var/www/
WORKDIR ${webDir}

# add the config file
ADD site_nginx.conf /etc/nginx/conf.d/default.conf
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# add all the web files
COPY build ./

# expose ports
EXPOSE 443/tcp 80/tcp

# start the server
CMD nginx
