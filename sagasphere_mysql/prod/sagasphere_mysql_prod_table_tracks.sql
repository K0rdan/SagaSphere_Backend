
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
