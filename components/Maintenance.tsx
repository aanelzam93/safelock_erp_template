import React, { useState, useMemo } from 'react';
import type { MaintenanceTask } from '../types';
import { MAINTENANCE_TASK_DATA } from '../constants';
import { Icon } from './icons/Icon';

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></Icon>
);
const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></Icon>
);
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></Icon>
);

const statusStyles: { [key in MaintenanceTask['status']]: string } = {
  'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'In Progress': 'bg-blue-100 text-blue-800 border-blue-300',
  'Completed': 'bg-green-100 text-green-800 border-green-300',
};

const priorityStyles: { [key in MaintenanceTask['priority']]: string } = {
    High: 'text-red-600',
    Medium: 'text-orange-600',
    Low: 'text-gray-600'
}

const Maintenance: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

    const filteredData = useMemo(() => {
        return MAINTENANCE_TASK_DATA.filter(item => {
            const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
            const matchesSearch = item.machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.task.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [searchTerm, statusFilter]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Maintenance Management</h1>
                    <p className="text-sm text-gray-500">
                        <span className="text-[#4fd1c5] cursor-pointer hover:underline">Beranda</span> &gt; Maintenance
                    </p>
                </div>
                 <button className="bg-[#4fd1c5] text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-teal-500 transition flex items-center">
                    <PlusIcon className="w-5 h-5 mr-1"/> Create Task
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
                        </select>
                        <span className="text-gray-600">entries per page</span>
                    </div>
                    <div className="flex items-center space-x-2">
                         <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by Machine or Task..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 pl-8"
                            />
                             <Icon className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></Icon>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                            <tr>
                                {['Task ID', 'Machine', 'Task', 'Due Date', 'Priority', 'Status', 'Actions'].map(header => (
                                    <th key={header} scope="col" className="px-6 py-3 font-semibold">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map(task => (
                                <tr key={task.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-teal-800">#{task.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{task.machine}</td>
                                    <td className="px-6 py-4">{task.task}</td>
                                    <td className="px-6 py-4">{task.dueDate}</td>
                                     <td className={`px-6 py-4 font-semibold ${priorityStyles[task.priority]}`}>{task.priority}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyles[task.status]}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        <button className="p-2 rounded-md bg-green-500 text-white hover:bg-green-600"><EyeIcon className="w-4 h-4"/></button>
                                        <button className="p-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"><EditIcon className="w-4 h-4"/></button>
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

export default Maintenance;
