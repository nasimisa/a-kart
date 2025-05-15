import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api, queryClient } from '../client';
import { Customer } from '../models';
import { CUSTOMERS_QUERY_KEY } from './useGetCustomers';

const editCustomer = async (params: Customer) => {
  const { data } = await api.put(`/customers/${params?.id}`, params);

  return data;
};

export const EDIT_CUSTOMER_MUTATION_KEY = 'customer/edit';

export const useEditCustomer = ({
  onSuccess,
  ...options
}: UseMutationOptions<Customer, unknown, Customer>) =>
  useMutation({
    mutationKey: [EDIT_CUSTOMER_MUTATION_KEY],
    mutationFn: editCustomer,
    onSuccess: (data, variables, context) => {
      void queryClient.invalidateQueries({ queryKey: [CUSTOMERS_QUERY_KEY] });

      onSuccess?.(data, variables, context);
    },
    ...options,
  });
