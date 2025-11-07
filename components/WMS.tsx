import React, { useState, useMemo } from 'react';
import type { WarehouseLocation } from '../types';
import { WAREHOUSE_LOCATION_DATA } from '../constants';
import { Icon } from './icons/Icon';

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></Icon>
);

const areaStyles = {
  Storage: 'bg-blue-100 text-blue-800',
  Receiving: 'bg-indigo-100 text-indigo-800',
  Picking: 'bg-green-100 text-green-800',
  Quarantine: 'bg-yellow-100 text-yellow-800',
};

const WMS: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = useMemo(() => {
        return WAREHOUSE_LOCATION_DATA.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.id.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [searchTerm]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Warehouse Management System (WMS)</h1>
                    <p className="text-sm text-gray-500">
                        <span className="text-[#4fd1c5] cursor-pointer hover:underline">Beranda</span> &gt; WMS
                    </p>
                </div>
                 <button className="bg-[#4fd1c5] text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-teal-500 transition flex items-center">
                    <PlusIcon className="w-5 h-5 mr-1"/> Tambah Lokasi
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                 <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                    <div className="flex items-center">
                        <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className="border border-gray-300 rounded-lg p-2 mr-2"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                        <span className="text-gray-600">entries per page</span>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by Name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 pl-8"
                        />
                         <Icon className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></Icon>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                            <tr>
                                {['Location ID', 'Name', 'Area', 'Capacity', 'Fill Rate', 'Items'].map(header => (
                                    <th key={header} scope="col" className="px-6 py-3 font-semibold">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map(location => {
                                const fillRate = (location.itemCount / location.capacity) * 100;
                                return (
                                <tr key={location.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-teal-800">{location.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{location.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${areaStyles[location.area]}`}>
                                            {location.area}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{location.capacity} slots</td>
                                    <td className="px-6 py-4">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: `${fillRate}%` }}></div>
                                        </div>
                                        <span className="text-xs">{fillRate.toFixed(1)}%</span>
                                    </td>
                                    <td className="px-6 py-4">{location.itemCount} items</td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-700">
                        Showing {Math.min(1 + (currentPage - 1) * itemsPerPage, filteredData.length)} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                    </span>
                    <div className="flex space-x-1">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded-md bg-white disabled:opacity-50">&lt;</button>
                        {[...Array(totalPages).keys()].map(n => (
                             <button key={n} onClick={() => setCurrentPage(n + 1)} className={`px-3 py-1 border rounded-md ${currentPage === n + 1 ? 'bg-[#4fd1c5] text-white' : 'bg-white'}`}>{n + 1}</button>
                        ))}
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-md bg-white disabled:opacity-50">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WMS;