const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Create Invoice
router.post('/', async (req, res) => {
    try {
        const { invoiceNumber, invoiceDate, invoiceAmount, financialYear } = req.body;
        console.log('Creating Invoice with:', req.body); // Log the incoming request body
        let invoice = new Invoice({ invoiceNumber, invoiceDate, invoiceAmount, financialYear });
        await invoice.save();
        res.status(201).json(invoice);
    } catch (err) {
        console.error('Error creating invoice:', err.message); // Log the error message
        res.status(500).json({ error: err.message });
    }
});

// Update Invoice
router.put('/:invoiceNumber', async (req, res) => {
    try {
        const invoiceNumber = req.params.invoiceNumber;
        const { invoiceDate, invoiceAmount, financialYear } = req.body;
        console.log(`Updating Invoice ${invoiceNumber} with:`, req.body); // Log the incoming request body
        let invoice = await Invoice.findOneAndUpdate({ invoiceNumber }, { invoiceDate, invoiceAmount, financialYear }, { new: true, runValidators: true });
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
        res.json(invoice);
    } catch (err) {
        console.error('Error updating invoice:', err.message); // Log the error message
        res.status(500).json({ error: err.message });
    }
});

// Delete Invoice
router.delete('/:invoiceNumber', async (req, res) => {
    try {
        const invoiceNumber = req.params.invoiceNumber;
        console.log(`Deleting Invoice ${invoiceNumber}`); // Log the invoice number
        let invoice = await Invoice.findOneAndDelete({ invoiceNumber });
        if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
        res.json({ message: 'Invoice deleted' });
    } catch (err) {
        console.error('Error deleting invoice:', err.message); // Log the error message
        res.status(500).json({ error: err.message });
    }
});

// Get All Invoices
router.get('/', async (req, res) => {
    try {
        console.log('Fetching all invoices'); // Log the request
        const invoices = await Invoice.find();
        res.json(invoices);
    } catch (err) {
        console.error('Error fetching invoices:', err.message); // Log the error message
        res.status(500).json({ error: err.message });
    }
});

// Filter Invoices by Financial Year
router.get('/filter/:query', async (req, res) => {
    try {
        const financialYear  = req.params['query'];
        console.log(`Filtering invoices for financial year: ${financialYear}`); // Log the query parameter
        const invoices = await Invoice.find({ financialYear });
        res.json(invoices);
    } catch (err) {
        console.error('Error filtering invoices:', err.message); // Log the error message
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
