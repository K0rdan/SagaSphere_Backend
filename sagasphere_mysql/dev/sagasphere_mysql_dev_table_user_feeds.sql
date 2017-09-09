
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
