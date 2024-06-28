// pages/status/status-cadastrar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Box, Heading, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Status } from "../../../Models/Status";

function StatusCadastrar() {
  const [status, setStatus] = useState<Status>({ nome: "", tarefaId: "" });

  async function cadastrarStatus() {
    const response = await fetch("http://localhost:5284/api/status/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    });

    if (response.ok) {
      alert("Status cadastrado com sucesso!");
      setStatus({ nome: "", tarefaId: "" }); // Limpa o formulário após o cadastro
    } else {
      alert("Erro ao cadastrar status.");
    }
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>Cadastrar Status</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cadastrarStatus();
        }}
      >
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
          Cadastrar
        </Button>
      </form>
      <Link to="/status-listar">
        <Button mt={4} colorScheme="teal">Voltar para Listagem</Button>
      </Link>
    </Box>
  );
}

export default StatusCadastrar;
