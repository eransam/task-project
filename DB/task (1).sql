-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: דצמבר 11, 2022 בזמן 07:38 PM
-- גרסת שרת: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `tasks`
--

CREATE TABLE `tasks` (
  `TaskID` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `AssigneeName` varchar(100) NOT NULL,
  `CreationDate` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL,
  `imageName` varchar(100) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `RelatedTickets` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `tasks`
--

INSERT INTO `tasks` (`TaskID`, `Title`, `AssigneeName`, `CreationDate`, `Status`, `imageName`, `Description`, `RelatedTickets`) VALUES
(75, 'ERT', 'ERT', 'Sun Dec 11 2022 20:01:33 GMT+0200 (שעון מזרח אירופה (חורף))', 'ERT', 'ccedd933-37f6-48b6-a88e-31c63949ac91.jpeg', 'RET', 'ERT'),
(78, 'undefined', 'undefined', 'Sun Dec 11 2022 20:21:58 GMT+0200 (שעון מזרח אירופה (חורף))', 'undefined', 'b506ad0f-a9a7-4dc5-a280-f91938ba1ca6.jpg', 'WER', 'WER'),
(79, 'undefined', 'undefined', 'Sun Dec 11 2022 20:31:28 GMT+0200 (שעון מזרח אירופה (חורף))', 'undefined', 'b65cd280-1dc4-4409-95fa-10750683c6e2.jpg', 'dfgh', 'dfgh');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`TaskID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `TaskID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
