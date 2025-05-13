import { useGetCustomers } from '../api';

const Customers = () => {
  const { data: customers, isLoading } = useGetCustomers();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Customers</h1>
      {customers?.map((customer: any) => (
        <pre key={customer.CustomerID}>{JSON.stringify(customer, null, 2)}</pre>
      ))}
    </div>
  );
};

export default Customers;
