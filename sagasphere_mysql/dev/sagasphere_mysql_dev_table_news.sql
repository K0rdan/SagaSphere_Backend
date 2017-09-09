
-- --------------------------------------------------------

--
-- Structure de la table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `userID` int(11) NOT NULL,
  `content` mediumtext COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `news`
--

INSERT INTO `news` (`id`, `date`, `title`, `userID`, `content`) VALUES
(1, '2017-09-09 17:22:25', 'Title news test', 1, 'Content news test');
