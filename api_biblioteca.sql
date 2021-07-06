-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04-Jul-2021 às 07:04
-- Versão do servidor: 10.4.18-MariaDB
-- versão do PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `api_biblioteca`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `autores`
--

CREATE TABLE `autores` (
  `id_autor` int(11) NOT NULL,
  `nome` varchar(40) NOT NULL,
  `pais_origem` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `autores`
--

INSERT INTO `autores` (`id_autor`, `nome`, `pais_origem`) VALUES
(1, 'Paulo Coelho', 'Brasil'),
(2, 'J. R. R. Tolkien', 'Reino Unido'),
(3, 'Antoine de Saint-Exupéry', 'França'),
(4, 'J. K. Rowling', 'Inglaterra'),
(5, 'Agatha Christie', 'Inglaterra'),
(6, 'Cao Xueqin', 'China'),
(7, 'Dan Brown', 'Estados Unidos'),
(8, 'Napoleon Hill', 'Estados Unidos');

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `matricula` int(11) NOT NULL,
  `nome` varchar(40) NOT NULL,
  `telefone` varchar(40) NOT NULL,
  `locacao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `matricula`, `nome`, `telefone`, `locacao`) VALUES
(1, 1, 'Eugênio Araujo', '5199772230', 0),
(2, 2, 'FranFran', '5199887722', 0),
(3, 3, 'Xuxu', '5122338877', 0),
(4, 4, 'Rudini', '5199227744', 0),
(5, 5, 'Filó', '5422991166', 0),
(6, 10, 'Julio', '5466224456', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `livros`
--

CREATE TABLE `livros` (
  `id_livro` int(11) NOT NULL,
  `isbn` int(11) NOT NULL,
  `nome` varchar(40) NOT NULL,
  `id_autor` int(11) NOT NULL,
  `editora` varchar(40) NOT NULL,
  `ano` year(4) NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `livros`
--

INSERT INTO `livros` (`id_livro`, `isbn`, `nome`, `id_autor`, `editora`, `ano`, `quantidade`) VALUES
(1, 10, 'O alquimista', 1, 'Brasil', 1988, 5),
(2, 12, 'O Senhor dos Anéis', 2, 'EUA', 1954, 5),
(3, 14, 'O Pequeno Príncipe', 3, 'França', 1943, 2),
(4, 16, 'Harry Potter e a Pedra Filosofal', 4, 'Inglaterra', 1997, 3),
(5, 20, 'O Hobbit', 2, 'Trilogia', 1937, 3),
(6, 32, 'O Caso dos Dez Negrinhos', 5, 'Inglês', 1939, 3),
(7, 24, 'O Código Da Vinci', 7, 'EUA', 2003, 1),
(8, 26, 'Pense e Enriqueça', 8, 'EUA', 1937, 3),
(9, 28, 'Harry Potter e o Enigma do Príncipe', 4, 'Inglaterra', 2005, 4),
(10, 18, 'Harry Potter e as Relíquias da Morte', 4, 'Inglaterra', 2007, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `locacoes`
--

CREATE TABLE `locacoes` (
  `id_locacao` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_livro` int(11) NOT NULL,
  `data_retirada` date NOT NULL,
  `data_estimada_entrega` date NOT NULL,
  `data_real_entrega` date DEFAULT NULL,
  `status` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `username` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `livros`
--

INSERT INTO `usuarios`(`username`, `password`) VALUES ('admin','admin')

-- --------------------------------------------------------

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `autores`
--
ALTER TABLE `autores`
  ADD PRIMARY KEY (`id_autor`),
  ADD UNIQUE KEY `id_autor` (`id_autor`) USING BTREE;

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `matricula` (`matricula`);

--
-- Índices para tabela `livros`
--
ALTER TABLE `livros`
  ADD PRIMARY KEY (`id_livro`),
  ADD UNIQUE KEY `isbn` (`isbn`);

--
-- Índices para tabela `locacoes`
--
ALTER TABLE `locacoes`
  ADD PRIMARY KEY (`id_locacao`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `autores`
--
ALTER TABLE `autores`
  MODIFY `id_autor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `livros`
--
ALTER TABLE `livros`
  MODIFY `id_livro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `locacoes`
--
ALTER TABLE `locacoes`
  MODIFY `id_locacao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
