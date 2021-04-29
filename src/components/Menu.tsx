import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import EdgeInput from './EdgeInput';
import EdgeList from './EdgeList';

export default function Menu() {
  return (
    <Flex flexDirection="column" flex={1} p={10} maxHeight={window.innerHeight}>
      <Heading color="brand.200" size="xl" m={5} textAlign="center">
        Travelling Salesman
      </Heading>
      <EdgeInput />
      <EdgeList />
    </Flex>
  );
}
