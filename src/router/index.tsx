import { Routes, Route, Navigate } from 'react-router-dom';
import Customers from '../pages/Customers';
import Transactions from '../pages/Transactions';
import AuditLogs from '../pages/AuditLogs';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/customers' replace />} />
      <Route path='/customers' element={<Customers />} />
      <Route path='/transactions' element={<Transactions />} />
      <Route path='/audit-logs' element={<AuditLogs />} />
    </Routes>
  );
};

export default AppRouter;
