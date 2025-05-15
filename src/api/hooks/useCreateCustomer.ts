import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api, queryClient } from '../client';
import { Customer } from '../models';
import { CUSTOMERS_QUERY_KEY } from './useGetCustomers';

const createCustomer = async (params: Customer) => {
  const { data } = await api.post<Customer>('/customers', params);

  return data;
};

export const CREATE_CUSTOMER_MUTATION_KEY = 'customer/create';

export const useCreateCustomer = ({
  onSuccess,
  ...options
}: UseMutationOptions<Customer, unknown, Customer>) =>
  useMutation({
    mutationKey: [CREATE_CUSTOMER_MUTATION_KEY],
    mutationFn: createCustomer,
    onSuccess: (data, variables, context) => {
      void queryClient.invalidateQueries({ queryKey: [CUSTOMERS_QUERY_KEY] });

      onSuccess?.(data, variables, context);
    },
    ...options,
  });
