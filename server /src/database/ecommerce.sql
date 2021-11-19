-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-10-2021 a las 00:16:52
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `unit_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `cart`
--

INSERT INTO `cart` (`id_cart`, `id_user`, `id_product`, `quantity`, `stock`, `unit_price`) VALUES
(93, 103, 101, 1, 2, 5999),
(94, 105, 112, 1, 1, 2500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `category` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`category`) VALUES
('Adornos'),
('Cafeteras'),
('Gorras'),
('Libros'),
('Limpieza'),
('Plantas'),
('Ropa'),
('Tecnología'),
('Zapatillas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id_event` int(11) NOT NULL,
  `event_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'defaultEvent',
  `discount` float NOT NULL DEFAULT 0,
  `from_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `to_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id_event`, `event_name`, `discount`, `from_date`, `to_date`) VALUES
(0, 'defaultEvent', 0, '2021-10-14 16:42:09', '2021-10-14 16:32:22'),
(66, 'Evento1', 0.25, '2021-10-15 03:00:00', '2021-10-16 03:00:00'),
(67, 'evento2', 0.5, '2021-10-12 03:00:00', '2021-10-30 03:00:00'),
(68, 'evento3', 0.75, '2021-10-17 03:00:00', '2021-10-31 03:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `history_shopping`
--

CREATE TABLE `history_shopping` (
  `id_user` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_history` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `history_shopping`
--

INSERT INTO `history_shopping` (`id_user`, `title`, `photo`, `quantity`, `create_at`, `id_history`) VALUES
(27, 'Flores', '1634226791522.jpg', 1, '2021-10-14 17:45:11', 75),
(27, 'TOrta casera', '1634226857660.jpg', 1, '2021-10-14 17:45:11', 76),
(27, 'Flores', '1634226791522.jpg', 1, '2021-10-14 19:55:29', 77),
(27, 'Producto 1 qweqwe', '1634225908337.jpg', 1, '2021-10-14 19:55:29', 78),
(27, 'Flores', '1634226791522.jpg', 1, '2021-10-14 20:41:07', 79),
(27, 'Cafetera tognana', '1634302686785.jpg', 1, '2021-10-15 21:46:31', 80),
(27, 'Notebook compac', '1634302581952.jpg', 1, '2021-10-15 21:46:31', 81),
(27, 'Cafetera', '1634302453093.jpg', 1, '2021-10-15 21:47:28', 82),
(27, 'Tecnirama serie', '1634302886995.jpg', 1, '2021-10-15 21:48:28', 83),
(27, 'El Apagon', '1634302936337.jpg', 1, '2021-10-15 22:29:58', 84);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monthly_statistics`
--

CREATE TABLE `monthly_statistics` (
  `id_date` int(11) NOT NULL,
  `monthly_incomes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `monthly_sales` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `month` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `monthly_statistics`
--

INSERT INTO `monthly_statistics` (`id_date`, `monthly_incomes`, `monthly_sales`, `month`) VALUES
(1, '16999,1875,2110', '2,1,1', 9),
(2, '1100,8075,2110', '2,3,1', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `fullname` text COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id_order`, `id_user`, `fullname`, `address`, `id_product`, `quantity`) VALUES
(114, 27, 'Fulano Mengano', 'Lomas del Golf Manzana 5 casa 49', 105, 1),
(115, 27, 'Fulano Mengano', 'Lomas del Golf Manzana 5 casa 49', 102, 1),
(116, 27, 'Fulano Mengano', 'Lomas del Golf Manzana 5 casa 49', 100, 1),
(117, 27, 'Fulano Mengano', 'Lomas del Golf Manzana 5 casa 49', 109, 1),
(118, 27, 'Fulano Mengano', 'Lomas del Golf Manzana 5 casa 49', 110, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `categories` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `stock` int(10) NOT NULL,
  `photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `disable` tinyint(1) NOT NULL,
  `event` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_product`, `title`, `categories`, `price`, `description`, `stock`, `photo`, `disable`, `event`) VALUES
(98, 'Zapatillas genericas', 'Zapatillas', 2000, 'Zapatillas genericas, de alem', 1, '1634302342228.jpg', 0, 67),
(100, 'Cafetera', 'Cafeteras', 2500, 'Cafetera negra funciona de diez', 0, '1634302453093.jpg', 1, 66),
(101, 'Tv Smart Samsung', 'Tecnología', 7999, 'Tv Samsung Smart', 2, '1634302515994.jpg', 0, 66),
(102, 'Notebook compac', 'Tecnología', 13999, '4gb Ram\n1tb hdd\nI3 22xx', 0, '1634302581952.jpg', 1, 66),
(103, 'Detergente', 'Limpieza', 250, 'Detergente magistral', 1, '1634302627129.jpg', 0, 0),
(105, 'Cafetera tognana', 'Cafeteras', 6500, 'Cafetal tognana importada italia', 0, '1634302686785.jpg', 1, 0),
(106, 'Flores artificiales', 'Plantas', 250, 'Ideal centro de mesa', 3, '1634302755207.jpg', 0, 0),
(107, 'Mini cactus', 'Plantas', 350, 'Pequeño, ideal departamento', 1, '1634302798420.jpg', 0, 66),
(108, 'Plantas pequeñas', 'Plantas', 0, 'Plantas hermosa', 1, '1634302828606.jpg', 0, 0),
(109, 'Tecnirama serie', 'Libros', 2813, 'Serie completa', 0, '1634302886995.jpg', 1, 68),
(110, 'El Apagon', 'Libros', 3500, 'El apagón de Arthur Hailey', 0, '1634302936337.jpg', 1, 68),
(111, 'Papillion', 'Libros', 2500, 'Exelente estado', 1, '1634303012459.jpg', 0, 0),
(112, 'Mini Aloe Vera', 'Plantas', 2500, 'En madera, ideal para casa', 1, '1634303068126.jpg', 0, 0),
(113, 'Ovejita', 'Adornos', 500, 'Hermosa', 1, '1634303125407.jpg', 0, 0),
(114, 'Jirafas', 'Adornos', 500, 'Jirafas de madera', 2, '1634303170955.jpg', 0, 0),
(115, 'Stereos', 'Tecnología', 9000, 'Stereos. Philips', 1, '1634303222762.jpg', 0, 0),
(116, 'Teclado Shenlong', 'Adornos', 2000, 'Perfecto estado', 10, '1634303643374.jpg', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rol`, `id_rol`) VALUES
('client', 1),
('admin', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statistics`
--

CREATE TABLE `statistics` (
  `income` int(11) NOT NULL,
  `sales` int(11) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `statistics`
--

INSERT INTO `statistics` (`income`, `sales`, `last_updated`) VALUES
(16999, 2, '2021-10-15 21:46:31'),
(1875, 1, '2021-10-15 21:47:28'),
(2110, 1, '2021-10-15 21:48:28'),
(3500, 1, '2021-10-15 22:29:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `fullname` text COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_role` int(11) NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `fullname`, `email`, `password`, `id_role`, `address`) VALUES
(27, 'Fulano Mengano', 'client@client.client', '$2b$12$XOxNTVHOToAyJQKdTZW3rOshwHiZxCUuHCop7OA62SP7K2gjZyv4C', 1, 'Lomas del Golf Manzana 5 casa 49'),
(102, 'Admin User', 'admin@admin.admin', '$2b$12$IxQyCTOtnOeoqjUuk5k/VeEvndQ3X9TR7juUVheTm6qJSJbes9.Va', 2, ''),
(103, 'Juan Di Donato', 'didonatojuan7@gmail.com', '$2b$12$m49.8bStp2RldUc95OQlAeb6cx7U5r18IY7uU3Q8y.jDnm2lNDCYS', 1, 'Irala 5686'),
(104, 'Fulano Mengano2', 'client@3.com', '$2b$12$7wYED9Bj1YeGjvgmB1XY.ewIRhugnAxdUc2znsr3XkjxdjBTfGvMG', 1, 'irala 5694'),
(105, 'Raul Perez', 'eldido777@gmail.com', '$2b$12$kCm8HLI8NEb7PtCJg3sha.0vEqYLHhNybh6gtwpnQc1LRaxgg6VQG', 1, 'Irala 5686'),
(106, 'Juan Di Donato', 'admin2@admin.admin', '$2b$12$A8MejgqyQ0Y3AWNAtlrvQuEQhrrtlSahvhbZCUltqqc8V03Vs.Jb6', 2, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category`);

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id_event`);

--
-- Indices de la tabla `history_shopping`
--
ALTER TABLE `history_shopping`
  ADD PRIMARY KEY (`id_history`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `monthly_statistics`
--
ALTER TABLE `monthly_statistics`
  ADD PRIMARY KEY (`id_date`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_product` (`id_product`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `products_ibfk_1` (`categories`),
  ADD KEY `event` (`event`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_rol` (`id_role`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `history_shopping`
--
ALTER TABLE `history_shopping`
  MODIFY `id_history` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de la tabla `monthly_statistics`
--
ALTER TABLE `monthly_statistics`
  MODIFY `id_date` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `history_shopping`
--
ALTER TABLE `history_shopping`
  ADD CONSTRAINT `history_shopping_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categories`) REFERENCES `categories` (`category`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`event`) REFERENCES `events` (`id_event`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
