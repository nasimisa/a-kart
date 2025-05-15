import { Box, HStack, List as ChakraList, Skeleton } from '@chakra-ui/react';
import { Fragment, ReactNode } from 'react';
import { Empty } from './Empty';

interface IProps<T> {
  items: T[] | undefined;
  isLoading: boolean;
  renderItem: (item: T) => ReactNode;
  skeletonCount?: number;
}

export const List = <T,>({ items, isLoading, renderItem, skeletonCount = 16 }: IProps<T>) => {
  return (
    <>
      {!isLoading && !items?.length && <Empty />}

      <ChakraList.Root
        gap={3}
        variant='plain'
        css={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(1, 1fr)', // base
          '@media(min-width: 48em)': {
            // md = 768px = 48em
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media(min-width: 62em)': {
            // lg = 992px = 62em
            gridTemplateColumns: 'repeat(4, 1fr)',
          },
        }}
      >
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <HStack align='flex-start' key={`skeleton-${index}`}>
                <Skeleton width='20px' height='20px' borderRadius='sm' />
                <Box
                  borderBottom='1px solid #eee'
                  pb='2'
                  display='flex'
                  flexDirection='column'
                  width='100%'
                >
                  <Skeleton height='16px' width='120px' mb='8px' />
                  <Skeleton height='16px' width='200px' mb='8px' />
                  <Skeleton height='16px' width='150px' mb='8px' />
                  <Skeleton height='16px' width='180px' />
                </Box>
              </HStack>
            ))
          : items
              ?.reverse()
              .map((item, index) => <Fragment key={index}>{renderItem(item)}</Fragment>)}
      </ChakraList.Root>
    </>
  );
};
