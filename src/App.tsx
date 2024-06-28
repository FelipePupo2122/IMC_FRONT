import React from "react";
import { Box, Container, Flex, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { Button, Menu, MenuButton, MenuOptionGroup, MenuItem } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TarefaListar from "./components/pages/tarefa/tarefas-listar";
import TarefaCadastrar from "./components/pages/tarefa/tarefas-cadastrar";
import TarefaEditar from "./components/pages/tarefa/tarefas-editar";
import TarefaExcluir from "./components/pages/tarefa/tarefas-excluir";
import UsuarioListar from "./components/pages/usuario/usuários-listar";
import UsuarioCadastrar from "./components/pages/usuario/usuários-cadastrar";
import UsuarioEditar from "./components/pages/usuario/usuários-editar";
import UsuarioExcluir from "./components/pages/usuario/usuários-excluir";
import PrioridadeListar from "./components/pages/prioridade/prioridades-listar";
import PrioridadeCadastrar from "./components/pages/prioridade/prioridades-cadastrar";
import PrioridadeEditar from "./components/pages/prioridade/prioridades-editar";
import PrioridadeExcluir from "./components/pages/prioridade/prioridades-excluir";
import StatusListar from "./components/pages/status/status-listar";
import StatusCadastrar from "./components/pages/status/status-cadastrar";
import StatusEditar from "./components/pages/status/status-editar";
import StatusExcluir from "./components/pages/status/status-excluir";
import { ChakraProvider } from "@chakra-ui/react";

function MyButton({ children }: { children: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu>
      <MenuButton as={Button} onClick={onOpen}>{children}</MenuButton>
      <MenuOptionGroup {...{ isOpen, onClose }}>
        <MenuItem as={Link} to={`/${children.toLowerCase()}-listar`}>Listar</MenuItem>
        <MenuItem as={Link} to={`/${children.toLowerCase()}-cadastrar`}>Cadastrar</MenuItem>
        <MenuItem as={Link} to={`/${children.toLowerCase()}-editar/:id`}>Editar</MenuItem>
        <MenuItem as={Link} to={`/${children.toLowerCase()}-excluir/:id`}>Excluir</MenuItem>
      </MenuOptionGroup>
    </Menu>
  );
}

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Container maxW="container.xl" p={4}>
          <Flex as="nav" mb={8} justifyContent="space-between" alignItems="center">
            <Heading size="lg">Gerenciador de Tarefas</Heading>
            <Stack direction="row" spacing={4}>
              <MyButton>Tarefas</MyButton>
              <MyButton>Usuários</MyButton>
              <MyButton>Prioridades</MyButton>
              <MyButton>Status</MyButton>
            </Stack>
          </Flex>
          <Routes>
            <Route path="/" element={<TarefaListar />} />
            <Route path="/tarefas-cadastrar" element={<TarefaCadastrar />} />
            <Route path="/tarefas-editar/:id" element={<TarefaEditar />} />
            <Route path="/tarefas-listar" element={<TarefaListar />} />
            <Route path="/tarefas-excluir/:id" element={<TarefaExcluir />} />
            <Route path="/usuários-cadastrar" element={<UsuarioCadastrar />} />
            <Route path="/usuários-editar/:id" element={<UsuarioEditar />} />
            <Route path="/usuários-listar" element={<UsuarioListar />} />
            <Route path="/usuários-excluir/:id" element={<UsuarioExcluir />} />
            <Route path="/prioridades-cadastrar" element={<PrioridadeCadastrar />} />
            <Route path="/prioridades-editar/:id" element={<PrioridadeEditar />} />
            <Route path="/prioridades-listar" element={<PrioridadeListar />} />
            <Route path="/prioridades-excluir/:id" element={<PrioridadeExcluir />} />
            <Route path="/status-cadastrar" element={<StatusCadastrar />} />
            <Route path="/status-editar/:id" element={<StatusEditar />} />
            <Route path="/status-listar" element={<StatusListar />} />
            <Route path="/status-excluir/:id" element={<StatusExcluir />} />
          </Routes>
          <Box as="footer" mt={8} textAlign="center">
            <p>Desenvolvido por Felipe Pupo</p>
          </Box>
        </Container>
      </Router>
    </ChakraProvider>
  );
}

export default App;
