import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Heading } from '@chakra-ui/react';

function IMCListar() {
  const [imcs, setIMCs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchIMCs() {
      try {
        const response = await fetch('http://localhost:5284/api/imcs/listar');
        if (!response.ok) {
          throw new Error('Falha ao carregar os dados.');
        }
        const data = await response.json();
        setIMCs(data);
      } catch (error) {
        console.error('Erro ao carregar IMCs:', error);
        setIMCs([]); 
      }
    }

    fetchIMCs();
  }, []);

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Listar IMCs
      </Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Usuário</Th>
            <Th>Altura</Th>
            <Th>Peso</Th>
            <Th>Resultado</Th>
            <Th>Classificação</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {imcs && imcs.map((imc) => (
            <Tr key={imc.id}>
              <Td>{imc.usuarioId}</Td>
              <Td>{imc.altura}</Td>
              <Td>{imc.peso}</Td>
              <Td>{imc.resultado.toFixed(2)}</Td>
              <Td>{imc.classificacao}</Td>
              <Td>
                <Link to={`/imcs-editar/${imc.id}`}>
                  <Button size="sm" colorScheme="blue" mr={2}>
                    Editar
                  </Button>
                </Link>
                <Link to={`/imcs-excluir/${imc.id}`}>
                  <Button size="sm" colorScheme="red">
                    Excluir
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default IMCListar;
