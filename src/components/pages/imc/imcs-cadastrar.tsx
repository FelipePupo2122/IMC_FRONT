import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, Select } from '@chakra-ui/react';

const IMCCadastrar: React.FC = () => {
  const [usuarioId, setUsuarioId] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [peso, setPeso] = useState<string>('');
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsuarios() {
      const response = await fetch('http://localhost:5284/api/usuarios/listar');
      const data = await response.json();
      setUsuarios(data);
    }

    fetchUsuarios();
  }, []);

  async function cadastrarIMC() {
    const imc = {
      altura: parseFloat(altura),
      peso: parseFloat(peso)
    };

    await fetch(`http://localhost:5284/api/imcs/cadastrar/${usuarioId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(imc)
    })
    .then((response) => response.json())
    .then(() => {
      navigate('/imcs-listar');
    });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Cadastrar IMC
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cadastrarIMC();
        }}
      >
        <FormControl id="usuarioId" mb={4}>
          <FormLabel>Usuário</FormLabel>
          <Select
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
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
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="peso" mb={4}>
          <FormLabel>Peso (em kg)</FormLabel>
          <Input
            type="text"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Cadastrar
        </Button>
      </form>
      <Link to="/imcs-listar">
        <Button mt={4} colorScheme="teal">
          Voltar para Listagem
        </Button>
      </Link>
    </Box>
  );
};

export default IMCCadastrar;
