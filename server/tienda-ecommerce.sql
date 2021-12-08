-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 07-12-2021 a las 16:12:57
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda-ecommerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Carts`
--

CREATE TABLE `Carts` (
  `id_cart` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit_price` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `waist` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categories`
--

CREATE TABLE `Categories` (
  `category` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `Categories`
--

INSERT INTO `Categories` (`category`) VALUES
('Sin Categoria'),
('Wallpappers');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Events`
--

CREATE TABLE `Events` (
  `id_event` int(11) NOT NULL,
  `event_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `discount` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `from_date` datetime DEFAULT NULL,
  `to_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `Events`
--

INSERT INTO `Events` (`id_event`, `event_name`, `discount`, `from_date`, `to_date`) VALUES
(1, 'default', '0', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `History_shoppings`
--

CREATE TABLE `History_shoppings` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Monthly_statistics`
--

CREATE TABLE `Monthly_statistics` (
  `id` int(11) NOT NULL,
  `monthly_incomes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `monthly_sales` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `month` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Orders`
--

CREATE TABLE `Orders` (
  `id_order` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `fullname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `waist` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Products`
--

CREATE TABLE `Products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `categories` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `disable` int(11) DEFAULT NULL,
  `id_event` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `Products`
--

INSERT INTO `Products` (`id`, `title`, `categories`, `price`, `description`, `photo`, `disable`, `id_event`) VALUES
(1, 'Test', 'Sin Categoria', 1000, 'Producto de pruebas', 'undefinded', 0, 1),
(3, 'Wallpapper', 'Wallpappers', 120, 'Wallpapper full HD', '[\"1638881340899.png\"]', 0, 1),
(4, 'Casa del Puente', 'Wallpappers', 200, 'Casa del puente', '[\"1638882481325.JPG\"]', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Roles`
--

CREATE TABLE `Roles` (
  `id_rol` int(11) NOT NULL,
  `rol` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `Roles`
--

INSERT INTO `Roles` (`id_rol`, `rol`) VALUES
(1, 'client'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20211119130633-create-users.js'),
('20211119130914-create-products.js'),
('20211119131040-create-statistics.js'),
('20211119131136-create-roles.js'),
('20211119131307-create-orders.js'),
('20211119131424-create-monthly-statistics.js'),
('20211119131557-create-history-shoppings.js'),
('20211119131758-create-events.js'),
('20211119131839-create-categories.js'),
('20211119131945-create-cart.js'),
('20211119133216-create-waist.js'),
('20211126160419-create-status.js'),
('20211127134911-asociations.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Statistics`
--

CREATE TABLE `Statistics` (
  `id` int(11) NOT NULL,
  `income` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sales` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Statuses`
--

CREATE TABLE `Statuses` (
  `id` int(11) NOT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `Statuses`
--

INSERT INTO `Statuses` (`id`, `status`) VALUES
(1, 'Encargado'),
(2, 'En camino'),
(3, 'Entregado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_role` int(11) DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `Users`
--

INSERT INTO `Users` (`id`, `fullname`, `email`, `password`, `id_role`, `address`) VALUES
(1, 'test user', 'test@test.com', 'test', 2, NULL),
(2, 'admin', 'admin@admin', '$2b$12$7jR4uF5jGJ9PbmCTIkEd4.CwEf.29nW1MrdEv8uwEnaGJJCJirJHC', 2, NULL),
(3, 'client', 'client@client', '$2b$12$sOg1jrZFqFs8cUR9oLRTMe6ga5e6ky3IBTylkSOA3VCmuEx8HG2ay', 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Waists`
--

CREATE TABLE `Waists` (
  `id` int(11) NOT NULL,
  `id_product` int(11) DEFAULT NULL,
  `S` int(11) DEFAULT NULL,
  `M` int(11) DEFAULT NULL,
  `L` int(11) DEFAULT NULL,
  `XL` int(11) DEFAULT NULL,
  `XXL` int(11) DEFAULT NULL,
  `XXXL` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `Waists`
--

INSERT INTO `Waists` (`id`, `id_product`, `S`, `M`, `L`, `XL`, `XXL`, `XXXL`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1),
(3, 3, 1, 1, 1, 1, 1, 1),
(4, 4, 1, 1, 1, 1, 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Carts`
--
ALTER TABLE `Carts`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `FK_7` (`id_user`),
  ADD KEY `FK_8` (`id_product`);

--
-- Indices de la tabla `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`category`);

--
-- Indices de la tabla `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`id_event`);

--
-- Indices de la tabla `History_shoppings`
--
ALTER TABLE `History_shoppings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6` (`id_user`),
  ADD KEY `FK_11` (`status`);

--
-- Indices de la tabla `Monthly_statistics`
--
ALTER TABLE `Monthly_statistics`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `FK_1` (`id_user`),
  ADD KEY `FK_2` (`id_product`),
  ADD KEY `FK_10` (`status`);

--
-- Indices de la tabla `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_4` (`categories`),
  ADD KEY `FK_5` (`id_event`);

--
-- Indices de la tabla `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `Statistics`
--
ALTER TABLE `Statistics`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Statuses`
--
ALTER TABLE `Statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `FK_3` (`id_role`);

--
-- Indices de la tabla `Waists`
--
ALTER TABLE `Waists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_9` (`id_product`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Carts`
--
ALTER TABLE `Carts`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Events`
--
ALTER TABLE `Events`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `History_shoppings`
--
ALTER TABLE `History_shoppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Monthly_statistics`
--
ALTER TABLE `Monthly_statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Products`
--
ALTER TABLE `Products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Statistics`
--
ALTER TABLE `Statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Statuses`
--
ALTER TABLE `Statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Waists`
--
ALTER TABLE `Waists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Carts`
--
ALTER TABLE `Carts`
  ADD CONSTRAINT `FK_7` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_8` FOREIGN KEY (`id_product`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `History_shoppings`
--
ALTER TABLE `History_shoppings`
  ADD CONSTRAINT `FK_11` FOREIGN KEY (`status`) REFERENCES `Orders` (`status`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_6` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `FK_1` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_10` FOREIGN KEY (`status`) REFERENCES `Statuses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_2` FOREIGN KEY (`id_product`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `FK_4` FOREIGN KEY (`categories`) REFERENCES `Categories` (`category`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_5` FOREIGN KEY (`id_event`) REFERENCES `Events` (`id_event`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `FK_3` FOREIGN KEY (`id_role`) REFERENCES `Roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Waists`
--
ALTER TABLE `Waists`
  ADD CONSTRAINT `FK_9` FOREIGN KEY (`id_product`) REFERENCES `Products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
