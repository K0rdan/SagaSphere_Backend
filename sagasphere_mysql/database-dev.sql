-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : sagasphere_mysql
-- Généré le :  lun. 19 juin 2017 à 16:52
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
  `url` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `title` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `content` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `hash` varchar(100) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `news`
--

INSERT INTO `news` (`id`, `sagaID`, `date`, `url`, `title`, `content`, `hash`) VALUES
(1, 1, '2017-06-17 15:13:00', 'http://www.naheulbeuk.com/', 'JDR : générateurs de noms', 'Je vous propose aujourd\'hui plusieurs tableaux amusants et pratiques pour générer des centaines de milliers de noms de héros fanghiens, pour certains peuples emblématiques. Jamais plus vous ne serez en panne d\'idée pour vos noms de PNJ...', 'fW/IrxHM4UQNzrYeEVCOuHPvC29WoRimeymlqx7INho='),
(2, 1, '2017-06-17 15:13:00', 'http://www.naheulbeuk.com/', 'Noblesse de Glargh', 'En cadeau pour le semestre, je vous offre cette semaine un jeu de plateau gratuit basé sur plusieurs documents rédigés pour le jeu de rôle, en Terre de Fangh, à bricoler à la maison. Il vous permet d\'incarner des nobles de Glargh et d\'essayer d\'être plus riche et plus influent que vos amis. Vous le trouverez sur le site du JDR Naheulbeuk, en version papier pour table et en version dématérialisée, pour un jeu à distance.', 'PwUjL6YGOkxNL6Qr2V5NieDcC7A0mkAlvyTYkF6xsxI='),
(3, 1, '2017-06-12 11:33:00', 'http://www.penofchaos.com/donjon/', 'Les bonnes questions', 'Le format d\'une aventure MP3 est-il toujours d\'actualité pour Naheulbeuk ? Cette semaine on se pose les bonnes questions, avec chiffres à l\'appui.', 'aPHMzPRjxLANwMR3BueYQ14xVExqX7RlWQ32t5nhYkc='),
(4, 1, '2017-06-11 11:55:00', 'http://www.naheulbeuk.com/', 'JDR : générateur d\'excuses', 'Je vous propose aujourd\'hui un truc super débile en cadeau pour les élections : le générateur d\'excuses de sbire. Un tableau qui vous permet d\'obtenir 64 millions d\'excuses à la noix, pour toutes les occasions de la vie quotidienne.', 'aOG7T4mALNo5AcHiwjB5aymvUzSiTr2RCAeXlHOShXE='),
(5, 1, '2017-05-24 12:15:00', 'http://www.penofchaos.com/donjon/', 'Naheulband Backstage', 'Cette semaine, grâce au travail du MFC on vous livre un chouette reportage backstage/live du Naheulband à Trolls et Légendes. Vous avez aussi quelques news et l\'annonce de l\'arrivée de mon jeu de plateau gratuit, Noblesse de Glargh.', 'H9Q+Vql2pw3ylFTnDUK2lHiZ99xXqppt0caEBKKGGzA='),
(6, 1, '2017-05-18 11:25:00', 'http://www.naheulbeuk.com/', 'JDR : personnages de retour', 'Oubliez ce que j\'ai dit hier... Le site DONJON FACILE est déjà de retour (grand merci au webmaster), avec vos personnages dedans, pour la plus grande joie des petits et des grands. Toutefois je vous recommande de lire la news à ce sujet afin d\'en savoir un peu plus.', '6yO/gq5hSP4VeCMBkpQDvPUDVBwKebn19bOvghLrqJA='),
(7, 1, '2017-05-17 15:50:00', 'http://www.naheulbeuk.com/', 'JDR : personnages évaporés', 'Si jamais vous utilisiez le site DONJON FACILE pour gérer vos personnages, vous devez absolument lire la news de cette semaine. En effet, le site vient de disparaître...', 'cs4cg+Noho7edZ8Cj1NpohMovl1k5+CvMdtTAo2ADJY='),
(8, 1, '2017-04-30 15:50:00', 'http://www.naheulbeuk.com/', 'JDR : billets fanghiens', 'De la monnaie en papier ? Mais c\'est quoi cette histoire ? Pour le savoir... Allez lire la news sur le site, vous y trouverez aussi un cadeau en même temps.', '6InrQMe5tN55mDiPlafTVpt7j1I5/6qlfXTHxMUh0pc='),
(9, 2, '2017-04-02 00:00:07', 'http://www.refletsdacide.com/lepisode-16-disponible/', 'L’épisode 16 est maintenant … disponible !', '“Au delà de la Mort, de l’Enfer et du Temps, Il n’est de pire sort que celui du Néant.” ✔ […]', 'M+U53hr4Fi/v5vrrq5fpLB9Y0zfvcJATfcmN9j1Y0D4=');

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
  ADD UNIQUE KEY `hash` (`hash`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
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
