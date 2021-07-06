-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06-Jun-2021 às 01:33
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
(1, 'cucaraxa', 'Brasil'),
(2, 'cucaraxa', 'Brasil'),
(4, 'cucaraxa', 'Brasil'),
(5, 'cucaraxa', 'Brasil'),
(6, 'cucaraxa', 'Brasil'),
(7, 'XACRINHA', 'Groelandia'),
(9, 'Autor de Prog Internet', 'Algum lugar entre 0 e 1');

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
(2, 1234, 'Eugenio Araujo', '5199772233', -1),
(3, 5151, 'Fran', '5199772233', 3),
(4, 5841, 'xuxu', '5199772233', -1),
(5, 51, '', '5199772233', -1),
(7, 99, 'Rudini', '519977', -1),
(8, 100, 'Filo', '519977', 0),
(9, 84, 'Julio', '519977', -1),
(10, 150, 'Xico', '51555555', 1),
(12, 66, 'Mike', '5199772233', -1);

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
(39, 5847, 'Anjos', 5, 'Abril', 0000, 0),
(43, 3546, 'Anjos', 5, 'Abril', 2021, 0),
(45, 1424, 'Anjos', 5, 'Abril', 2021, 0),
(46, 4, 'Harry Potter', 15, 'Bloomsbury Publishing', 1998, 1),
(48, 1111, 'Anjos', 5, 'Abril', 2022, 0),
(54, 213123, 'Anjos', 5, 'Abril', 2022, 0),
(55, 56168123, 'Anjos', 5, 'Abril', 2022, 0),
(56, 453543123, 'Anjos', 5, 'Abril', 2022, 0),
(57, 899, 'Demonios kkkk', 5, 'Abril', 2022, 0),
(59, 8734599, 'Demonios kkkk', 5, 'Abril', 2022, 0),
(60, 2147483647, 'Demonios kkkk', 5, 'Abril', 2022, 0),
(67, 2, 'Harry Potter', 1, 'Bloomsbury Publishing', 1998, 0),
(68, 1156, 'Harry Potter', 15, 'Bloomsbury Publishing', 1998, 9),
(70, 566, 'Harry Potter', 15, 'Bloomsbury Publishing', 1998, 1),
(71, 12, 'Harry Pottersss', 15, 'Bloomsbury Publishing', 1998, 0),
(72, 122, 'Harry Pottersss', 6, 'Bloomsbury Publishing', 1998, 10),
(73, 3455, 'House', 7, 'Abril', 2125, 6),
(75, 78541, 'Aprendendo Prog 2', 9, 'TI SEN@C', 2022, 5);

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

--
-- Extraindo dados da tabela `locacoes`
--

INSERT INTO `locacoes` (`id_locacao`, `id_cliente`, `id_livro`, `data_retirada`, `data_estimada_entrega`, `data_real_entrega`, `status`) VALUES
(4, 1, 2, '0000-00-00', '0000-00-00', '2021-06-18', 'Devolvido'),
(6, 2, 4, '0000-00-00', '0000-00-00', NULL, 'Devolvido'),
(7, 3, 3, '0000-00-00', '0000-00-00', NULL, 'Devolvido'),
(12, 1, 2, '2020-01-01', '0000-00-00', NULL, 'Devolvido'),
(13, 1, 2, '2020-01-01', '0000-00-00', NULL, 'Devolvido'),
(14, 1, 2, '2020-01-01', '0000-00-00', NULL, 'Devolvido'),
(15, 1, 2, '2020-02-10', '0000-00-00', NULL, 'Devolvido'),
(16, 1, 2, '2021-06-02', '0000-00-00', NULL, 'Devolvido'),
(17, 1, 2, '2021-06-02', '2021-06-07', NULL, 'Devolvido'),
(18, 1, 46, '2021-06-02', '2021-06-07', NULL, 'Devolvido'),
(19, 1, 46, '2021-06-02', '2021-06-07', NULL, 'Devolvido'),
(20, 1, 46, '2021-06-02', '2021-06-07', NULL, 'Devolvido'),
(21, 4, 46, '2021-06-02', '2021-06-07', '2021-06-18', 'Devolvido'),
(22, 4, 46, '2021-06-02', '2021-06-07', NULL, 'Devolvido'),
(23, 4, 46, '2021-06-02', '2021-06-07', NULL, 'Devolvido'),
(24, 4, 46, '2021-06-02', '2021-06-07', '2021-06-18', 'Devolvido'),
(25, 4, 46, '2021-06-02', '2021-06-07', '2021-06-18', 'Devolvido'),
(26, 1, 70, '2021-06-02', '2021-06-07', NULL, 'Devolvido'),
(27, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(28, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(29, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(30, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(31, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(32, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(33, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(34, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(35, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(36, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(37, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(38, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(39, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(40, 4, 46, '2021-06-03', '2021-06-08', '2021-06-18', 'Devolvido'),
(41, 4, 46, '2021-06-03', '2021-06-08', '2021-06-18', 'Devolvido'),
(42, 4, 46, '2021-06-03', '2021-06-08', '2021-06-18', 'Devolvido'),
(43, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(44, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(45, 4, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(46, 3, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(47, 3, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(48, 3, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(49, 2, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(50, 5, 46, '2021-06-03', '2021-06-08', NULL, 'Devolvido'),
(51, 5, 46, '2021-06-03', '2021-06-08', '2021-06-18', 'Devolvido'),
(52, 7, 70, '2021-06-03', '2021-06-08', '2021-06-18', 'Devolvido'),
(53, 5, 46, '2021-06-03', '2021-06-08', '2021-06-18', 'Devolvido'),
(54, 9, 46, '2021-06-03', '2021-06-08', '2021-06-06', 'Devolvido'),
(55, 7, 46, '2021-06-03', '2021-06-08', '2021-06-18', 'Devolvido'),
(56, 7, 46, '2021-06-04', '2021-06-09', '2021-06-18', 'Devolvido'),
(57, 4, 68, '2021-06-04', '2021-06-09', '2021-06-18', 'Devolvido'),
(58, 12, 75, '2021-06-04', '2021-06-09', '2021-06-18', 'Devolvido'),
(59, 4, 71, '2021-06-05', '2021-06-10', '2021-06-18', 'Devolvido'),
(60, 4, 71, '2021-06-05', '2021-06-10', '2021-06-18', 'Devolvido'),
(61, 4, 71, '2021-06-05', '2021-06-10', '2021-06-18', 'Devolvido'),
(62, 4, 71, '2021-06-05', '2021-06-10', '2021-06-18', 'Devolvido'),
(63, 4, 71, '2021-06-05', '2021-06-10', '2021-06-18', 'Devolvido'),
(64, 4, 71, '2021-06-05', '2021-06-10', '2021-06-18', 'Devolvido'),
(65, 4, 71, '2021-06-05', '2021-06-10', '2021-06-18', 'Devolvido'),
(66, 4, 71, '2021-06-05', '2021-06-10', '2021-06-18', 'Devolvido'),
(67, 10, 71, '2021-06-05', '2021-06-10', NULL, 'Aguardando Devolução');

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
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `username`, `password`) VALUES
(2, 'admin', 'admin');

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
  MODIFY `id_autor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `livros`
--
ALTER TABLE `livros`
  MODIFY `id_livro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de tabela `locacoes`
--
ALTER TABLE `locacoes`
  MODIFY `id_locacao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
