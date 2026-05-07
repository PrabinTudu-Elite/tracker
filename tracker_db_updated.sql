-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2026 at 05:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tracker_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(10) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `contact_no` bigint(20) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `photo_link` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `customer_name`, `contact_no`, `gender`, `email`, `address`, `photo_link`) VALUES
(1, 'Billy S. Burke', 7540001240, 'Male', 'billyb9@gmail.com', '3166 Rockford Road', NULL),
(2, 'John Mitchell', 2870214970, 'Male', 'johnm@gmail.com', '1954 Armory Road', NULL),
(3, 'Beatriz M. Matthews', 1247778460, 'Male', 'matthews@gmail.com', '4879 Shearwood Forest Drive', NULL),
(4, 'Kevin Johnson', 1478546500, 'Male', 'kevin@gmail.com', '926 Richland Avenue\n', NULL),
(5, 'Dwayne Scott', 2671249780, 'Male', 'scottdway@gmail.com', '4698 Columbia Road\n', NULL),
(6, 'Bruno Denn', 1245554780, 'Male', 'denbru@gmail.com', '4764 Warner Street\n', NULL),
(7, 'Ric Austin', 2450006974, 'Male', 'austinric@gmail.com', '1680  Brownton Road', NULL),
(8, 'Andrew Stuartt', 2457778450, 'Male', 'andrew@gmail.com', '766  Lodgeville Road', NULL),
(30, 'Ashok Bhatia', 9876543210, 'Male', 'a@b.com', 'Chandigarh, Punjab', NULL),
(31, 'Bikas Chug', 9876543211, 'Male', 'b@c.com', 'Tata Nagar,Jharkhand', NULL),
(32, 'Akhil Charu', 9876543212, 'Male', 'a@c.com', 'Rourkela,Odisha', NULL),
(33, 'Prabin Tudu', 7978632942, 'Male', 'prabintudu84@gmail.com', 'Khandagiri', NULL),
(35, 'Kiran Mishra', 9876543219, 'Male', 'ab@ab.com', 'Burla, Sambalpur', NULL),
(38, 'Jayanti Sahu', 9876543218, 'Female', 'ac@ac.com', 'Gandhi Nagar, Balesore', NULL),
(39, 'Saroj Dash', 9876543217, 'Male', 'ad@ad.com', 'Nehru Nagar, Baripada, Mayurbhanj', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `gps_number` varchar(100) DEFAULT NULL,
  `longitude` varchar(100) NOT NULL,
  `latitude` varchar(200) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `speed` int(10) NOT NULL,
  `isActive` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `gps_number`, `longitude`, `latitude`, `timestamp`, `speed`, `isActive`) VALUES
(1, 'gps_001', '83.388251', '19.176975', '2026-05-01 04:58:03', 50, 1),
(2, 'gps_002', '83.388251', '19.176975', '2026-05-01 04:58:03', 60, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'Admin', 'admin', 'admin@admin.com', '21232f297a57a5a743894a0e4a801fc3', '2024-09-01 12:49:22'),
(2, 'Staff', 'staff', 'staff@staff.com', '1253208465b1efa876f982d8a9e73eef', '2024-09-01 12:49:22');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(10) NOT NULL,
  `veh_num` varchar(100) DEFAULT NULL,
  `veh_type` varchar(100) NOT NULL,
  `veh_model` varchar(100) NOT NULL,
  `veh_cost` varchar(100) DEFAULT NULL,
  `area_locality` varchar(500) DEFAULT NULL,
  `gps_number` varchar(500) DEFAULT NULL,
  `veh_img` varchar(500) DEFAULT NULL,
  `is_ev` int(1) NOT NULL DEFAULT 0,
  `isActive` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `veh_num`, `veh_type`, `veh_model`, `veh_cost`, `area_locality`, `gps_number`, `veh_img`, `is_ev`, `isActive`) VALUES
(1, 'OD02BV6727', 'Car', 'Toyota Glanza', '12,00,000.00', 'Tomando, Bhubaneswar, Odisha - 751023', 'GPS_001', '../Uploads/OD02BV6727.jpg', 0, 1),
(2, 'OD18AB6138', 'Car', 'Maruti Suzuki Ertiga', '12,00,000.00', 'Seriguda,Rayagada,Odisha - 765002', 'GPS_002', '../Uploads/OD18AB6138.jpg', 1, 1),
(3, 'OD02BV6726', 'Truck', 'Ashok Leyland', '24,00,000.00', 'Gandhi Nagar, Kendhujhar, Odisha - 743322', 'GPS_003', '../Uploads/OD02BV6726.jpeg', 0, 1),
(4, 'OD11AB6138', 'Bus', 'Tata Benz', '53,00,000.00', 'Nehru Nagar, Koraput, Odisha - 721123', 'GPS_004', '../Uploads/OD11AB6138.jpeg', 0, 1),
(5, 'AP39AZ0909', 'Car', 'BMW 320', '25,00,000.00', 'R.K Beach, Vizag, AP - 300989', 'GPS_005', '../Uploads/AP39AZ0909.jpeg', 1, 1),
(6, 'AP10AR3209', 'Car', 'AUDI A5', '35,00,000.00', 'Gandhi Nagar, Vizag, AP - 300989', 'GPS_006', '../Uploads/AP39AZ0909.jpeg', 1, 1),
(9, 'fdsf', 'Car', 'sdfs', 'sdfs', 'sdfs', 'sdfs', 'sdfs', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_type`
--

CREATE TABLE `vehicle_type` (
  `id` int(11) NOT NULL,
  `make` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vehicle_type`
--

INSERT INTO `vehicle_type` (`id`, `make`, `model`, `type`) VALUES
(1, 'Honda', 'City', 'Sedan'),
(2, 'Suzuki', 'Ertiga', 'SUV'),
(3, 'Toyota', 'Glanza', 'Hatch Back');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicle_type`
--
ALTER TABLE `vehicle_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vehicle_type`
--
ALTER TABLE `vehicle_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
