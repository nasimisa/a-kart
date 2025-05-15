import { Box, Flex, HStack, IconButton, Skeleton, SkeletonText } from '@chakra-ui/react';

export const CustomerCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <Box
          position='relative'
          borderWidth='1px'
          p='4'
          borderRadius='lg'
          boxShadow='md'
          bg='white'
          maxW={400}
          key={index}
        >
          <HStack
            position='absolute'
            top='2'
            right='2'
            bg='purple.100'
            color='purple.800'
            fontSize='xs'
            fontWeight='bold'
            px='2'
            py='1'
            borderRadius='md'
            boxShadow='sm'
          >
            <Skeleton w='70px' h='20px' bg='purple.100' />
          </HStack>

          <SkeletonText maxW={120} mb={1} />

          <Flex align='center' mt={8}>
            <Skeleton w={{ base: '20vw', lg: '10vw' }} h='24px' />

            <IconButton
              ml='2'
              size='xs'
              aria-label='Toggle PAN'
              color='#fff'
              bg='#9086FF'
              loading
            />

            <IconButton ml='2' size='xs' colorPalette='red' aria-label='Remove card' loading />
          </Flex>
        </Box>
      ))}
    </>
  );
};
