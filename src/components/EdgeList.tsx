import { Box, List, ListItem, Text } from '@chakra-ui/layout';
import React from 'react';
import { Edge } from '../adjacency';

export default function EdgeList({ edges }: { edges: Edge[] }) {
  return (
    <Box flex="3" mt={5} mb={5} overflow="auto">
      <List minHeight="min-content">
        {edges
          .slice(0)
          .reverse()
          .map((e, i) => {
            return (
              <ListItem key={i}>
                <Text fontSize="xl">{e.toString()}</Text>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
}
