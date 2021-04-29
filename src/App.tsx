import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import './App.css';
import Menu from './components/Menu';
import Graph from './components/Graph';

function App() {
  return (
    <Box className="App">
      <Flex>
        <Menu />
        <Graph />
      </Flex>
    </Box>
  );
}

export default App;
