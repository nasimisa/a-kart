import { Routes, Route, Navigate } from 'react-router-dom';
// import CustomersPage from '../pages/CustomersPage';
// import TransactionsPage from '../pages/TransactionsPage';
// import AuditLogsPage from '../pages/AuditLogsPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/customers' replace />} />
      {/* <Route path="/customers" element={<CustomersPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/audit-logs" element={<AuditLogsPage />} /> */}
    </Routes>
  );
};

export default AppRouter;
