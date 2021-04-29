import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useRef, useState } from 'react';

export default function EdgeInput() {
  const [edgeText, setEdgeText] = useState('');
  const wasEdited = useRef(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!validateText(edgeText) && wasEdited.current) {
      const timeout = setTimeout(() => {
        setShowError(true);
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
    console.log(edgeText);
    setEdgeText('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEdge = e.target.value;
    wasEdited.current = newEdge.length ? true : false;
    setShowError(false);
    setEdgeText(newEdge);
  };

  const validateText = (edge: string) => {
    return /^ *[A-z][A-z0-9]* +[A-z][A-z0-9]* +\d+ *$/.exec(edge)
      ? true
      : false;
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Input
          value={edgeText}
          placeholder="A B 10"
          color="brand.400"
          size="lg"
          errorBorderColor="brand.300"
          focusBorderColor={showError ? 'brand.300' : 'brand.200'}
          maxWidth="100%"
          fontSize="xl"
          onChange={handleChange}
          isInvalid={showError}
        ></Input>
      </form>
    </Box>
  );
}
