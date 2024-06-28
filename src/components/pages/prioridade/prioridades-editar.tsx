// front/src/components/pages/prioridade/PrioridadeEditar.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Box, Heading, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Prioridade } from '../../../Models/Prioridade';

const PrioridadeEditar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [prioridade, setPrioridade] = useState<Prioridade | null>(null);
  const [nome, setNome] = useState('');
  const [tarefaId, setTarefaId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrioridade = async () => {
      try {
        const response = await fetch(`http://localhost:5284/api/prioridades/buscar/${id}`);
        if (!response.ok) {
          throw new Error('Prioridade não encontrada');
        }
        const data = await response.json();
        setPrioridade(data);
        setNome(data.nome);
        setTarefaId(data.tarefaId);
      } catch (error) {
        console.error('Erro ao buscar prioridade:', error);
      }
    };

    fetchPrioridade();
  }, [id]);

  const handleEditar = async () => {
    if (!prioridade) return;

    const updatedPrioridade: Prioridade = {
      ...prioridade,
      nome,
      tarefaId,
    };

    try {
      const response = await fetch(`http://localhost:5284/api/prioridades/alterar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPrioridade),
      });

      if (response.ok) {
        navigate('/prioridades-listar');
      } else {
        throw new Error('Erro ao editar prioridade');
      }
    } catch (error) {
      console.error('Erro ao editar prioridade:', error);
    }
  };

  if (!prioridade) {
    return <div>Carregando...</div>;
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Editar Prioridade
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditar();
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
          Salvar
        </Button>
      </form>
    </Box>
  );
};

export default PrioridadeEditar;
