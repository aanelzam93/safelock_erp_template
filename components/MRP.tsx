import React, { useState } from 'react';
import { WORK_ORDER_DATA, BOM_DATA } from '../constants';

interface MRPResult {
    productName: string;
    quantityRequired: number;
    sourceWo: string;
}

const MRP: React.FC = () => {
    const [mrpResult, setMrpResult] = useState<MRPResult[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRunMrp = () => {
        setIsLoading(true);
        setMrpResult(null);

        setTimeout(() => {
            const pendingOrders = WORK_ORDER_DATA.filter(wo => wo.status === 'Pending' || wo.status === 'In Progress');
            const requirements: { [key: string]: { qty: number, sources: string[] } } = {};

            pendingOrders.forEach(wo => {
                const bom = BOM_DATA.find(b => b.productSku === wo.productSku);
                if (bom) {
                    const required = wo.quantityToProduce - wo.quantityProduced;
                    const componentKey = `Komponen untuk ${bom.productName}`;
                    
                    if (!requirements[componentKey]) {
                        requirements[componentKey] = { qty: 0, sources: [] };
                    }
                    requirements[componentKey].qty += required * bom.componentCount;
                    requirements[componentKey].sources.push(wo.id);
                }
            });

            const result: MRPResult[] = Object.entries(requirements).map(([productName, data]) => ({
                productName,
                quantityRequired: data.qty,
                sourceWo: data.sources.join(', '),
            }));

            setMrpResult(result);
            setIsLoading(false);
        }, 1500); // Simulate processing time
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Material Requirements Planning (MRP)</h1>
                    <p className="text-sm text-gray-500">
                         <span className="text-[#4fd1c5] cursor-pointer hover:underline">Planning</span> &gt; MRP
                    </p>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Jalankan MRP</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Klik tombol di bawah untuk menghitung kebutuhan material berdasarkan Work Order yang sedang berjalan dan tertunda. Sistem akan menghasilkan daftar rekomendasi pembelian.
                </p>
                <button 
                    onClick={handleRunMrp}
                    disabled={isLoading}
                    className="bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-teal-600 transition disabled:bg-teal-300"
                >
                    {isLoading ? 'Menghitung...' : 'Run MRP'}
                </button>
            </div>

            {isLoading && (
                 <div className="mt-6 text-center text-gray-600">
                    <p>Menganalisis Bill of Materials dan Work Orders...</p>
                </div>
            )}

            {mrpResult && (
                <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Hasil MRP - Rekomendasi Pembelian</h2>
                    {mrpResult.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-600">
                                <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Material / Komponen</th>
                                        <th className="px-6 py-3 font-semibold">Jumlah Dibutuhkan</th>
                                        <th className="px-6 py-3 font-semibold">Sumber Work Order</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mrpResult.map(item => (
                                        <tr key={item.productName} className="border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{item.productName}</td>
                                            <td className="px-6 py-4 font-bold text-red-600">{item.quantityRequired.toLocaleString('id-ID')} units</td>
                                            <td className="px-6 py-4 font-mono text-xs">{item.sourceWo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-600">Tidak ada kebutuhan material baru saat ini. Semua Work Order sudah memiliki material yang cukup.</p>
                    )}
                </div>
            )}

        </div>
    );
};

export default MRP;