// id is added by json-server

export type Customer = {
  id?: string;
  CustomerID: string;
  Name: string;
  Surname: string;
  BirthDate: string;
  GSMNumber: string;
  CardNumber?: string;
};

export type Transaction = {
  id?: string;
  TransactionID: string;
  CustomerID: string;
  TransactionDate: string;
  TransactionAmount: string;
};

export enum ActionType {
  CREATE_CUSTOMER = 'CREATE_CUSTOMER',
  ADD_CARD = 'ADD_CARD',
  DELETE_CARD = 'DELETE_CARD',
}

export enum UserType {
  ADMIN = 'ADMIN',
  FRONT_OFFICE_AGENT = 'FRONT_OFFICE_AGENT',
  CALL_CENTER_AGENT = 'CALL_CENTER_AGENT',
}

export type AuditLog = {
  id?: string;
  timestamp: string;
  action: string;
  reason?: string;
  actionType: ActionType;
  user: UserType;
};
