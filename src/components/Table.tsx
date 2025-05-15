import { Table as T, Skeleton } from '@chakra-ui/react';
import { Empty } from './Empty';
import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  headerColor?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  maxWidth?: number | string;
  maxHeight?: string;
  skeletonRowCount?: number;
  showColumnBorder?: boolean;
  stickyHeader?: boolean;
  headerBg?: string;
}

export function Table<T>({
  columns,
  data,
  isLoading = false,
  maxWidth = 1200,
  maxHeight = '79vh',
  skeletonRowCount = 50,
  showColumnBorder = true,
  stickyHeader = true,
  headerBg = '#9086FF',
}: TableProps<T>) {
  return (
    <T.ScrollArea
      borderWidth='1px'
      maxW={{ base: '500px', md: maxWidth }}
      maxH={{ base: '50vh', xl: maxHeight }}
      rounded='lg'
    >
      <T.Root
        showColumnBorder={showColumnBorder}
        stickyHeader={stickyHeader}
        interactive
        maxWidth={maxWidth}
      >
        <T.Header>
          <T.Row bg={headerBg}>
            {columns.map((column, index) => (
              <T.ColumnHeader key={index} color={column.headerColor || '#fff'}>
                {column.header}
              </T.ColumnHeader>
            ))}
          </T.Row>
        </T.Header>
        <T.Body>
          {isLoading
            ? Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
                <T.Row key={`skeleton-${rowIndex}`}>
                  {columns.map((_, cellIndex) => (
                    <T.Cell key={`skeleton-cell-${rowIndex}-${cellIndex}`}>
                      <Skeleton height='20px' />
                    </T.Cell>
                  ))}
                </T.Row>
              ))
            : data?.map((item, rowIndex) => (
                <T.Row key={rowIndex}>
                  {columns.map((column, cellIndex) => (
                    <T.Cell key={`cell-${rowIndex}-${cellIndex}`}>
                      {typeof column.accessor === 'function'
                        ? column.accessor(item)
                        : (item[column.accessor] as ReactNode)}
                    </T.Cell>
                  ))}
                </T.Row>
              ))}
        </T.Body>
      </T.Root>

      {!isLoading && !data?.length && <Empty />}
    </T.ScrollArea>
  );
}
