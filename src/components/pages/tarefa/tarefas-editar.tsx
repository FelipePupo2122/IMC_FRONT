import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tarefa } from "../../../Models/Tarefa";
import { Box, Button, FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";

function TarefaEditar() {
  const { id } = useParams();
  const [tarefa, setTarefa] = useState<Tarefa | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTarefa() {
      const response = await fetch(`http://localhost:5284/api/tarefas/buscar/${id}`);
      const data = await response.json();
      setTarefa(data);
    }

    fetchTarefa();
  }, [id]);

  async function editarTarefa() {
    if (tarefa) {
      await fetch(`http://localhost:5284/api/tarefas/alterar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tarefa),
      })
        .then((resposta) => resposta.json())
        .then((tarefaEditada: Tarefa) => {
          console.log(tarefaEditada);
          navigate("/tarefas-listar");
        });
    }
  }

  if (!tarefa) {
    return <div>Carregando...</div>;
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Editar Tarefa
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editarTarefa();
        }}
      >
        <FormControl id="nome" mb={4}>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={tarefa.nome}
            onChange={(e) => setTarefa({ ...tarefa, nome: e.target.value })}
            required
          />
        </FormControl>
        <FormControl id="descricao" mb={4}>
          <FormLabel>Descrição</FormLabel>
          <Input
            type="text"
            value={tarefa.descricao}
            onChange={(e) => setTarefa({ ...tarefa, descricao: e.target.value })}
            required
          />
        </FormControl>
        <FormControl id="prazo" mb={4}>
          <FormLabel>Prazo</FormLabel>
          <Input
            type="text"
            value={tarefa.prazo ? tarefa.prazo.toString() : ""}
            onChange={(e) => setTarefa({ ...tarefa, prazo: parseFloat(e.target.value) })}
            required
          />
        </FormControl>
        <FormControl id="categoria" mb={4}>
          <FormLabel>Categoria</FormLabel>
          <Input
            type="text"
            value={tarefa.categoria}
            onChange={(e) => setTarefa({ ...tarefa, categoria: e.target.value })}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Atualizar
        </Button>
      </form>
    </Box>
  );
}

export default TarefaEditar;
