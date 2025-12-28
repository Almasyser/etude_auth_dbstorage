-- -----------------------------------------------------
-- Schema emmaus_phone
DROP DATABASE IF EXISTS `auth_dbstorage`;

CREATE DATABASE `auth_dbstorage`;

USE `auth_dbstorage`;

-- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS `auth_dbstorage` DEFAULT CHARACTER SET utf8;
-- USE `emmaus_phone` ;
-- -----------------------------------------------------
-- Table `auth_dbstorage`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `auth_dbstorage`.`user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `mail` VARCHAR(255) NOT NULL,
    `hashed_password` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(100) NULL,
    `firstname` VARCHAR(100) NULL,
    `phone` VARCHAR(18) NULL,
    `is_admin` TINYINT NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `auth_dbstorage`.`FAQ`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `auth_dbstorage`.`FAQ` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `question` text NOT NULL,
    `answer` text NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

INSERT INTO
    `user`(
        mail,
        hashed_password,
        lastname,
        firstname,
        phone,
        is_admin,
        role,
        photo,
        avatar
    )
VALUES
    (
        'test1@mail.com',
        '$argon2id$v=19$m=65536,t=5,p=1$lA0CshE6soYhU4RLw+ewUA$jnT+zkdbVyizxpJfmf0l+iXhysMnkmzyxD1hNRUp2Fc',
        'testeur2',
        'Jean',
        '3288378372',
        1,
        'president',
        'photo',
        'avatar'
    );
INSERT INTO
    `faq` VALUE (
        1,
        "Qu'est-ce qu'un smartphone reconditionné ?",
        "Un smartphone reconditionné est un appareil qui a été préalablement utilisé, puis remis à neuf pour être vendu à nouveau. Il a subi des tests, des réparations éventuelles et a été remis en état de fonctionnement. Les smartphones reconditionnés offrent une alternative moins coûteuse par rapport aux nouveaux modèles, tout en garantissant une qualité satisfaisante."
    ), (
        2,
        "Quelles sont les différences entre un smartphone reconditionné et un smartphone neuf ?",
        "La principale différence réside dans le fait qu'un smartphone reconditionné a déjà été utilisé, tandis qu'un smartphone neuf est tout juste sorti de l'emballage et n'a jamais été utilisé. Les smartphones reconditionnés peuvent présenter de légères marques d'usure, mais ils sont généralement testés et réparés pour assurer leur bon fonctionnement, tout comme les smartphones neufs."
    ), (
        3,
        "Comment savoir si un smartphone est reconditionnable ?",
        "La reconditionnabilité d'un smartphone dépend de son état initial et de la disponibilité des pièces de rechange nécessaires. Un professionnel peut évaluer l'appareil et déterminer s'il est possible de le reconditionner en effectuant les réparations nécessaires. Cependant, il est important de noter que tous les smartphones ne sont pas reconditionnables, surtout s'ils sont très anciens ou s'ils présentent des dommages irréparables."
    ), (
        4,
        "Qu'est-ce qu'un smartphone bloqué ?",
        "Un smartphone bloqué fait référence à un appareil qui est verrouillé sur un seul réseau ou opérateur spécifique. Cela signifie que vous ne pouvez utiliser la carte SIM que de cet opérateur particulier. Pour utiliser une autre carte SIM d'un opérateur différent, vous devrez soit déverrouiller le smartphone, soit utiliser une méthode de déblocage appropriée."
    ), (
        5,
        "Puis-je réparer moi-même mon smartphone ?",
        "La réparation d'un smartphone peut varier en fonction de la complexité du problème. Certaines réparations mineures, comme le remplacement d'une batterie ou d'un écran, peuvent être effectuées par des utilisateurs expérimentés à l'aide de tutoriels en ligne et d'outils appropriés. Cependant, pour des réparations plus complexes ou pour éviter d'endommager davantage l'appareil, il est recommandé de faire appel à un professionnel de la réparation de smartphones."
    );