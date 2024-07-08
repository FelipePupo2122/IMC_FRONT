import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Button, Heading } from '@chakra-ui/react';

function IMCExcluir() {
  const { id } = useParams();
  const navigate = useNavigate();

  async function excluirIMC() {
    await fetch(`http://localhost:5284/api/imcs/deletar/${id}`, {
      method: 'DELETE',
    }).then(() => {
      navigate('/imcs-listar');
    });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Tem certeza que deseja excluir este IMC?
      </Heading>
      <Button onClick={excluirIMC} colorScheme="red">
        Excluir
      </Button>
      <Link to="/imcs-listar">
        <Button ml={4} colorScheme="teal">
          Cancelar
        </Button>
      </Link>
    </Box>
  );
}

export default IMCExcluir;
