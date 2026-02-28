import React, { useEffect, useState } from 'react';
import { Download, CheckCircle, Loader, FileText, Calendar, DollarSign } from 'lucide-react';
import { getInvoice } from '../../api/user-api';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await getInvoice();
        if (res.success && res.data) {
          setInvoices(res.data);
          if (res.data.length > 0) {
            setSelectedInvoice(res.data[0]);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoice:', error);
        setLoading(false);
      }
    };
    
    fetchInvoice();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDownload = (invoice) => {
    if (!invoice) return;
    
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${invoice.invoiceNo}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; padding: 40px; background: white; color: #000; }
            .invoice-container { max-width: 800px; margin: 0 auto; }
            .header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #0ea5e9; }
            .logo { font-size: 28px; font-weight: bold; color: #0ea5e9; display: flex; align-items: center; gap: 10px; }
            .invoice-title { font-size: 32px; font-weight: bold; color: #1e293b; }
            .invoice-meta { text-align: right; color: #64748b; font-size: 14px; line-height: 1.6; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 14px; font-weight: 600; color: #64748b; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .info-block { padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
            .info-label { font-size: 12px; color: #64748b; margin-bottom: 5px; }
            .info-value { font-size: 15px; color: #1e293b; font-weight: 500; }
            .amount-section { background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 40px; border-radius: 12px; text-align: center; margin: 30px 0; }
            .amount-label { font-size: 14px; opacity: 0.9; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }
            .amount-value { font-size: 52px; font-weight: bold; margin: 10px 0; }
            .status-badge { display: inline-block; padding: 8px 20px; background: #10b981; color: white; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 15px; }
            .details-table { width: 100%; border-collapse: collapse; margin-top: 20px; background: white; }
            .details-table tr { border-bottom: 1px solid #e2e8f0; }
            .details-table td { padding: 15px 10px; }
            .details-table td:first-child { color: #64748b; font-size: 14px; width: 40%; }
            .details-table td:last-child { text-align: right; font-weight: 500; color: #1e293b; font-size: 14px; }
            .tx-hash { font-family: monospace; font-size: 12px; word-break: break-all; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px; }
            @media print {
              body { padding: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div>
                <div class="logo">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0ea5e9"/>
                    <path d="M2 17L12 22L22 17" stroke="#0ea5e9" stroke-width="2"/>
                  </svg>
                  BITTRONEXA
                </div>
                <div style="margin-top: 10px; color: #64748b; font-size: 13px;">
                  Cryptocurrency Investment Platform
                </div>
              </div>
              <div class="invoice-meta">
                <div class="invoice-title">INVOICE</div>
                <div style="margin-top: 10px;">
                  <strong>${invoice.invoiceNo}</strong>
                </div>
                <div style="margin-top: 5px;">
                  Issued: ${formatDate(invoice.issuedAt)}
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Bill To</div>
              <div class="info-grid">
                <div class="info-block">
                  <div class="info-label">Customer Name</div>
                  <div class="info-value">${invoice.userId.name}</div>
                </div>
                <div class="info-block">
                  <div class="info-label">Username</div>
                  <div class="info-value">${invoice.userId.username}</div>
                </div>
              </div>
              <div style="margin-top: 15px;">
                <div class="info-block">
                  <div class="info-label">Email Address</div>
                  <div class="info-value">${invoice.userId.email}</div>
                </div>
              </div>
            </div>

            <div class="amount-section">
              <div class="amount-label">Total Amount</div>
              <div class="amount-value">${invoice.amount} ${invoice.currency}</div>
              <div class="status-badge">✓ ${invoice.status}</div>
            </div>

            <div class="section">
              <div class="section-title">Transaction Details</div>
              <table class="details-table">
                <tr>
                  <td>Investment ID</td>
                  <td>${invoice.investmentId}</td>
                </tr>
                <tr>
                  <td>Transaction Hash</td>
                  <td class="tx-hash">${invoice.txResponse}</td>
                </tr>
                <tr>
                  <td>Payment Status</td>
                  <td><strong style="color: #10b981;">${invoice.status}</strong></td>
                </tr>
                <tr>
                  <td>Payment Date</td>
                  <td>${formatDate(invoice.createdAt)}</td>
                </tr>
                <tr>
                  <td>Currency</td>
                  <td>${invoice.currency}</td>
                </tr>
              </table>
            </div>

            <div class="footer">
              <p><strong>Thank you for your investment!</strong></p>
              <p style="margin-top: 10px;">This is a computer-generated invoice and requires no signature.</p>
              <p style="margin-top: 5px;">For any queries, please contact support@bittronexa.com</p>
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading invoices...</p>
        </div>
      </div>
    );
  }

  if (!invoices || invoices.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No invoices found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invoice List Sidebar */}
          <div className="lg:col-span-1 mt-7">
            <div className="bg-slate-800 rounded-xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-12 h-12 text-cyan-500" />
                All Invoices ({invoices.length})
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {invoices.map((invoice) => (
                  <div
                    key={invoice._id}
                    onClick={() => setSelectedInvoice(invoice)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedInvoice?._id === invoice._id
                        ? 'bg-cyan-500 shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xl font-semibold text-white">
                        {invoice.invoiceNo}
                      </span>
                      <span className={`text-lg px-2 py-1 rounded-full ${
                        invoice.status === 'PAID' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-yellow-500 text-slate-900'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xl font-bold text-white mb-1">
                      <DollarSign className="w-8 h-8" />
                      {invoice.amount} {invoice.currency}
                    </div>
                    <div className="flex items-center gap-1 text-xl text-slate-300">
                      <Calendar className="w-8 h-8" />
                      {formatShortDate(invoice.issuedAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Invoice Detail View */}
          <div className="lg:col-span-2">
            {selectedInvoice && (
              <div>
                {/* Download Button */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => handleDownload(selectedInvoice)}
                    className="flex items-center text-xl gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    <Download className="w-10 h-10" />
                    Download Invoice
                  </button>
                </div>

                {/* Invoice Container */}
                <div id="invoice-content" className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-8 text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
                            <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2"/>
                          </svg>
                          <span className="text-3xl font-bold">BITTRONEXA</span>
                        </div>
                        <p className="text-cyan-100 text-xl">Cryptocurrency Investment Platform</p>
                      </div>
                      <div className="text-right">
                        <h1 className="text-4xl font-bold mb-2">INVOICE</h1>
                        <p className="text-cyan-100 text-lg">{selectedInvoice.invoiceNo}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Bill To Section */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-slate-500 uppercase tracking-wider mb-4">Bill To</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                          <p className="text-xl text-slate-500 mb-1">Customer Name</p>
                          <p className="font-semibold text-lg text-slate-900">{selectedInvoice.userId.name}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                          <p className="text-xl text-slate-500 mb-1">Username</p>
                          <p className="font-semibold text-lg text-slate-900">{selectedInvoice.userId.username}</p>
                        </div>
                      </div>
                      <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <p className="text-xl text-slate-500 mb-1">Email Address</p>
                        <p className=" text-lg font-semibold text-slate-900">{selectedInvoice.userId.email}</p>
                      </div>
                    </div>

                    {/* Amount Section */}
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl p-8 text-center mb-8 shadow-lg">
                      <p className="text-cyan-100 text-2xl uppercase tracking-wider mb-2">Total Amount</p>
                      <p className="text-6xl font-bold text-white mb-4">{selectedInvoice.amount} {selectedInvoice.currency}</p>
                      <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-2xl font-semibold">
                        <CheckCircle className="w-10 h-10" />
                        {selectedInvoice.status}
                      </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-slate-500 uppercase tracking-wider mb-4">Transaction Details</h2>
                      <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                        <table className="w-full">
                          <tbody className="divide-y divide-slate-200">
                            <tr>
                              <td className="px-4 py-4 text-xl text-slate-600">Investment ID</td>
                              <td className="px-4 py-4 text-xl font-medium text-slate-900 text-right">{selectedInvoice.investmentId}</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-4 text-xl text-slate-600">Transaction Hash</td>
                              <td className="px-4 py-4 text-xl font-mono text-slate-900 text-right break-all">{selectedInvoice.txResponse}</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-4 text-xl text-slate-600">Payment Status</td>
                              <td className="px-4 py-4 text-xl font-semibold text-green-600 text-right">{selectedInvoice.status}</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-4 text-xl text-slate-600">Payment Date</td>
                              <td className="px-4 py-4 text-xl font-medium text-slate-900 text-right">{formatDate(selectedInvoice.createdAt)}</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-4 text-xl text-slate-600">Issued Date</td>
                              <td className="px-4 py-4 text-xl font-medium text-slate-900 text-right">{formatDate(selectedInvoice.issuedAt)}</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-4 text-xl text-slate-600">Currency</td>
                              <td className="px-4 py-4 text-xl font-medium text-slate-900 text-right">{selectedInvoice.currency}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-slate-200 pt-8 text-center">
                      <p className="font-semibold text-slate-900 mb-2 text-2xl">Thank you for your investment!</p>
                      <p className="text-xl text-slate-500 mb-1">This is a computer-generated invoice and requires no signature.</p>
                      <p className="text-xl text-slate-500">For any queries, please contact support@bittronexa.com</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;