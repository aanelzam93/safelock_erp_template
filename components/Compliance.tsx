import React, { useState, useMemo } from 'react';
import type { Regulation } from '../types';
import { REGULATION_DATA } from '../constants';
import { Icon } from './icons/Icon';

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></Icon>
);
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></Icon>
);

const statusStyles: { [key in Regulation['status']]: string } = {
  'Compliant': 'bg-green-100 text-green-800 border-green-300',
  'Pending Review': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Non-Compliant': 'bg-red-100 text-red-800 border-red-300',
};

const Compliance: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    
    const filteredData = useMemo(() => {
        return REGULATION_DATA.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.issuingBody.toLowerCase().includes(searchTerm.toLowerCase())
        );
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
                    <h1 className="text-2xl font-bold text-gray-800">Regulatory & Compliance</h1>
                    <p className="text-sm text-gray-500">
                        <span className="text-[#4fd1c5] cursor-pointer hover:underline">Beranda</span> &gt; Compliance
                    </p>
                </div>
                <button className="bg-[#4fd1c5] text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-teal-500 transition flex items-center">
                    <PlusIcon className="w-5 h-5 mr-1"/> Add Regulation
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-end items-center mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by Name or Body..."
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
                                {['Regulation Name', 'Issuing Body', 'Status', 'Next Review Date', 'Actions'].map(header => (
                                    <th key={header} scope="col" className="px-6 py-3 font-semibold">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map(reg => (
                                <tr key={reg.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{reg.name}</td>
                                    <td className="px-6 py-4">{reg.issuingBody}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyles[reg.status]}`}>
                                            {reg.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{reg.nextReviewDate}</td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 rounded-md bg-green-500 text-white hover:bg-green-600"><EyeIcon className="w-4 h-4"/></button>
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
        </div>
    );
};

export default Compliance;
