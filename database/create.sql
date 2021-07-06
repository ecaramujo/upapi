autores	CREATE TABLE `autores` (
    `id_autor` int(11) NOT NULL AUTO_INCREMENT,
    `nome` varchar(40) NOT NULL,
    `pais_origem` varchar(40) NOT NULL,
    PRIMARY KEY (`id_autor`),
    UNIQUE KEY `id_autor` (`id_autor`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4
clientes	CREATE TABLE `clientes` (
    `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
    `matricula` int(11) NOT NULL,
    `nome` varchar(40) NOT NULL,
    `telefone` varchar(40) NOT NULL,
    `locacao` int(11) NOT NULL,
    PRIMARY KEY (`id_cliente`),
    UNIQUE KEY `matricula` (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4
livros	CREATE TABLE `livros` (
    `id_livro` int(11) NOT NULL AUTO_INCREMENT,
    `isbn` int(11) NOT NULL,
    `nome` varchar(40) NOT NULL,
    `id_autor` int(11) NOT NULL,
    `editora` varchar(40) NOT NULL,
    `ano` year(4) NOT NULL,
    `quantidade` int(11) NOT NULL,
    PRIMARY KEY (`id_livro`),
    UNIQUE KEY `isbn` (`isbn`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4
locacoes	CREATE TABLE `locacoes` (
    `id_locacao` int(11) NOT NULL AUTO_INCREMENT,
    `id_cliente` int(11) NOT NULL,
    `id_livro` int(11) NOT NULL,
    `data_retirada` date NOT NULL,
    `data_estimada_entrega` date NOT NULL,
    `data_real_entrega` date DEFAULT NULL,
    `status` varchar(40) NOT NULL,
    PRIMARY KEY (`id_locacao`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4