export type Customer = {
  CustomerID: string;
  Name: string;
  Surname: string;
  BirthDate: string;
  GSMNumber: string;
  CardNumber?: string;
  id?: string; // added by json-server
};
