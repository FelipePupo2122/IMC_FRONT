// front/src/components/pages/prioridade/PrioridadeCadastrar.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, Heading, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Prioridade } from '../../../Models/Prioridade';

const PrioridadeCadastrar: React.FC = () => {
  const [nome, setNome] = useState('');
  const [tarefaId, setTarefaId] = useState('');
  const navigate = useNavigate();

  const handleCadastrar = async () => {
    const novaPrioridade: Prioridade = {
      nome,
      tarefaId,
    };

    try {
      const response = await fetch('http://localhost:5284/api/prioridades/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaPrioridade),
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar prioridade');
      }
      navigate('/prioridades-listar');
    } catch (error) {
      console.error('Erro ao cadastrar prioridade:', error);
    }
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Cadastrar Prioridade
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCadastrar();
        }}
      >
        <FormControl id="nome" mb={4}>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="tarefaId" mb={4}>
          <FormLabel>Tarefa ID</FormLabel>
          <Input
            type="text"
            value={tarefaId}
            onChange={(e) => setTarefaId(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Cadastrar
        </Button>
      </form>
      <Link to="/prioridades-listar">
        <Button mt={4} colorScheme="teal">
          Voltar para Listagem
        </Button>
      </Link>
    </Box>
  );
};

export default PrioridadeCadastrar;
