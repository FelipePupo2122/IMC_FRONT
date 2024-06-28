// front/src/components/pages/prioridade/prioridades-excluir.tsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Box, Heading } from '@chakra-ui/react';

const PrioridadeExcluir: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleExcluir = async () => {
    try {
      await fetch(`http://localhost:5284/api/prioridades/deletar/${id}`, {
        method: 'DELETE',
      });
      navigate('/prioridades-listar');
    } catch (error) {
      console.error('Erro ao excluir prioridade:', error);
    }
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Tem certeza que deseja excluir esta prioridade?
      </Heading>
      <Button onClick={handleExcluir} colorScheme="red">
        Excluir
      </Button>
      <Link to="/prioridades-listar">
        <Button ml={4} colorScheme="teal">
          Cancelar
        </Button>
      </Link>
    </Box>
  );
};

export default PrioridadeExcluir;
