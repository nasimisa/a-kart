import { format } from 'date-fns';
import { Box, Heading, HStack, List, Text, Skeleton } from '@chakra-ui/react';
import { FiCheckCircle, FiCreditCard, FiUserPlus, FiX } from 'react-icons/fi';
import { useGetAuditLogs } from '../../api';
import { ActionType, AuditLog, UserType } from '../../api/models';
import { Empty, Search } from '../../components';
import { useSearchAndFilter } from '../../utilities';

export const AuditLogsList = () => {
  const { data: auditLogs, isLoading } = useGetAuditLogs();

  const { search, setSearch, filteredData } = useSearchAndFilter<AuditLog>(auditLogs, [
    'timestamp',
    'action',
    'user',
  ]);

  const getActionIcon = (action: ActionType) => {
    switch (action) {
      case ActionType.CREATE_CUSTOMER:
        return <FiUserPlus size={20} />;
      case ActionType.DELETE_CARD:
        return <FiX color='red' fontWeight={600} size={20} />;
      case ActionType.ADD_CARD:
        return <FiCreditCard color='#9086FF' size={20} />;
      default:
        return <FiCheckCircle />;
    }
  };

  const getUserLabel = (action: UserType) => {
    switch (action) {
      case UserType.FRONT_OFFICE_AGENT:
        return 'Front office Agent';
      case UserType.CALL_CENTER_AGENT:
        return 'Call center Agent';
      case UserType.ADMIN:
        return 'Admin';
      default:
        return '-';
    }
  };

  return (
    <Box p='6'>
      <Heading size='3xl' mb={4}>
        Audit logs
      </Heading>

      <Search
        search={search}
        setSearch={setSearch}
        isLoading={isLoading}
        placeholder='Search by date, action or user who did the action'
        width='350px'
      />

      {!isLoading && !filteredData?.length && <Empty />}

      <List.Root
        gap={3}
        variant='plain'
        css={{
          display: 'grid',
          gap: '1rem',
          mt: 4,
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
          ? Array.from({ length: 16 }).map((_, index) => (
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
          : filteredData?.reverse()?.map(log => (
              <HStack align='flex-start' key={log?.id}>
                <List.Indicator asChild color='green.500'>
                  {getActionIcon(log.actionType)}
                </List.Indicator>
                <List.Item
                  borderBottom='1px solid #eee'
                  pb='2'
                  css={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Text fontSize='sm' color='gray.600'>
                    {log?.timestamp ? format(new Date(log.timestamp), 'd MMMM yyyy, HH:mm') : '-'}
                  </Text>
                  <Text fontWeight='medium'>{log.action}</Text>
                  <Text fontSize='sm' color='gray.500'>
                    Performed by: {getUserLabel(log?.user)}
                  </Text>
                  <Text fontSize='sm' color='gray.500'>
                    Reason: {log?.reason ?? 'None'}
                  </Text>
                </List.Item>
              </HStack>
            ))}
      </List.Root>
    </Box>
  );
};
