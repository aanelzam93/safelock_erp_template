import React, { useState, useMemo } from 'react';
import type { Role } from '../types';
import { ROLE_DATA } from '../constants';
import { Icon } from './icons/Icon';

const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></Icon>
);
const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></Icon>
);
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></Icon>
);

const permissionColors = [
    'bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800',
    'bg-indigo-100 text-indigo-800', 'bg-pink-100 text-pink-800', 'bg-purple-100 text-purple-800'
];

const Roles: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = useMemo(() => {
        return ROLE_DATA.filter(item => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
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
                    <h1 className="text-2xl font-bold text-gray-800">Roles & Permissions</h1>
                    <p className="text-sm text-gray-500">
                        <span className="text-[#4fd1c5] cursor-pointer hover:underline">Beranda</span> &gt; Roles
                    </p>
                </div>
                 <button className="bg-[#4fd1c5] text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-teal-500 transition flex items-center">
                    <PlusIcon className="w-5 h-5 mr-1"/> Tambah Role
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-end items-center mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by Role Name..."
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
                                {['Role Name', 'Description', 'Users', 'Permissions', 'Aksi'].map(header => (
                                    <th key={header} scope="col" className="px-6 py-3 font-semibold">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map(role => (
                                <tr key={role.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{role.name}</td>
                                    <td className="px-6 py-4 text-xs max-w-xs">{role.description}</td>
                                    <td className="px-6 py-4">{role.userCount}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {role.permissions.map((p, index) => (
                                                <span key={p} className={`text-xs font-medium px-2 py-0.5 rounded ${permissionColors[index % permissionColors.length]}`}>{p}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        <button className="p-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"><EditIcon className="w-4 h-4"/></button>
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
        </div>
    );
};

export default Roles;