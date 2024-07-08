import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';
import { Usuario } from '../../../Models/Usuario';

const UsuariosListar: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    async function fetchUsuarios() {
      const resposta = await fetch('http://localhost:5284/api/usuarios/listar');
      const dados = await resposta.json();
      setUsuarios(dados);
    }
    fetchUsuarios();
  }, []);

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Listar Usuários
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Data de Nascimento</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {usuarios.map((usuario) => (
            <Tr key={usuario.id}>
              <Td>{usuario.nome}</Td>
              <Td>{new Date(usuario.dataDeNascimento).toLocaleDateString()}</Td>
              <Td>
                <Link to={`/usuários-editar/${usuario.id}`}>
                  <Button size="sm" colorScheme="blue" mr={2}>
                    Editar
                  </Button>
                </Link>
                <Link to={`/usuários-excluir/${usuario.id}`}>
                  <Button size="sm" colorScheme="red">
                    Excluir
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Link to="/usuários-cadastrar">
        <Button mt={4} colorScheme="teal">
          Cadastrar Usuário
        </Button>
      </Link>
    </Box>
  );
};

export default UsuariosListar;
