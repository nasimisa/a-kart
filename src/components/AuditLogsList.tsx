import { Box, Heading, HStack, Input, List, Spacer, Text } from '@chakra-ui/react';
import { useGetAuditLogs } from '../api';
import { useState } from 'react';
import { FiCheckCircle, FiCreditCard, FiUserPlus, FiX } from 'react-icons/fi';
import { ActionType, UserType } from '../api/models';

export const AuditLogsList = () => {
  const { data: customers, isLoading } = useGetAuditLogs();
  const [search, setSearch] = useState('');

  const filtered = customers?.filter(item => {
    const full = `${item.timestamp} ${item.action} ${item.user}`.toLowerCase();
    return full.includes(search.toLowerCase());
  });

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
      <Spacer />
      <Box mb={4}>
        <Input
          maxW='350px'
          placeholder='Search by date, action or user who did the action'
          value={search}
          onChange={e => setSearch(e.target.value)}
          mr='4'
        />
      </Box>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <List.Root
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
          {filtered?.reverse()?.map(log => (
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
                  {new Date(log.timestamp).toLocaleString()}
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
      )}
    </Box>
  );
};
