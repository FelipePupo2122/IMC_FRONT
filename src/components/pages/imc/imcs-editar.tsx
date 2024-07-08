import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, Select } from '@chakra-ui/react';

function IMCEditar() {
  const { id } = useParams();
  const [imc, setIMC] = useState<any>(null); 
  const [usuarios, setUsuarios] = useState<any[]>([]); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchIMC() {
      const response = await fetch(`http://localhost:5284/api/imcs/buscar/${id}`);
      const data = await response.json();
      setIMC(data);
    }

    async function fetchUsuarios() {
      const response = await fetch('http://localhost:5284/api/usuarios/listar');
      const data = await response.json();
      setUsuarios(data);
    }

    fetchIMC();
    fetchUsuarios();
  }, [id]);

  async function editarIMC() {
    if (imc) {
      await fetch(`http://localhost:5284/api/imcs/alterar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imc),
      })
        .then((resposta) => resposta.json())
        .then(() => {
          navigate('/imcs-listar');
        });
    }
  }

  if (!imc) {
    return <div>Carregando...</div>;
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Editar IMC
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editarIMC();
        }}
      >
        <FormControl id="usuarioId" mb={4}>
          <FormLabel>Usuário</FormLabel>
          <Select
            value={imc.usuarioId}
            onChange={(e) => setIMC({ ...imc, usuarioId: e.target.value })}
            required
          >
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="altura" mb={4}>
          <FormLabel>Altura (em metros)</FormLabel>
          <Input
            type="text"
            value={imc.altura.toString()}
            onChange={(e) => setIMC({ ...imc, altura: parseFloat(e.target.value) })}
            required
          />
        </FormControl>
        <FormControl id="peso" mb={4}>
          <FormLabel>Peso (em kg)</FormLabel>
          <Input
            type="text"
            value={imc.peso.toString()}
            onChange={(e) => setIMC({ ...imc, peso: parseFloat(e.target.value) })}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Atualizar
        </Button>
      </form>
      <Link to="/imcs-listar">
        <Button mt={4} colorScheme="teal">
          Voltar para Listagem
        </Button>
      </Link>
    </Box>
  );
}

export default IMCEditar;
