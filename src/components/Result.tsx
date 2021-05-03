import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export default function Result({
  answer,
}: {
  answer: { vertices: string[]; cost: number } | undefined;
}) {
  return (
    <Box flex={2} p={10} textAlign="center">
      {answer ? (
        <Text color="brand.200" fontSize="8xl" pt="0.5em">
          {answer.vertices.join(' ')}: {answer.cost}
        </Text>
      ) : null}
    </Box>
  );
}
