import React, { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import EdgeInput from './EdgeInput';
import EdgeList from './EdgeList';
import { Adjacency, Edge } from '../adjacency';

export default function Menu({
  adjacencyTable,
}: {
  adjacencyTable: Adjacency;
}) {
  const [edges, setEdges] = useState<Edge[]>([]);

  const addEdge = (edge: Edge) => {
    console.log(adjacencyTable.edges);
    adjacencyTable.addEdge(edge);
    setEdges([...adjacencyTable.edges]);
    console.log(adjacencyTable.edges);
  };

  return (
    <Flex flexDirection="column" flex={1} p={10} maxHeight={window.innerHeight}>
      <Heading color="brand.200" size="xl" m={5} textAlign="center">
        Travelling Salesman
      </Heading>
      <EdgeInput addEdge={addEdge} />

      <EdgeList edges={edges} />
    </Flex>
  );
}
