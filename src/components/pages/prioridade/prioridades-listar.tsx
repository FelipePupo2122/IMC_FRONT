// front/src/components/pages/prioridade/PrioridadeListar.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Heading } from '@chakra-ui/react';
import { Prioridade } from '../../../Models/Prioridade';

const PrioridadeListar: React.FC = () => {
  const [prioridades, setPrioridades] = useState<Prioridade[]>([]);

  useEffect(() => {
    const fetchPrioridades = async () => {
      try {
        const response = await fetch('http://localhost:5284/api/prioridades/listar');
        if (!response.ok) {
          throw new Error('Falha ao buscar as prioridades');
        }
        const data = await response.json();
        setPrioridades(data);
      } catch (error) {
        console.error('Erro ao buscar prioridades:', error);
      }
    };

    fetchPrioridades();
  }, []);

  const handleExcluir = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta prioridade?')) {
      try {
        await fetch(`http://localhost:5284/api/prioridades/deletar/${id}`, {
          method: 'DELETE',
        });
        setPrioridades((prevPrioridades) => prevPrioridades.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Erro ao excluir prioridade:', error);
      }
    }
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Listar Prioridades
      </Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Tarefa ID</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {prioridades.map((prioridade) => (
            <Tr key={prioridade.id}>
              <Td>{prioridade.id}</Td>
              <Td>{prioridade.nome}</Td>
              <Td>{prioridade.tarefaId}</Td>
              <Td>
                <Button as={Link} to={`/prioridades-editar/${prioridade.id}`} mr={2} colorScheme="blue">
                  Editar
                </Button>
                <Button onClick={() => handleExcluir(prioridade.id!)} colorScheme="red">
                  Excluir
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Link to="/prioridades-cadastrar">
        <Button mt={4} colorScheme="teal">
          Cadastrar Nova Prioridade
        </Button>
      </Link>
    </Box>
  );
};

export default PrioridadeListar;
