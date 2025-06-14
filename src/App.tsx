import { Box, Flex } from '@chakra-ui/react';
import AppRouter from './router';
import { SideBar, Toaster } from './components';

const App = () => {
  return (
    <Flex>
      <SideBar />
      <Box flex='1' p={4} pr={0} ml={{ base: '100px', sm: '200px' }}>
        <AppRouter />
      </Box>

      <Toaster />
    </Flex>
  );
};

export default App;
