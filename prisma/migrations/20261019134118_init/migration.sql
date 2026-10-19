-- CreateTable
CREATE TABLE `servicos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(100) NOT NULL,
    `descricao` TEXT NOT NULL,
    `categoria` VARCHAR(50) NOT NULL,
    `preco` DECIMAL(10, 2) NOT NULL,
    `cidade` VARCHAR(100) NOT NULL,
    `prestador` VARCHAR(100) NOT NULL,
    `disponivel` BOOLEAN NOT NULL DEFAULT true,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
