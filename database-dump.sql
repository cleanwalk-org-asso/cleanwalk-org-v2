-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 07, 2023 at 09:27 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test-flask`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author_id` int(11) NOT NULL,
  `content` json NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text NOT NULL,
  `published` tinyint(1) NOT NULL,
  `preview_picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `author_id`, `content`, `created_at`, `description`, `published`, `preview_picture`) VALUES
(5, 'article1', 5, '{\"age\": 30, \"nom\": \"John Doe\", \"email\": \"johndoe@example.com\", \"ville\": \"New York\"}', '2023-09-23 10:09:14', 'lalalllala', 0, 'akfbejvbezujgvzeg'),
(6, 'article 2', 6, '{\"age\": 30, \"nom\": \"John Doe\", \"email\": \"johndoe@example.com\", \"ville\": \"New York\"}', '2023-09-14 10:09:14', 'laldzsqfsqf', 1, 'raqtshdfjgsqDFG');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`) VALUES
(1, 'Nantes'),
(2, 'Paris');

-- --------------------------------------------------------

--
-- Table structure for table `cleanwalks`
--

CREATE TABLE `cleanwalks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pos_lat` float NOT NULL,
  `pos_long` float NOT NULL,
  `date_begin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `duration` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cleanwalks`
--

INSERT INTO `cleanwalks` (`id`, `name`, `pos_lat`, `pos_long`, `date_begin`, `duration`, `description`, `author_id`, `address`, `city_id`) VALUES
(7, 'cleanwalk1', 50, 3, '2023-09-15 09:59:07', 2, 'qzhfcvazqgfuzafvuzefbzeqg', 6, '8 rue des arbres', 1),
(8, 'cleanwalk2', 4, 67, '2023-09-21 09:59:07', 3, 'lalalallalla', 5, '13 rue des moines', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `created_at`, `profile_picture`) VALUES
(5, 'Arthur', 'FRIN', 'frin.arthur@gmail.com', 'test', '2023-09-15 20:08:39', NULL),
(6, 'Paul', 'Menard', 'paul.menard@gmail.com', 'lala', '2023-09-12 10:30:23', 'dzert'),
(7, 'John', 'Doe', 'johndoe@example.com', 'lalala', '2023-10-07 20:45:49', 'https://example.com/profile.jpg'),
(8, 'Jonass', 'Dodo', 'jonas@example.com', 'lalala', '2023-10-07 21:09:56', 'https://example.com/profile.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user_cleanwalk`
--

CREATE TABLE `user_cleanwalk` (
  `user_id` int(11) NOT NULL,
  `cleanwalk_id` int(11) NOT NULL,
  `nb_person` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_cleanwalk`
--

INSERT INTO `user_cleanwalk` (`user_id`, `cleanwalk_id`, `nb_person`) VALUES
(5, 7, 2),
(5, 8, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cleanwalks`
--
ALTER TABLE `cleanwalks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_cleanwalk`
--
ALTER TABLE `user_cleanwalk`
  ADD PRIMARY KEY (`user_id`,`cleanwalk_id`),
  ADD KEY `cleanwalk_id` (`cleanwalk_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cleanwalks`
--
ALTER TABLE `cleanwalks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `cleanwalks`
--
ALTER TABLE `cleanwalks`
  ADD CONSTRAINT `cleanwalks_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cleanwalks_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`);

--
-- Constraints for table `user_cleanwalk`
--
ALTER TABLE `user_cleanwalk`
  ADD CONSTRAINT `user_cleanwalk_ibfk_1` FOREIGN KEY (`cleanwalk_id`) REFERENCES `cleanwalks` (`id`),
  ADD CONSTRAINT `user_cleanwalk_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
