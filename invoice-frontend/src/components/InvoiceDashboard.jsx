import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './InvoiceDashboard.css';

const InvoiceDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [financialYear, setFinancialYear] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Log token for debugging
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/invoices`, {
          headers: { 'x-auth-token': token }
        });
        console.log('Invoices fetched:', response.data); // Log fetched data
        setInvoices(response.data);
        setFilteredInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  const handleSearch = () => {
    const filtered = invoices.filter(invoice =>
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (financialYear ? invoice.financialYear === financialYear : true)
    );
    setFilteredInvoices(filtered);
  };

  return (
    <div className="invoice-dashboard">
      <h1 className="dashboard-title">Invoice Dashboard</h1>
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search by Invoice Number"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Filter by Financial Year"
          value={financialYear}
          onChange={e => setFinancialYear(e.target.value)}
          className="filter-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div className="invoice-actions">
        <Link to="/insert-invoice" className="action-button">Insert Invoice</Link>
        <Link to="/delete-invoice" className="action-button">Delete Invoice</Link>
      </div>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>Invoice Amount</th>
            <th>Financial Year</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map(invoice => (
            <tr key={invoice.invoiceNumber}>
              <td>{invoice.invoiceNumber}</td>
              <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
              <td>{invoice.invoiceAmount}</td>
              <td>{invoice.financialYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDashboard;
