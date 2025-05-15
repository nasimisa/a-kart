import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api, queryClient } from '../client';
import { AuditLog } from '../models';
import { AUDIT_LOGS_QUERY_KEY } from './useGetAuditLogs';

const createAuditLog = async (params: AuditLog) => {
  const { data } = await api.post<AuditLog>('/auditLogs', params);

  return data;
};

export const CREATE_AUDIT_LOG_MUTATION_KEY = 'auditLogs/create';

export const useCreateAuditLog = ({
  onSuccess,
  ...options
}: UseMutationOptions<AuditLog, unknown, AuditLog>) =>
  useMutation({
    mutationKey: [CREATE_AUDIT_LOG_MUTATION_KEY],
    mutationFn: createAuditLog,
    onSuccess: (data, variables, context) => {
      void queryClient.invalidateQueries({ queryKey: [AUDIT_LOGS_QUERY_KEY] });

      onSuccess?.(data, variables, context);
    },
    ...options,
  });
