import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import './App.css';
import Menu from './components/Menu';
import Result from './components/Result';
import { Adjacency } from './adjacency';
import getShortestPath from './solver';

const adjacencyTable = new Adjacency();

function App() {
  const [answer, setAnswer] = useState<{ vertices: string[]; cost: number }>();
  const [loading, setLoading] = useState(false);

  const solve = async () => {
    setLoading(true);
    const result = await getShortestPath(adjacencyTable.getTable());
    const vertices = adjacencyTable.indexesToVertices(result);
    setAnswer({
      vertices,
      cost: adjacencyTable.calculateCost(vertices),
    });
    setLoading(false);
  };

  return (
    <Box className="App" pt="10%" paddingX="5%" justifyContent="center">
      <Flex flex={5}>
        <Menu adjacencyTable={adjacencyTable} solve={solve} loading={loading} />
        <Result answer={answer} />
      </Flex>
    </Box>
  );
}

export default App;
