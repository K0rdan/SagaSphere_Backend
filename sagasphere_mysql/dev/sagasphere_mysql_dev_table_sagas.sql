
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
