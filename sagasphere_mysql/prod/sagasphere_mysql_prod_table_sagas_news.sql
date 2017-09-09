
-- --------------------------------------------------------

--
-- Structure de la table `sagas_news`
--

DROP TABLE IF EXISTS `sagas_news`;
CREATE TABLE `sagas_news` (
  `id` int(11) NOT NULL,
  `sagaID` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `url` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `title` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `content` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `hash` varchar(100) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
