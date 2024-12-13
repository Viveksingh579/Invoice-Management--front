const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    invoiceDate: { type: Date, required: true },
    invoiceAmount: { type: Number, required: true },
    financialYear: { type: String, required: true }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;
