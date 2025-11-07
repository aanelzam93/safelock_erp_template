import React, { useState, useMemo } from 'react';
import type { BillOfMaterial } from '../types';
import { BOM_DATA } from '../constants';
import { Icon } from './icons/Icon';

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></Icon>
);
const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></Icon>
);
const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></Icon>
);
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></Icon>
);

interface ComponentItem {
    id: string;
    name: string;
    quantity: number;
    unit: string;
}

interface BOMFormData {
    productName: string;
    productSku: string;
    components: ComponentItem[];
}

const BOM: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<BOMFormData>({
        productName: '',
        productSku: '',
        components: [{ id: '1', name: '', quantity: 0, unit: 'pcs' }]
    });

    const filteredData = useMemo(() => {
        return BOM_DATA.filter(item => {
            const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  item.productSku.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [searchTerm]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleAddComponent = () => {
        setFormData(prev => ({
            ...prev,
            components: [...prev.components, {
                id: String(prev.components.length + 1),
                name: '',
                quantity: 0,
                unit: 'pcs'
            }]
        }));
    };

    const handleRemoveComponent = (id: string) => {
        setFormData(prev => ({
            ...prev,
            components: prev.components.filter(c => c.id !== id)
        }));
    };

    const handleComponentChange = (id: string, field: keyof ComponentItem, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            components: prev.components.map(c =>
                c.id === id ? { ...c, [field]: value } : c
            )
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('BOM Data:', formData);
        // Add your submission logic here
        setIsModalOpen(false);
        setFormData({
            productName: '',
            productSku: '',
            components: [{ id: '1', name: '', quantity: 0, unit: 'pcs' }]
        });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            productName: '',
            productSku: '',
            components: [{ id: '1', name: '', quantity: 0, unit: 'pcs' }]
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Bill of Materials (BOM)</h1>
                    <p className="text-sm text-gray-500">
                        <span className="text-[#4fd1c5] cursor-pointer hover:underline">Beranda</span> &gt; BOM
                    </p>
                </div>
                 <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
                >
                    <PlusIcon className="w-5 h-5 mr-1"/> Tambah BOM
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
                            placeholder="Search by Product Name or SKU..."
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
                                {['ID BOM', 'Nama Produk', 'SKU Produk', 'Jumlah Komponen', 'Tgl Dibuat', 'Aksi'].map(header => (
                                    <th key={header} scope="col" className="px-6 py-3 font-semibold">
                                        <div className="flex items-center">{header}</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map(bom => (
                                <tr key={bom.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-teal-800 font-medium">#{bom.id}</span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{bom.productName}</td>
                                    <td className="px-6 py-4">{bom.productSku}</td>
                                    <td className="px-6 py-4">{bom.componentCount} items</td>
                                    <td className="px-6 py-4">{bom.createdAt}</td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        <button className="p-2 rounded-md bg-green-500 text-white hover:bg-green-600"><EyeIcon className="w-4 h-4"/></button>
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

            {/* Modal Form Tambah BOM */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-4 rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Tambah Bill of Materials</h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition"
                                >
                                    <Icon className="w-6 h-6">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </Icon>
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6">
                            {/* Product Information */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="bg-teal-100 text-teal-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                                    Informasi Produk
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Nama Produk <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.productName}
                                            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                                            placeholder="Contoh: IV Drip Set - Adult"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            SKU Produk <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.productSku}
                                            onChange={(e) => setFormData({ ...formData, productSku: e.target.value })}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                                            placeholder="Contoh: IV-DRIP-001"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Components List */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                        <span className="bg-teal-100 text-teal-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
                                        Daftar Komponen
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={handleAddComponent}
                                        className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition flex items-center text-sm font-semibold"
                                    >
                                        <PlusIcon className="w-4 h-4 mr-1" />
                                        Tambah Komponen
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {formData.components.map((component, index) => (
                                        <div key={component.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-semibold text-gray-600">Komponen #{index + 1}</span>
                                                {formData.components.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveComponent(component.id)}
                                                        className="text-red-500 hover:text-red-700 p-1"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                        Nama Komponen <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={component.name}
                                                        onChange={(e) => handleComponentChange(component.id, 'name', e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        placeholder="Contoh: Plastic Tube"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                                            Qty <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            required
                                                            min="0"
                                                            step="0.01"
                                                            value={component.quantity}
                                                            onChange={(e) => handleComponentChange(component.id, 'quantity', parseFloat(e.target.value) || 0)}
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                                            Unit <span className="text-red-500">*</span>
                                                        </label>
                                                        <select
                                                            required
                                                            value={component.unit}
                                                            onChange={(e) => handleComponentChange(component.id, 'unit', e.target.value)}
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        >
                                                            <option value="pcs">pcs</option>
                                                            <option value="kg">kg</option>
                                                            <option value="g">g</option>
                                                            <option value="l">l</option>
                                                            <option value="ml">ml</option>
                                                            <option value="m">m</option>
                                                            <option value="cm">cm</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end space-x-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                                >
                                    Simpan BOM
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BOM;
