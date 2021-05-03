import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import './App.css';
import Menu from './components/Menu';
import Graph from './components/Graph';
import { Adjacency } from './adjacency';

const adjacencyTable = new Adjacency();

function App() {
  const [answer, setAnswer] = useState('');

  const solve = () => {
    getShortestPath(adjacencyTable.getTable());
  };

  return (
    <Box className="App">
      <Flex>
        <Menu adjacencyTable={adjacencyTable} solve={solve} />
        <Graph answer={answer} />
      </Flex>
    </Box>
  );
}

export default App;
