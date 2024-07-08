import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import { Usuario } from '../../../Models/Usuario';

const UsuariosCadastrar: React.FC = () => {
  const [nome, setNome] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function cadastrarUsuario() {
    const usuario: Usuario = {
      nome,
      dataDeNascimento,
    };

    await fetch('http://localhost:5284/api/usuarios/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(() => {
        navigate('/usuários-listar');
      })
      .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
        setErro(error.message);
      });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Cadastrar Usuário
      </Heading>
      {erro && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {erro}
        </Alert>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cadastrarUsuario();
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
        <FormControl id="dataDeNascimento" mb={4}>
          <FormLabel>Data de Nascimento</FormLabel>
          <Input
            type="date"
            value={dataDeNascimento}
            onChange={(e) => setDataDeNascimento(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Cadastrar
        </Button>
      </form>
      <Link to="/usuários-listar">
        <Button mt={4} colorScheme="teal">
          Voltar para Listagem
        </Button>
      </Link>
    </Box>
  );
};

export default UsuariosCadastrar;
