
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
