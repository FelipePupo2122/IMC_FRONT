import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Heading } from "@chakra-ui/react";
import { Tarefa } from "../../../Models/Tarefa";

function TarefaListar() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    async function fetchTarefas() {
      const response = await fetch('http://localhost:5284/api/tarefas/listar');
      const data = await response.json();
      setTarefas(data);
    }

    fetchTarefas();
  }, []);

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Listar Tarefas</Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Descrição</Th>
            <Th>Prazo</Th>
            <Th>Categoria</Th>
            <Th>Usuário ID</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tarefas.map((tarefa) => (
            <Tr key={tarefa.id}>
              <Td>{tarefa.id}</Td>
              <Td>{tarefa.nome}</Td>
              <Td>{tarefa.descricao}</Td>
              <Td>{tarefa.prazo}</Td>
              <Td>{tarefa.categoria}</Td>
              <Td>{tarefa.usuarioId}</Td>
              <Td>
                <Button as={Link} to={`/tarefas-editar/${tarefa.id}`} mr={2} colorScheme="blue">
                  Editar
                </Button>
                <Button as={Link} to={`/tarefas-excluir/${tarefa.id}`} colorScheme="red">
                  Excluir
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default TarefaListar;
