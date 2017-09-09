
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
