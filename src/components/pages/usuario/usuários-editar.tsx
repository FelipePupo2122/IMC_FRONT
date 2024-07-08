import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import { Usuario } from '../../../Models/Usuario';

const UsuariosEditar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nome, setNome] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsuario() {
      const resposta = await fetch(`http://localhost:5284/api/usuarios/buscar/${id}`);
      const dados = await resposta.json();
      setUsuario(dados);
      setNome(dados.nome);
      setDataDeNascimento(dados.dataDeNascimento);
    }
    fetchUsuario();
  }, [id]);

  async function atualizarUsuario() {
    if (usuario) {
      const usuarioAtualizado: Usuario = {
        ...usuario,
        nome,
        dataDeNascimento,
      };

      await fetch(`http://localhost:5284/api/usuarios/alterar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioAtualizado),
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
          console.error('Erro ao atualizar usuário:', error);
          setErro(error.message);
        });
    }
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Editar Usuário
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
          atualizarUsuario();
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
          Atualizar
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

export default UsuariosEditar;
