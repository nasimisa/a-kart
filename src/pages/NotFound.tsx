import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Box textAlign='center' mt='20'>
      <Heading size='2xl' mb='4'>
        404
      </Heading>
      <Text fontSize='lg' mb='6'>
        Page not found
      </Text>
      <Link to='/'>
        <Button>Go back to Home page</Button>
      </Link>
    </Box>
  );
}
