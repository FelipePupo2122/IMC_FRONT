// front/src/components/pages/status/StatusEditar.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Box, FormControl, FormLabel, Input, Heading } from '@chakra-ui/react';
import { Status } from '../../../Models/Status';

function StatusEditar() {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<Status>({
    nome: '',
    tarefaId: '',
  });

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch(`http://localhost:5284/api/status/buscar/${id}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar status: ${response.statusText}`);
        }
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error('Erro ao buscar status:', error);
      }
    }

    fetchStatus();
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5284/api/status/alterar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
      });

      if (response.ok) {
        alert('Status atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar status.');
      }
    } catch (error) {
      console.error('Erro ao editar status:', error);
    }
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Editar Status
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="nome" mb={4}>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={status.nome}
            onChange={(e) => setStatus({ ...status, nome: e.target.value })}
            required
          />
        </FormControl>
        <FormControl id="tarefaId" mb={4}>
          <FormLabel>Tarefa ID</FormLabel>
          <Input
            type="text"
            value={status.tarefaId}
            onChange={(e) => setStatus({ ...status, tarefaId: e.target.value })}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Salvar
        </Button>
      </form>
      <Link to="/status-listar">
        <Button mt={4} colorScheme="teal">
          Cancelar
        </Button>
      </Link>
    </Box>
  );
}

export default StatusEditar;
