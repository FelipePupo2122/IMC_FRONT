import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Box, FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";
import { Usuario } from "../../../Models/Usuario";

function UsuarioEditar() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState<Usuario>({
    nome: "",
    idade: 0,
  });

  useEffect(() => {
    async function fetchUsuario() {
      const response = await fetch(`http://localhost:5284/api/usuarios/buscar/${id}`);
      const data = await response.json();
      setUsuario(data);
    }

    fetchUsuario();
  }, [id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await fetch(`http://localhost:5284/api/usuarios/alterar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuario)
    });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Editar Usuário
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="nome" mb={4}>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            value={usuario.nome}
            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
            required
          />
        </FormControl>
        <FormControl id="idade" mb={4}>
          <FormLabel>Idade</FormLabel>
          <Input
            type="number"
            value={usuario.idade}
            onChange={(e) => setUsuario({ ...usuario, idade: parseInt(e.target.value) })}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Atualizar
        </Button>
      </form>
      <Link to="/usuários-listar">
        <Button mt={4} colorScheme="teal">
          Cancelar
        </Button>
      </Link>
    </Box>
  );
}

export default UsuarioEditar;
