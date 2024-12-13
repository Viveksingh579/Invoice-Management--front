import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/invoices`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      <h1>Invoices</h1>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.invoiceNumber}>
            {invoice.invoiceNumber} - {invoice.invoiceAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
