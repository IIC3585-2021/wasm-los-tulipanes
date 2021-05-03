import React, { useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import EdgeInput from './EdgeInput';
import EdgeList from './EdgeList';
import { Adjacency, Edge } from '../adjacency';

export default function Menu({
  adjacencyTable,
  solve,
  loading,
}: {
  adjacencyTable: Adjacency;
  solve: () => void;
  loading: boolean;
}) {
  const [edges, setEdges] = useState<Edge[]>([]);

  const addEdge = (edge: Edge) => {
    adjacencyTable.addEdge(edge);
    setEdges([...adjacencyTable.edges]);
  };

  return (
    <Flex flexDirection="column" flex={2} p={10} maxHeight={window.innerHeight}>
      <Heading color="brand.200" size="xl" m={5} textAlign="center">
        Travelling Salesman
      </Heading>
      <EdgeInput addEdge={addEdge} solve={solve} loading={loading} />

      <EdgeList edges={edges} />
    </Flex>
  );
}
