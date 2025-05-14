import { useQuery } from '@tanstack/react-query';
import { api } from '../client';
import { Transaction } from '../models';

const getTransactions = async () => {
  const { data } = await api.get<Transaction[]>('/transactions');

  return data;
};

export const TRANSACTIONS_QUERY_KEY = 'transactions';

export const useGetTransactions = () =>
  useQuery({
    queryKey: [TRANSACTIONS_QUERY_KEY],
    queryFn: getTransactions,
  });
