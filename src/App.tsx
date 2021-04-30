import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import './App.css';
import Menu from './components/Menu';
import Graph from './components/Graph';
import { Adjacency } from './adjacency';

const adjacencyTable = new Adjacency();

function App() {
  return (
    <Box className="App">
      <Flex>
        <Menu adjacencyTable={adjacencyTable} />
        <Graph />
      </Flex>
    </Box>
  );
}

export default App;
