import { Box, List, ListItem, Text } from '@chakra-ui/layout';
import React from 'react';

export default function EdgeList() {
  return (
    <Box flex="3" mt={5} mb={5} overflow="auto">
      <List minHeight="min-content">
        {Array.from({ length: 15 }).map((_, i) => {
          return (
            <ListItem key={i}>
              <Text fontSize="xl">{i}</Text>{' '}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
