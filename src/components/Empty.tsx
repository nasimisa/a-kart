import { EmptyState, VStack } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export const Empty = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator fontSize={50}>
          <FiSearch />
        </EmptyState.Indicator>
        <VStack textAlign='center'>
          <EmptyState.Title>Nothing found</EmptyState.Title>
          <EmptyState.Description>Try to change your search parameters</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
