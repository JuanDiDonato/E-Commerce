-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-10-2021 a las 18:34:17
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
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `cart`
--

INSERT INTO `cart` (`id_cart`, `id_user`, `id_product`, `quantity`, `stock`) VALUES
(61, 27, 28, 100, 10);

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
('Categoria 2'),
('Categoria 3'),
('Categoria 4');

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
(27, 'post3', 'https://imgr.search.brave.com/gE_cOPihdcFElfw29CfVlEXiCJ1r9OUfQWd7fMdKXaA/fit/474/225/ce/1/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5X/cUZJMEJTQVNkRUg1/VHhMTDBIZllRSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:30:52', 7),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:54:25', 25),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:54:25', 26),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:54:33', 27),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:54:33', 28),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:54:36', 29),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:57:42', 30),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:57:42', 31),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:57:44', 32),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:58:21', 33),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:58:39', 34),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:58:39', 35),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:58:39', 36),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:58:44', 37),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:58:44', 38),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:58:44', 39),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:58:48', 40),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 12:58:48', 41),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 13:02:21', 42),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 13:02:21', 43),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 13:02:23', 44),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 13:02:24', 45),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 13:03:09', 46),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 13:03:09', 47),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 13:03:09', 48),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 13:03:39', 49),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 13:03:40', 50),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 13:03:40', 51),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 13:04:45', 52),
(27, 'post7', 'https://imgr.search.brave.com/gE_cOPihdcFElfw29CfVlEXiCJ1r9OUfQWd7fMdKXaA/fit/474/225/ce/1/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5X/cUZJMEJTQVNkRUg1/VHhMTDBIZllRSGFI/YSZwaWQ9QXBp', 2, '2021-10-12 13:05:47', 53),
(27, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 13:05:47', 54),
(27, 'post7', 'https://imgr.search.brave.com/gE_cOPihdcFElfw29CfVlEXiCJ1r9OUfQWd7fMdKXaA/fit/474/225/ce/1/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5X/cUZJMEJTQVNkRUg1/VHhMTDBIZllRSGFI/YSZwaWQ9QXBp', 2, '2021-10-12 14:07:32', 55),
(103, 'post 8', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 2, '2021-10-12 14:14:00', 56),
(27, 'post3', 'https://imgr.search.brave.com/gE_cOPihdcFElfw29CfVlEXiCJ1r9OUfQWd7fMdKXaA/fit/474/225/ce/1/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5X/cUZJMEJTQVNkRUg1/VHhMTDBIZllRSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 14:14:23', 57),
(27, 'Producto 3', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 15:37:16', 58),
(27, 'Producto 3', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 16:09:05', 59),
(27, 'Producto 3', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 16:09:05', 60),
(27, 'Producto 3', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 16:11:10', 61),
(27, 'Producto 3', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 16:11:11', 62),
(27, 'Producto 3', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 16:11:50', 63),
(27, 'Producto 3', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 16:11:51', 64),
(27, 'Producto 3', 'https://imgr.search.brave.com/pRZ5k8Y7tHfE2_zbcGP4GEFHgeEA_K72NmHax3PpmkE/fit/474/225/ce/1/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/ZC1yMDdlWW1jZmJ2/cGl3X2JVQzZnSGFI/YSZwaWQ9QXBp', 1, '2021-10-12 16:12:14', 65);

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
  `photo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `disable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_product`, `title`, `categories`, `price`, `description`, `stock`, `photo`, `disable`) VALUES
(28, 'Medias deportivas', NULL, 5000, 'Description', 10, 'https://imgr.search.brave.com/gE_cOPihdcFElfw29CfVlEXiCJ1r9OUfQWd7fMdKXaA/fit/474/225/ce/1/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5X/cUZJMEJTQVNkRUg1/VHhMTDBIZllRSGFI/YSZwaWQ9QXBp', 0);

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
(46, 1, '2021-10-12 14:07:32'),
(4, 1, '2021-10-12 14:14:00'),
(3, 1, '2021-10-12 14:14:23'),
(1299, 1, '2021-10-12 15:37:17'),
(1299, 1, '2021-10-12 16:09:05'),
(1299, 1, '2021-10-12 16:11:11'),
(1299, 1, '2021-10-12 16:11:51'),
(1299, 1, '2021-10-12 16:12:14');

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
(27, 'Fulano Mengano', 'client@client.client', '$2b$12$XOxNTVHOToAyJQKdTZW3rOshwHiZxCUuHCop7OA62SP7K2gjZyv4C', 1, 'irala 5694'),
(102, 'Admin User', 'admin@admin.admin', '$2b$12$IxQyCTOtnOeoqjUuk5k/VeEvndQ3X9TR7juUVheTm6qJSJbes9.Va', 2, ''),
(103, 'Juan Di Donato', 'didonatojuan7@gmail.com', '$2b$12$m49.8bStp2RldUc95OQlAeb6cx7U5r18IY7uU3Q8y.jDnm2lNDCYS', 1, 'Irala 5686');

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
-- Indices de la tabla `history_shopping`
--
ALTER TABLE `history_shopping`
  ADD PRIMARY KEY (`id_history`),
  ADD KEY `id_user` (`id_user`);

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
  ADD KEY `products_ibfk_1` (`categories`);

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
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `history_shopping`
--
ALTER TABLE `history_shopping`
  MODIFY `id_history` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

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
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categories`) REFERENCES `categories` (`category`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
