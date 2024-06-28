
import React from "react";
import { Box, Container, Flex, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { Button, Menu, MenuButton, MenuOptionGroup, MenuItem } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TarefaListar from "./components/pages/tarefa/tarefas-listar";
import TarefaCadastrar from "./components/pages/tarefa/tarefas-cadastrar";
import TarefaEditar from "./components/pages/tarefa/tarefas-editar";
import TarefaExcluir from "./components/pages/tarefa/tarefas-excluir";
import UsuarioListar from "./components/pages/usuario/usuario-listar";
import UsuarioCadastrar from "./components/pages/usuario/usuario-cadastrar";
import UsuarioEditar from "./components/pages/usuario/usuario-editar";
import UsuarioExcluir from "./components/pages/usuario/usuario-excluir";
import PrioridadeListar from "./components/pages/prioridade/prioridade-listar";
import StatusListar from "./components/pages/status/status-listar";
import { ChakraProvider } from "@chakra-ui/react";

function MyButton({ children }: { children: string }) { 
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu>
      <MenuButton as={Button} onClick={onOpen}>{children}</MenuButton>
      <MenuOptionGroup {...{ isOpen, onClose }}> {/* Spread useDisclosure values */}
        <MenuItem as={Link} to="/tarefas-listar">Listar</MenuItem>
        <MenuItem as={Link} to="/tarefas-cadastrar">Cadastrar</MenuItem>
        <MenuItem as={Link} to="/tarefas-editar/:id">Editar</MenuItem>
        <MenuItem as={Link} to="/tarefas-excluir/:id">Excluir</MenuItem>
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
            <Route path="/usuario-cadastrar" element={<UsuarioCadastrar />} />
            <Route path="/usuario-editar/:id" element={<UsuarioEditar />} />
            <Route path="/usuario-listar" element={<UsuarioListar />} />
            <Route path="/usuario-excluir/:id" element={<UsuarioExcluir />} />
            <Route path="/prioridade-listar" element={<PrioridadeListar />} />
            <Route path="/status-listar" element={<StatusListar />} />
          </Routes>
          <Box as="footer" mt={8} textAlign="center">
            <p>Desenvolvido por Felipe Pupo e Ygor Espada</p>
          </Box>
        </Container>
      </Router>
    </ChakraProvider>
  );
}

export default App;