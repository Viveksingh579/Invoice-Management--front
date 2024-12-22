import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import Login from './components/Login';
import Register from './components/Register';
import InvoiceDashboard from './components/InvoiceDashboard';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import InsertInvoice from './components/InsertInvoice';
import DeleteInvoice from './components/DeleteInvoice';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/invoicedas" element={<PrivateRoute><InvoiceDashboard /></PrivateRoute>} />
          <Route path="/insert-invoice" element={<PrivateRoute><InsertInvoice /></PrivateRoute>} /> 
          <Route path="/delete-invoice" element={<PrivateRoute><DeleteInvoice /></PrivateRoute>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
