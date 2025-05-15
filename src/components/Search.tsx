import { ChangeEvent } from 'react';
import { Box, Input, Skeleton } from '@chakra-ui/react';

interface IProps {
  search: string;
  setSearch: (value: string) => void;
  isLoading: boolean;
  placeholder?: string;
  width?: string;
}

export const Search = ({
  search,
  setSearch,
  isLoading,
  placeholder = 'Search...',
  width = '300px',
}: IProps) => {
  return (
    <Box>
      {isLoading ? (
        <Skeleton w={width} height='40px' />
      ) : (
        <Input
          w={width}
          placeholder={placeholder}
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          mr='4'
        />
      )}
    </Box>
  );
};
