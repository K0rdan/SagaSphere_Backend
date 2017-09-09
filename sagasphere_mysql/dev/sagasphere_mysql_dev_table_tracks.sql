
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
