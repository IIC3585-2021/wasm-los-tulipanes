import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Spacer } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Edge } from '../adjacency';
import { BsCheck, BsPlus } from 'react-icons/bs';

export default function EdgeInput({
  addEdge,
}: {
  addEdge: (edge: Edge) => void;
}) {
  const [edgeText, setEdgeText] = useState('');
  const wasEdited = useRef(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!Edge.isValidEdge(edgeText) && wasEdited.current) {
      const timeout = setTimeout(() => {
        if (wasEdited.current) {
          setShowError(true);
        }
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      if (showError) {
        setShowError(false);
      }
    }
  }, [edgeText, showError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEdge = Edge.processEdgeText(edgeText);
      addEdge(newEdge);
      setEdgeText('');
      wasEdited.current = false;
      setShowError(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEdge = e.target.value;
    wasEdited.current = newEdge.length ? true : false;
    setShowError(false);
    setEdgeText(newEdge);
  };

  return (
    <Flex justifyContent="space-between">
      <Box flex={10}>
        <form onSubmit={handleSubmit}>
          <Input
            value={edgeText}
            placeholder="A B 10"
            color="brand.400"
            size="lg"
            minW="90%"
            errorBorderColor="brand.300"
            focusBorderColor={showError ? 'brand.300' : 'brand.200'}
            fontSize="xl"
            onChange={handleChange}
            isInvalid={showError}
          ></Input>
        </form>
      </Box>
      <Spacer flex={1} />
      <Button
        bg="brand.400"
        height="100%"
        flex={1}
        color="brand.100"
        onClick={handleSubmit}
      >
        <BsPlus fontSize="2rem" />
      </Button>
      <Spacer flex={1} />
      <Button bg="brand.200" flex={1} height="100%" color="brand.100">
        <BsCheck fontSize="2rem" />
      </Button>
    </Flex>
  );
}
