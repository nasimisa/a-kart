import { memo, useState } from 'react';
import { VStack, Box, Button, Image, Skeleton } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Customers', to: '/customers' },
  { label: 'Transactions', to: '/transactions' },
  { label: 'Audit Logs', to: '/audit-logs' },
];

const Sidebar = () => {
  const location = useLocation();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <VStack
      align='stretch'
      gap={4}
      w={{
        base: '120px',
        sm: '200px',
      }}
      py={4}
      bg='#C4CAF6'
      position='fixed'
      top={0}
      bottom={0}
    >
      <Box px={4} pb={4}>
        <Link to='/customers'>
          <Image
            src='https://akart.az/images/logo.svg'
            alt='A-Kart Logo'
            objectFit='contain'
            w='full'
            h='auto'
            maxH='60px'
            loading='lazy'
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </Link>
        {!imageLoaded && <Skeleton height='60px' width='100%' />}
      </Box>

      {navItems.map(({ label, to }) => {
        const isActive = location.pathname === to;

        return (
          <Link to={to} key={to}>
            <Button
              w='full'
              variant='ghost'
              color={isActive ? '#fff' : '#1D0C69'}
              bg={isActive ? '#9086FF' : 'transparent'}
              _hover={{ bg: '#9086FF', color: '#fff' }}
              fontSize={16}
            >
              {label}
            </Button>
          </Link>
        );
      })}
    </VStack>
  );
};

export default memo(Sidebar);
