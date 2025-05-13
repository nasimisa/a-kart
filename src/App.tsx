import { Box, Flex } from '@chakra-ui/react';
import AppRouter from './router';
import { SideBar } from './components';

const App = () => {
  return (
    <Flex>
      <SideBar />
      <Box flex='1' p={4} ml='200px'>
        <AppRouter />
      </Box>
    </Flex>
  );
};

export default App;
