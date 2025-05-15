import { useQuery } from '@tanstack/react-query';
import { api } from '../client';
import { Customer } from '../models';

const getCustomers = async () => {
  const { data } = await api.get<Customer[]>('/customers');

  return data;
};

export const CUSTOMERS_QUERY_KEY = 'customers';

export const useGetCustomers = () =>
  useQuery({
    queryKey: [CUSTOMERS_QUERY_KEY],
    queryFn: getCustomers,
  });
