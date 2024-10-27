FROM php:7.4-fpm

# Set the working directory to a Linux-style path
WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Copy project files into the container
COPY . .

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install PHP dependencies
RUN composer install

# Expose the port
EXPOSE 9000

# Start the PHP FastCGI Process Manager
CMD ["php-fpm"]
