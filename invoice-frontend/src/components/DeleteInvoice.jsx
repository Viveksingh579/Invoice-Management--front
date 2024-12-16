import React, { useState } from 'react';
import axios from 'axios';
import './DeleteInvoice.css';
import { Link } from 'react-router-dom';

const DeleteInvoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/invoices/${invoiceNumber}`, {
        headers: { 'x-auth-token': token }
      });
      setMessage('Invoice deleted successfully!');
    } catch (error) {
      setMessage('Error deleting invoice.');
    }
  };

  return (
    <div className="delete-invoice">
      <div className="invoice-actions">
        <Link to="/invoicedas" className="action-button">InvoiceDashboard</Link>
        <Link to="/insert-invoice" className="action-button">Insert Invoice</Link>
      </div>
      <h2>Delete Invoice</h2>
      <input
        type="text"
        placeholder="Enter Invoice Number"
        value={invoiceNumber}
        onChange={(e) => setInvoiceNumber(e.target.value)}
      />
      <button onClick={handleDelete}>Delete Invoice</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteInvoice;
