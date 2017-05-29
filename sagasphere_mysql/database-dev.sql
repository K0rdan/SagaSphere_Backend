-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : sagasphere_mysql
-- Généré le :  lun. 29 mai 2017 à 16:26
-- Version du serveur :  5.7.18
-- Version de PHP :  7.0.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `sagasphere`
--

-- --------------------------------------------------------

--
-- Structure de la table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `sagaID` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `url` text NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `news`
--

INSERT INTO `news` (`id`, `sagaID`, `date`, `url`, `title`, `content`) VALUES
(1, 1, '2017-04-11 00:00:00', 'http://www.penofchaos.com/donjon/', 'Gurdil Métal', 'Cette semaine, grâce au travail de toute l\'équipe de Magoyond et du Naheulband, nous sommes en mesure de vous offrir une belle version métal de Mon Ancêtre Gurdil, enregistrée au studio Magoyond. Tous les liens pour écouter ou télécharger le fichier sont sur notre site.');

-- --------------------------------------------------------

--
-- Structure de la table `sagas`
--

DROP TABLE IF EXISTS `sagas`;
CREATE TABLE `sagas` (
  `id` int(11) NOT NULL,
  `title` tinytext NOT NULL,
  `image` text NOT NULL,
  `author` tinytext NOT NULL,
  `creation` date NOT NULL,
  `url` text NOT NULL,
  `newsUrl` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `sagas`
--

INSERT INTO `sagas` (`id`, `title`, `image`, `author`, `creation`, `url`, `newsUrl`) VALUES
(1, 'Donjon de Naheulbeuk', 'http://streaming.nekonosekai.com/images/LOGO_Naheulbeuk.png', 'Pen of Chaos', '2001-01-01', 'http://www.penofchaos.com/warham/donjon.htm', 'http://www.penofchaos.com/naheulbeukrss.xml'),
(2, 'Reflet d\'Acide', 'http://streaming.nekonosekai.com/images/LOGO_RDA.png', 'JBX', '2011-01-01', 'http://www.refletsdacide.com/', 'http://www.refletsdacide.com/feed/');

-- --------------------------------------------------------

--
-- Structure de la table `tracks`
--

DROP TABLE IF EXISTS `tracks`;
CREATE TABLE `tracks` (
  `id` int(11) NOT NULL,
  `trackNumber` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `duration` int(11) NOT NULL,
  `url` text NOT NULL,
  `creation` date NOT NULL,
  `sagaID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `tracks`
--

INSERT INTO `tracks` (`id`, `trackNumber`, `name`, `duration`, `url`, `creation`, `sagaID`) VALUES
(1, 1, 'Épisode 01 : Présentation ', 255, 'http://naheulbeuk.tamdb.net/donjon01.zip', '2001-01-01', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `pass` tinytext NOT NULL,
  `email` varchar(254) NOT NULL COMMENT 'RFC compliance'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `pass`, `email`) VALUES
(1, 'test', 'pass', 'test@test.fr'),
(2, 'Kordan', 'pass', 'test@test.fr');

-- --------------------------------------------------------

--
-- Structure de la table `user_feeds`
--

DROP TABLE IF EXISTS `user_feeds`;
CREATE TABLE `user_feeds` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `sagaID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user_feeds`
--

INSERT INTO `user_feeds` (`id`, `userID`, `sagaID`) VALUES
(1, 1, 1),
(2, 1, 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sagaID` (`sagaID`);

--
-- Index pour la table `sagas`
--
ALTER TABLE `sagas`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sagaID` (`sagaID`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_feeds`
--
ALTER TABLE `user_feeds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `sagaID` (`sagaID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `sagas`
--
ALTER TABLE `sagas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `user_feeds`
--
ALTER TABLE `user_feeds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`sagaID`) REFERENCES `sagas` (`id`);

--
-- Contraintes pour la table `tracks`
--
ALTER TABLE `tracks`
  ADD CONSTRAINT `tracks_fk_sagas` FOREIGN KEY (`sagaID`) REFERENCES `sagas` (`id`);

--
-- Contraintes pour la table `user_feeds`
--
ALTER TABLE `user_feeds`
  ADD CONSTRAINT `user_feeds_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_feeds_ibfk_2` FOREIGN KEY (`sagaID`) REFERENCES `sagas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
