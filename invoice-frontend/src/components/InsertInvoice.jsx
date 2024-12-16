import React, { useState } from 'react';
import axios from 'axios';
import './InsertInvoice.css';
import { Link } from 'react-router-dom';

const InsertInvoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [financialYear, setFinancialYear] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/invoices`, {
        invoiceNumber,
        invoiceDate,
        invoiceAmount,
        financialYear
      }, {
        headers: { 'x-auth-token': token }
      });
      setMessage('Invoice created successfully!');
    } catch (error) {
      setMessage('Error creating invoice.');
    }
  };

  return (
    <div className="insert-invoice">
       <div className="invoice-actions">
        <Link to="/invoicedas" className="action-button">InvoiceDashboard</Link>
        <Link to="/delete-invoice" className="action-button">Delete Invoice</Link>
      </div>
      <h2>Insert Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Invoice Number:</label>
          <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Invoice Date:</label>
          <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Invoice Amount:</label>
          <input type="number" value={invoiceAmount} onChange={(e) => setInvoiceAmount(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Financial Year:</label>
          <input type="text" value={financialYear} onChange={(e) => setFinancialYear(e.target.value)} />
        </div>
        <button type="submit">Create Invoice</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};


export default InsertInvoice;
