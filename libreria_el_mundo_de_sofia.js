const sqlScript = `
CREATE TABLE `libros`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_detalles_libros_fk` BIGINT NOT NULL
);
CREATE TABLE `detalles_libros`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `editorial` VARCHAR(50) NOT NULL,
    `fecha_publicacion` DATE NOT NULL,
    `precio` ENUM('') NOT NULL DEFAULT '$0.00',
    `id_cantidad_stock_fk` VARCHAR(10) NOT NULL,
    `id_titulo_fk` BIGINT NOT NULL,
    `id_autor_fk` BIGINT NOT NULL,
    `id_ISBN_fk` BIGINT NOT NULL COMMENT 'Unicamente digitos numericos',
    `id_categoria_fk` BIGINT NOT NULL
);
CREATE TABLE `autor`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(20) NOT NULL,
    `fecha_nacimiento` DATE NOT NULL,
    `nacionalidad` VARCHAR(20) NOT NULL
);
CREATE TABLE `busqueda`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_autor_fk` BIGINT NOT NULL,
    `id_titulo_fk` BIGINT NOT NULL,
    `id_ISBN_fk` BIGINT NOT NULL,
    `id_categoria_fk` BIGINT NOT NULL
);
CREATE TABLE `titulo`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `titulo_libro` BIGINT NOT NULL
);
CREATE TABLE `ISBN`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `unico_ISBN` VARCHAR(13) NOT NULL
);
ALTER TABLE
    `ISBN` ADD UNIQUE `isbn_unico_isbn_unique`(`unico_ISBN`);
CREATE TABLE `categoria`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `categoria_libro` VARCHAR(30) NOT NULL COMMENT 'romance,ciencia ficcion,terror,aventura,etc...'
);
CREATE TABLE `clientes`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(30) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `telefono` CHAR(15) NOT NULL DEFAULT '+57',
    `direccion` VARCHAR(30) NOT NULL,
    `id_pedidos_realizados` CHAR(10) NOT NULL,
    `id_busqueda_fk` BIGINT NOT NULL
);
ALTER TABLE
    `clientes` ADD UNIQUE `clientes_email_unique`(`email`);
ALTER TABLE
    `clientes` ADD UNIQUE `clientes_telefono_unique`(`telefono`);
CREATE TABLE `pedidos`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `fecha_pedido` DATETIME NOT NULL,
    `estado_pedido` ENUM(
        'pendiente',
        'procesado',
        'completado'
    ) NOT NULL,
    `id_libros_fk` BIGINT NOT NULL,
    `id_cliente_fk` BIGINT NOT NULL,
    `id_transacciones_fk` BIGINT NOT NULL
);
CREATE TABLE `transacciones`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `medio_pago` ENUM('tarjeta credito', 'Paypal', 'etc.') NOT NULL DEFAULT 'Tarjeta VISA',
    `total_pago` DECIMAL(7, 2) NOT NULL,
    `fecha_transaccion` DATETIME NOT NULL
);
CREATE TABLE `cantidad_stock`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stock_actualizable` BIGINT NOT NULL AUTO_INCREMENT,
    `id_libros_fk` BIGINT NOT NULL,
    `id_pedidos_fk` BIGINT NOT NULL
);
ALTER TABLE
    `busqueda` ADD CONSTRAINT `busqueda_id_autor_fk_foreign` FOREIGN KEY(`id_autor_fk`) REFERENCES `autor`(`id`);
ALTER TABLE
    `detalles_libros` ADD CONSTRAINT `detalles_libros_id_autor_fk_foreign` FOREIGN KEY(`id_autor_fk`) REFERENCES `autor`(`id`);
ALTER TABLE
    `detalles_libros` ADD CONSTRAINT `detalles_libros_id_titulo_fk_foreign` FOREIGN KEY(`id_titulo_fk`) REFERENCES `titulo`(`id`);
ALTER TABLE
    `busqueda` ADD CONSTRAINT `busqueda_id_titulo_fk_foreign` FOREIGN KEY(`id_titulo_fk`) REFERENCES `titulo`(`id`);
ALTER TABLE
    `busqueda` ADD CONSTRAINT `busqueda_id_categoria_fk_foreign` FOREIGN KEY(`id_categoria_fk`) REFERENCES `categoria`(`id`);
ALTER TABLE
    `detalles_libros` ADD CONSTRAINT `detalles_libros_id_cantidad_stock_fk_foreign` FOREIGN KEY(`id_cantidad_stock_fk`) REFERENCES `cantidad_stock`(`id`);
ALTER TABLE
    `pedidos` ADD CONSTRAINT `pedidos_id_transacciones_fk_foreign` FOREIGN KEY(`id_transacciones_fk`) REFERENCES `transacciones`(`id`);
ALTER TABLE
    `detalles_libros` ADD CONSTRAINT `detalles_libros_id_categoria_fk_foreign` FOREIGN KEY(`id_categoria_fk`) REFERENCES `categoria`(`id`);
ALTER TABLE
    `detalles_libros` ADD CONSTRAINT `detalles_libros_id_isbn_fk_foreign` FOREIGN KEY(`id_ISBN_fk`) REFERENCES `ISBN`(`id`);
ALTER TABLE
    `libros` ADD CONSTRAINT `libros_id_detalles_libros_fk_foreign` FOREIGN KEY(`id_detalles_libros_fk`) REFERENCES `detalles_libros`(`id`);
ALTER TABLE
    `cantidad_stock` ADD CONSTRAINT `cantidad_stock_id_libros_fk_foreign` FOREIGN KEY(`id_libros_fk`) REFERENCES `libros`(`id`);
ALTER TABLE
    `pedidos` ADD CONSTRAINT `pedidos_id_cliente_fk_foreign` FOREIGN KEY(`id_cliente_fk`) REFERENCES `clientes`(`id`);
ALTER TABLE
    `busqueda` ADD CONSTRAINT `busqueda_id_isbn_fk_foreign` FOREIGN KEY(`id_ISBN_fk`) REFERENCES `ISBN`(`id`);
ALTER TABLE
    `pedidos` ADD CONSTRAINT `pedidos_id_libros_fk_foreign` FOREIGN KEY(`id_libros_fk`) REFERENCES `libros`(`id`);
ALTER TABLE
    `cantidad_stock` ADD CONSTRAINT `cantidad_stock_id_pedidos_fk_foreign` FOREIGN KEY(`id_pedidos_fk`) REFERENCES `pedidos`(`id`);
ALTER TABLE
    `clientes` ADD CONSTRAINT `clientes_id_busqueda_fk_foreign` FOREIGN KEY(`id_busqueda_fk`) REFERENCES `busqueda`(`id`);
`;

module.exports = sqlScript;
