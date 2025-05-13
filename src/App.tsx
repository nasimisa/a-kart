import { Box, Flex } from '@chakra-ui/react';
import AppRouter from './router/AppRouter';
import Sidebar from './components/SideBar';

const App = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex='1' p={4}>
        <AppRouter />
      </Box>
    </Flex>
  );
};

export default App;
