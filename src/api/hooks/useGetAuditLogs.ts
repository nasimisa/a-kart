import { useQuery } from '@tanstack/react-query';
import { api } from '../client';
import { AuditLog } from '../models';

const getAuditLogs = async () => {
  const { data } = await api.get<AuditLog[]>('/auditLogs');

  return data;
};

export const AUDIT_LOGS_QUERY_KEY = 'audit-logs';

export const useGetAuditLogs = () =>
  useQuery({
    queryKey: [AUDIT_LOGS_QUERY_KEY],
    queryFn: getAuditLogs,
  });
