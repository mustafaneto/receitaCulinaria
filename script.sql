-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema teste_receitas_rg_sistemas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema teste_receitas_rg_sistemas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `teste_receitas_rg_sistemas` ;
USE `teste_receitas_rg_sistemas` ;

-- -----------------------------------------------------
-- Table `teste_receitas_rg_sistemas`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teste_receitas_rg_sistemas`.`usuarios` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '\n',
  `nome` VARCHAR(100) NULL,
  `login` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `criado_em` DATETIME NOT NULL,
  `alterado_em` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teste_receitas_rg_sistemas`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teste_receitas_rg_sistemas`.`categorias` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teste_receitas_rg_sistemas`.`receitas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teste_receitas_rg_sistemas`.`receitas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_usuarios` INT(10) UNSIGNED NOT NULL,
  `id_categorias` INT(10) UNSIGNED NULL,
  `nome` VARCHAR(45) NULL,
  `tempo_preparo_minutos` INT UNSIGNED NULL,
  `porcoes` INT UNSIGNED NULL,
  `modo_preparo` TEXT NOT NULL,
  `ingredientes` TEXT NULL,
  `url_imagem` VARCHAR(255) NULL,
  `criado_em` DATETIME NOT NULL,
  `alterado_em` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_receitas_1_idx` (`id_usuarios` ASC),
  INDEX `fk_receitas_2_idx` (`id_categorias` ASC),
  CONSTRAINT `fk_receitas_1`
    FOREIGN KEY (`id_usuarios`)
    REFERENCES `teste_receitas_rg_sistemas`.`usuarios` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_receitas_2`
    FOREIGN KEY (`id_categorias`)
    REFERENCES `teste_receitas_rg_sistemas`.`categorias` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- --------------------------------------------------------------------------------
-- Data for table `teste_receitas_rg_sistemas`.`categorias`, `usuarios`, `receitas`
-- --------------------------------------------------------------------------------
START TRANSACTION;
USE `teste_receitas_rg_sistemas`;
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (1, 'Bolos e tortas doces');
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (2, 'Carnes');
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (3, 'Aves');
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (4, 'Peixes e frutos do mar');
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (5, 'Saladas, molhos e acompanhamentos');
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (6, 'Sopas');
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (7, 'Massas');
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (8, 'Bebidas');
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (9, 'Doces e sobremesas');
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (10, 'Lanches');
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (11, 'Prato Único');
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (12, 'Light');
INSERT INTO `teste_receitas_rg_sistemas`.`categorias` (`id`, `nome`) VALUES (13, 'Alimentação Saudável');

INSERT INTO `teste_receitas_rg_sistemas`.`usuarios` 
(`id`, `nome`, `login`, `senha`, `criado_em`, `alterado_em`) 
VALUES 
(1, 'mustafa', 'mustafa', '$2a$10$B3JmsDLAcyiLYEp6Yh/1cOanHak28UoP66FjEn9OVWq5402PPWk5S', NOW(), NOW());

INSERT INTO `teste_receitas_rg_sistemas`.`receitas` 
    (`id_usuarios`, `nome`, `tempo_preparo_minutos`, `porcoes`, `url_imagem`, 
     `modo_preparo`, `ingredientes`, `id_categorias`, `criado_em`, `alterado_em`) 
VALUES 
    (1, 'Panqueca de Banana', 15, 2, 'https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3291616:1666321797/Panqueca%20com%20banana%20(1).jpg', 
     'Amasse as bananas, misture os ingredientes e cozinhe por 2-3 minutos de cada lado.', 
     '2 bananas maduras, 2 ovos, 1/2 xícara de aveia, 1 colher de chá de fermento em pó, canela a gosto', 13, NOW(), NOW()),

    (1, 'Risoto de Funghi', 40, 4, 'https://s2-receitas.glbimg.com/r4240KPeN9UY3aCFwIQRCCeCCwQ=/0x0:320x240/984x0/smart/filters:strip_icc()/s.glbimg.com/po/rc/media/2012/06/13/15/27/07/102/Risoto_de_funghi_4.JPG', 
     'Hidrate o funghi, refogue o arroz com cebola e alho, adicione o funghi e cozinhe com caldo de legumes. Finalize com manteiga e parmesão.', 
     '1 xícara de arroz arbóreo, 50g de funghi seco, 1/2 cebola picada, 1 dente de alho, 1/2 xícara de vinho branco, 1 litro de caldo de legumes, 2 colheres de sopa de manteiga, 50g de parmesão ralado, sal, pimenta', 11, NOW(), NOW()),

    (1, 'Salada Caesar', 20, 4, 'https://static.itdg.com.br/images/1200-630/f6acb58cd0215a6d2118c4a87ebab1fe/153730-original.jpg', 
     'Misture alface, croutons, frango grelhado, parmesão e molho Caesar.', 
     '1 alface romana, 1/2 xícara de croutons, 1/4 xícara de parmesão, 1 peito de frango grelhado, molho Caesar', 5, NOW(), NOW()),

    (1, 'Bolo de Cenoura', 50, 8, 'https://static.itdg.com.br/images/360-240/d290bc79bcad112ee9095604e45eb262/365326-original.jpg', 
     'Bata os ingredientes no liquidificador e asse por 40 minutos.', 
     '3 cenouras, 3 ovos, 1 xícara de óleo, 2 xícaras de açúcar, 2 xícaras de farinha, 1 colher de sopa de fermento', 1, NOW(), NOW()),

    (1, 'Sopa de Lentilha', 45, 4, 'https://static.itdg.com.br/images/1200-630/b0f8da0f6c452e057457c39bc8285667/320914-original.jpg', 
     'Cozinhe a lentilha com cenoura, batata e caldo de legumes por 30 minutos.', 
     '1 xícara de lentilha, 1 cenoura, 1 batata, 1 cebola, 2 dentes de alho, 1 litro de caldo de legumes', 6, NOW(), NOW()),

    (1, 'Pizza Margherita', 60, 8, 'https://static.itdg.com.br/images/640-440/019258215a92d42e7c24fed8f7626b34/140843-original.jpg', 
     'Abra a massa, adicione o molho e queijo, asse por 15 minutos e finalize com manjericão.', 
     '1 massa de pizza, 1/2 xícara de molho de tomate, 200g de mussarela, manjericão, azeite', 7, NOW(), NOW()),

    (1, 'Brigadeiro', 20, 25, 'https://static.itdg.com.br/images/1200-630/0d55ce4c7e3db311af4bb4077e141354/220759-original.jpg', 
     'Misture o leite condensado com cacau e manteiga, cozinhe até soltar do fundo e enrole.', 
     '1 lata de leite condensado, 2 colheres de sopa de cacau em pó, 1 colher de sopa de manteiga, granulado', 9, NOW(), NOW());
COMMIT;



