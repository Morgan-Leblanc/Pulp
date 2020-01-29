-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mer 29 Janvier 2020 à 16:53
-- Version du serveur :  5.7.29-0ubuntu0.18.04.1
-- Version de PHP :  7.2.24-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `300`
--

-- --------------------------------------------------------

--
-- Structure de la table `combat`
--

CREATE TABLE `combat` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `combat`
--

INSERT INTO `combat` (`id`, `name`) VALUES
(1, 'Arena'),
(2, 'Pise'),
(3, 'Waterlove');

-- --------------------------------------------------------

--
-- Structure de la table `combat_type`
--

CREATE TABLE `combat_type` (
  `id` int(11) NOT NULL,
  `id_combat` int(11) NOT NULL,
  `id_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `combat_type`
--

INSERT INTO `combat_type` (`id`, `id_combat`, `id_type`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 5),
(5, 2, 2),
(4, 2, 4),
(6, 3, 1),
(7, 3, 4);

-- --------------------------------------------------------

--
-- Structure de la table `gladiator`
--

CREATE TABLE `gladiator` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `is_skillable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `gladiator`
--

INSERT INTO `gladiator` (`id`, `name`, `is_skillable`) VALUES
(1, 'Maximus', 1),
(2, 'Spartacus', 1),
(3, 'Priscus', 0),
(4, 'Pollux', 0),
(5, 'Ganicus', 0),
(6, 'Crixus', 0),
(7, 'Jeanclaudedus', 0),
(8, 'Spiculus', 0),
(9, 'Commodus', 0),
(10, 'Flamma', 0),
(11, 'Mouton noir', 0),
(12, 'Tigre', 0),
(13, 'Lion', 0);

-- --------------------------------------------------------

--
-- Structure de la table `gladiator_combat`
--

CREATE TABLE `gladiator_combat` (
  `id` int(11) NOT NULL,
  `id_gladiator` int(11) NOT NULL,
  `id_combat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `gladiator_skill`
--

CREATE TABLE `gladiator_skill` (
  `id` int(11) NOT NULL,
  `id_gladiator` int(11) NOT NULL,
  `id_skill` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `gladiator_type`
--

CREATE TABLE `gladiator_type` (
  `id` int(11) NOT NULL,
  `id_gladiator` int(11) NOT NULL,
  `id_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `gladiator_type`
--

INSERT INTO `gladiator_type` (`id`, `id_gladiator`, `id_type`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 2),
(6, 5, 2),
(7, 7, 3),
(8, 8, 3),
(9, 9, 4),
(10, 10, 4),
(11, 11, 5),
(12, 12, 5),
(13, 13, 5);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Empereur'),
(2, 'Ludus');

-- --------------------------------------------------------

--
-- Structure de la table `skill`
--

CREATE TABLE `skill` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `skill`
--

INSERT INTO `skill` (`id`, `name`) VALUES
(1, 'épée à une main '),
(2, 'épée à deux mains');

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `type`
--

INSERT INTO `type` (`id`, `name`) VALUES
(1, 'Epeiste'),
(2, 'Lancier'),
(3, 'Cavalier'),
(4, 'Archer'),
(5, 'Animal');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `combat`
--
ALTER TABLE `combat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Index pour la table `combat_type`
--
ALTER TABLE `combat_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_combat` (`id_combat`,`id_type`),
  ADD KEY `id_type` (`id_type`);

--
-- Index pour la table `gladiator`
--
ALTER TABLE `gladiator`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Index pour la table `gladiator_combat`
--
ALTER TABLE `gladiator_combat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_gladiator` (`id_gladiator`,`id_combat`),
  ADD KEY `id_combat` (`id_combat`);

--
-- Index pour la table `gladiator_skill`
--
ALTER TABLE `gladiator_skill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_gladiator` (`id_gladiator`,`id_skill`),
  ADD KEY `id_skill` (`id_skill`);

--
-- Index pour la table `gladiator_type`
--
ALTER TABLE `gladiator_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_gladiator` (`id_gladiator`,`id_type`),
  ADD KEY `id_type` (`id_type`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Index pour la table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Index pour la table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`id_role`),
  ADD KEY `id_role` (`id_role`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `combat`
--
ALTER TABLE `combat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `combat_type`
--
ALTER TABLE `combat_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pour la table `gladiator`
--
ALTER TABLE `gladiator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT pour la table `gladiator_combat`
--
ALTER TABLE `gladiator_combat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `gladiator_skill`
--
ALTER TABLE `gladiator_skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `gladiator_type`
--
ALTER TABLE `gladiator_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `skill`
--
ALTER TABLE `skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `combat_type`
--
ALTER TABLE `combat_type`
  ADD CONSTRAINT `combat_type_ibfk_1` FOREIGN KEY (`id_combat`) REFERENCES `combat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `combat_type_ibfk_2` FOREIGN KEY (`id_type`) REFERENCES `type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `gladiator_combat`
--
ALTER TABLE `gladiator_combat`
  ADD CONSTRAINT `gladiator_combat_ibfk_1` FOREIGN KEY (`id_gladiator`) REFERENCES `gladiator` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gladiator_combat_ibfk_2` FOREIGN KEY (`id_combat`) REFERENCES `combat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `gladiator_skill`
--
ALTER TABLE `gladiator_skill`
  ADD CONSTRAINT `gladiator_skill_ibfk_1` FOREIGN KEY (`id_gladiator`) REFERENCES `gladiator` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gladiator_skill_ibfk_2` FOREIGN KEY (`id_skill`) REFERENCES `skill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `gladiator_type`
--
ALTER TABLE `gladiator_type`
  ADD CONSTRAINT `gladiator_type_ibfk_1` FOREIGN KEY (`id_gladiator`) REFERENCES `gladiator` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gladiator_type_ibfk_2` FOREIGN KEY (`id_type`) REFERENCES `type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
