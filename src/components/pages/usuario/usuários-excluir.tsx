import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Button, Text, Heading } from '@chakra-ui/react';
import { Usuario } from '../../../Models/Usuario';

const UsuariosExcluir: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsuario() {
      const resposta = await fetch(`http://localhost:5284/api/usuarios/buscar/${id}`);
      const dados = await resposta.json();
      setUsuario(dados);
    }
    fetchUsuario();
  }, [id]);

  async function excluirUsuario() {
    await fetch(`http://localhost:5284/api/usuarios/deletar/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao excluir usuário');
        }
        return response.json();
      })
      .then(() => {
        navigate('/usuários-listar');
      })
      .catch(error => {
        console.error('Erro ao excluir usuário:', error);
      });
  }

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={5}>
        Excluir Usuário
      </Heading>
      {usuario && (
        <>
          <Text mb={4}>Tem certeza que deseja excluir o usuário "{usuario.nome}"?</Text>
          <Button colorScheme="red" onClick={excluirUsuario}>
            Excluir
          </Button>
        </>
      )}
      <Link to="/usuários-listar">
        <Button mt={4} colorScheme="teal">
          Voltar para Listagem
        </Button>
      </Link>
    </Box>
  );
};

export default UsuariosExcluir;
