import { format } from 'date-fns';
import { Box, Heading, HStack, List as ChakraList, Text, VStack } from '@chakra-ui/react';
import { FiCheckCircle, FiCreditCard, FiUserPlus, FiX } from 'react-icons/fi';
import { useGetAuditLogs } from '../../api';
import { ActionType, AuditLog, UserType } from '../../api/models';
import { Search, List } from '../../components';
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

  const renderAuditLog = (log: AuditLog) => (
    <HStack align='flex-start' key={log?.id}>
      <ChakraList.Indicator asChild color='green.500'>
        {getActionIcon(log.actionType)}
      </ChakraList.Indicator>
      <ChakraList.Item
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
      </ChakraList.Item>
    </HStack>
  );

  return (
    <Box p='6'>
      <Heading size='3xl' mb={4}>
        Audit logs
      </Heading>

      <VStack gap={4} alignItems='normal'>
        <Search
          search={search}
          setSearch={setSearch}
          isLoading={isLoading}
          placeholder='Search by date, action or user who did the action'
          width='350px'
        />

        <List items={filteredData} isLoading={isLoading} renderItem={renderAuditLog} />
      </VStack>
    </Box>
  );
};
