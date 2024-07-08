import React from "react";
import { Box, Container, Flex, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { Button, Menu, MenuButton, MenuOptionGroup, MenuItem } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import IMCListar from "./components/pages/imc/imcs-listar";
import IMCCadastrar from "./components/pages/imc/imcs-cadastrar";
import IMCEditar from "./components/pages/imc/imcs-editar";
import IMCExcluir from "./components/pages/imc/imcs-excluir";
import UsuarioListar from "./components/pages/usuario/usuários-listar";
import UsuarioCadastrar from "./components/pages/usuario/usuários-cadastrar";
import UsuarioEditar from "./components/pages/usuario/usuários-editar";
import UsuarioExcluir from "./components/pages/usuario/usuários-excluir";
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
            <Heading size="lg">Gerenciador de IMC</Heading>
            <Stack direction="row" spacing={4}>
              <MyButton>IMCs</MyButton>
              <MyButton>Usuários</MyButton>
            </Stack>
          </Flex>
          <Routes>
            <Route path="/" element={<IMCListar />} />
            <Route path="/imcs-cadastrar" element={<IMCCadastrar />} />
            <Route path="/imcs-editar/:id" element={<IMCEditar />} />
            <Route path="/imcs-listar" element={<IMCListar />} />
            <Route path="/imcs-excluir/:id" element={<IMCExcluir />} />
            <Route path="/usuários-cadastrar" element={<UsuarioCadastrar />} />
            <Route path="/usuários-editar/:id" element={<UsuarioEditar />} />
            <Route path="/usuários-listar" element={<UsuarioListar />} />
            <Route path="/usuários-excluir/:id" element={<UsuarioExcluir />} />
          </Routes>
          <Box as="footer" mt={8} textAlign="center">
            <p>Desenvolvido por Felipe Pupo</p>
            <p>Para edição e exclusão tanto dos usuarios quanto dos imcs ir para a pagina de listar</p>
            <p>E utilizar os botões "editar" e "excluir"</p>
          </Box>
        </Container>
      </Router>
    </ChakraProvider>
  );
}

export default App;
