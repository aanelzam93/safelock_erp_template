import React, { useState } from 'react';
import { STOCK_TRANSFER_DATA, WAREHOUSE_LOCATION_DATA } from '../constants';
import type { StockTransfer } from '../types';

const StockTransferComponent: React.FC = () => {
  const [transfers] = useState<StockTransfer[]>(STOCK_TRANSFER_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const getLocationName = (id: string) => {
    return WAREHOUSE_LOCATION_DATA.find(loc => loc.id === id)?.name || id;
  };

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getLocationName(transfer.fromLocation).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getLocationName(transfer.toLocation).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || transfer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      Draft: 'bg-gray-100 text-gray-700',
      Approved: 'bg-blue-100 text-blue-700',
      'In Transit': 'bg-yellow-100 text-yellow-700',
      Completed: 'bg-green-100 text-green-700',
      Cancelled: 'bg-red-100 text-red-700',
    };
    return styles[status as keyof typeof styles] || styles.Draft;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent mb-2">
          Stock Transfer
        </h1>
        <p className="text-gray-600">Transfer stok antar lokasi gudang</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Transfers</p>
              <p className="text-2xl font-bold text-gray-800">{transfers.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
        </div>

        {['Completed', 'In Transit', 'Approved', 'Draft'].map((status, idx) => {
          const count = transfers.filter(t => t.status === status).length;
          const colors = [
            { from: 'green-400', to: 'green-500', text: 'green-600' },
            { from: 'yellow-400', to: 'yellow-500', text: 'yellow-600' },
            { from: 'blue-400', to: 'blue-500', text: 'blue-600' },
            { from: 'gray-400', to: 'gray-500', text: 'gray-600' }
          ][idx];

          return (
            <div key={status} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{status}</p>
                  <p className={`text-2xl font-bold text-${colors.text}`}>{count}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br from-${colors.from} to-${colors.to} rounded-xl flex items-center justify-center`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari Transfer ID atau Lokasi..."
                className="input w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Approved">Approved</option>
              <option value="In Transit">In Transit</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button className="btn btn-primary">
              + Create Transfer
            </button>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Transfer ID</th>
                <th>From Location</th>
                <th>To Location</th>
                <th>Transfer Date</th>
                <th>Requested By</th>
                <th>Items</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransfers.map((transfer) => (
                <tr key={transfer.id}>
                  <td className="font-mono text-sm font-semibold">{transfer.id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                        {getLocationName(transfer.fromLocation)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                        {getLocationName(transfer.toLocation)}
                      </span>
                    </div>
                  </td>
                  <td className="text-sm">{transfer.transferDate}</td>
                  <td className="text-sm">{transfer.requestedBy}</td>
                  <td>
                    <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded">
                      {transfer.itemCount} items
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(transfer.status)}`}>
                      {transfer.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800" title="View">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {transfer.status === 'Draft' && (
                        <button className="text-green-600 hover:text-green-800" title="Approve">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      )}
                      <button className="text-purple-600 hover:text-purple-800" title="Print">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockTransferComponent;
