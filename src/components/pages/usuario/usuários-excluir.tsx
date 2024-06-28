import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Box, Heading } from "@chakra-ui/react";

function UsuarioExcluir() {
  const { id } = useParams();

  async function excluirUsuario() {
    await fetch(`http://localhost:5284/api/usuarios/deletar/${id}`, {
      method: "DELETE"
    });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Tem certeza que deseja excluir este usuário?
      </Heading>
      <Button onClick={excluirUsuario} colorScheme="red">
        Excluir
      </Button>
      <Link to="/usuários-listar">
        <Button ml={4} colorScheme="teal">
          Cancelar
        </Button>
      </Link>
    </Box>
  );
}

export default UsuarioExcluir;
