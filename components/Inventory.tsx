import React, { useState, useMemo } from 'react';
import type { InventoryItem } from '../types';
import { INVENTORY_DATA } from '../constants';
import { generateInventorySummary } from '../services/geminiService';
import { Icon } from './icons/Icon';

const SortIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className} strokeWidth="1.5">
        <path d="M3 4h18M3 8h12M3 12h8" />
    </Icon>
);
const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></Icon>
);
const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></Icon>
);
const TransferIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path d="M14 9l-4-4-4 4"/><path d="M10 5v14"/><path d="M20 15l-4 4-4-4"/><path d="M16 19V5"/></Icon>
);
const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></Icon>
);
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></Icon>
);


const Inventory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [summary, setSummary] = useState('');
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);

    const categories = ['All', ...Array.from(new Set(INVENTORY_DATA.map(item => item.category)))];

    const filteredData = useMemo(() => {
        return INVENTORY_DATA.filter(item => {
            const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.id.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, categoryFilter]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleGenerateSummary = async () => {
        setIsLoadingSummary(true);
        setSummary('');
        try {
            const result = await generateInventorySummary(INVENTORY_DATA);
            setSummary(result);
        } catch (error) {
            setSummary('Failed to generate summary.');
        } finally {
            setIsLoadingSummary(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Kelola Inventory</h1>
                    <p className="text-sm text-gray-500">
                        <span className="text-[#4fd1c5] cursor-pointer hover:underline">Beranda</span> &gt; Inventory
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                     <button className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition">
                       <SortIcon className="w-5 h-5"/>
                     </button>
                      <button className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition">
                       <SortIcon className="w-5 h-5 rotate-90"/>
                     </button>
                    <button className="bg-[#4fd1c5] text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-teal-500 transition flex items-center">
                        <PlusIcon className="w-5 h-5 mr-1"/> Tambah Item
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gudang</label>
                         <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-400 focus:border-teal-400">
                            <option>Semua Gudang</option>
                        </select>
                    </div>
                    <div className="flex items-end space-x-2 col-span-1 md:col-span-2">
                        <button className="bg-[#4fd1c5] text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-teal-500 transition w-full md:w-auto">Terapkan</button>
                        <button className="bg-gray-200 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition w-full md:w-auto">Atur Ulang</button>
                    </div>
                </div>

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
                            placeholder="Search..."
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
                                {['ID Item', 'Nama Item', 'SKU', 'Lokasi Gudang', 'Stok', 'Harga Pokok', 'Last Update', 'Aksi'].map(header => (
                                    <th key={header} scope="col" className="px-6 py-3 font-semibold">
                                        <div className="flex items-center">
                                            {header}
                                            <Icon className="w-4 h-4 ml-1.5 text-gray-400"><path d="m7 15 5 5 5-5M7 9l5-5 5 5"/></Icon>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map(item => (
                                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full border border-teal-300">#{item.id}</span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                    <td className="px-6 py-4">{item.sku}</td>
                                    <td className="px-6 py-4 font-mono">{item.locationId}</td>
                                    <td className="px-6 py-4">{item.stock} {item.unit}</td>
                                    <td className="px-6 py-4">Rp {item.cost.toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-4">{item.lastUpdated}</td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        <button className="p-2 rounded-md bg-green-500 text-white hover:bg-green-600"><EyeIcon className="w-4 h-4"/></button>
                                        <button className="p-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"><EditIcon className="w-4 h-4"/></button>
                                        <button className="p-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-600"><TransferIcon className="w-4 h-4"/></button>
                                        <button className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600"><TrashIcon className="w-4 h-4"/></button>
                                    </td>
                                </tr>
                            ))}
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

             <div className="mt-6">
                <button
                    onClick={handleGenerateSummary}
                    disabled={isLoadingSummary}
                    className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-300"
                >
                    {isLoadingSummary ? 'Generating...' : 'Generate AI Report Summary'}
                </button>

                {isLoadingSummary && <div className="mt-4 text-center">Loading AI Summary...</div>}
                
                {summary && (
                    <div className="mt-4 bg-white p-6 rounded-xl shadow-md border border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Inventory Analysis Report</h3>
                        <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />') }}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;