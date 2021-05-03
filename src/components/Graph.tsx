import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function Graph({ answer }: { answer: string }) {
  return (
    <Box flex={2}>
      <Text>{answer}</Text>
    </Box>
  );
}
