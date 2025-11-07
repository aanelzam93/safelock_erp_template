import React, { useState, useMemo } from 'react';
import { INVENTORY_DATA, SALES_ORDER_DATA, RECEIVABLE_DATA, QUALITY_CHECK_DATA, PRODUCT_DATA } from '../constants';
import type { InventoryItem, SalesOrder, Receivable } from '../types';
import { DownloadIcon } from './icons/NavIcons';
import { Icon } from './icons/Icon';

type ReportType = 'inventory' | 'sales' | 'receivable';

const ReportCard = ({ title, description, onClick, isActive }: { title: string, description: string, onClick: () => void, isActive: boolean }) => (
    <div 
        onClick={onClick}
        className={`bg-white p-4 rounded-lg shadow-sm border-2 transition cursor-pointer hover:shadow-md hover:border-teal-400 ${isActive ? 'border-teal-500' : 'border-transparent'}`}
    >
        <div className="flex justify-between items-center">
            <div>
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
            <div className="bg-teal-100 p-2 rounded-full">
                <DownloadIcon className="w-5 h-5 text-teal-600" />
            </div>
        </div>
    </div>
);

const ReportPreview = ({ type, data, onClose }: { type: ReportType, data: any[], onClose: () => void }) => {
    let headers: string[] = [];
    let rows: React.ReactNode[] = [];

    switch(type) {
        case 'inventory':
            headers = ['Item Name', 'SKU', 'Category', 'Stock'];
            rows = (data as InventoryItem[]).map(item => (
                <tr key={item.id}>
                    <td className="px-4 py-2 font-medium">{item.name}</td>
                    <td>{item.sku}</td>
                    <td>{item.category}</td>
                    <td>{item.stock} {item.unit}</td>
                </tr>
            ));
            break;
        case 'sales':
            headers = ['Order ID', 'Customer', 'Date', 'Total'];
            rows = (data as SalesOrder[]).map(item => (
                <tr key={item.id}>
                    <td className="px-4 py-2 font-mono">#{item.id}</td>
                    <td>{item.customer}</td>
                    <td>{item.date}</td>
                    <td>Rp {item.total.toLocaleString('id-ID')}</td>
                </tr>
            ));
            break;
        case 'receivable':
            headers = ['Invoice ID', 'Customer', 'Due Date', 'Amount'];
            rows = (data as Receivable[]).map(item => (
                <tr key={item.invoiceId}>
                    <td className="px-4 py-2 font-mono">#{item.invoiceId}</td>
                    <td>{item.customer}</td>
                    <td>{item.dueDate}</td>
                    <td>Rp {item.amount.toLocaleString('id-ID')}</td>
                </tr>
            ));
            break;
    }

    return (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-sm border animate-fade-in-down">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-700 capitalize">{type} Report Preview</h3>
                <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800">&times; Close</button>
            </div>
            <div className="overflow-x-auto max-h-64">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>{headers.map(h => <th key={h} className="px-4 py-2 font-semibold text-gray-600">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CustomAnalyticsPreview = () => {
    const qualityPassRate = useMemo(() => {
        const passed = QUALITY_CHECK_DATA.filter(q => q.status === 'Passed').length;
        const failed = QUALITY_CHECK_DATA.filter(q => q.status === 'Failed').length;
        if (passed + failed === 0) return 'N/A';
        return `${((passed / (passed + failed)) * 100).toFixed(1)}%`;
    }, []);

    const averageOrderValue = useMemo(() => {
        if (SALES_ORDER_DATA.length === 0) return 'N/A';
        const totalValue = SALES_ORDER_DATA.reduce((sum, order) => sum + order.total, 0);
        return `Rp ${(totalValue / SALES_ORDER_DATA.length).toLocaleString('id-ID', {maximumFractionDigits: 0})}`;
    }, []);
    
    const salesByCategory = useMemo(() => {
        const categoryCounts: {[key: string]: number} = {};
        PRODUCT_DATA.forEach(p => {
            categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
        });
        return Object.entries(categoryCounts).map(([name, value]) => ({name, value}));
    }, []);
    
    const pieColors = ['#4fd1c5', '#38b2ac', '#319795', '#2c7a7b'];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Custom Analytics Dashboard</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* KPI Cards */}
                <div className="bg-gray-50 p-4 rounded-lg"><div className="text-sm text-gray-500">Quality Pass Rate</div><div className="text-2xl font-bold text-gray-800">{qualityPassRate}</div></div>
                <div className="bg-gray-50 p-4 rounded-lg"><div className="text-sm text-gray-500">Average Order Value</div><div className="text-2xl font-bold text-gray-800">{averageOrderValue}</div></div>
                
                {/* Pie Chart */}
                <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-sm text-center mb-2">Products by Category</h4>
                    <div className="flex justify-center items-center space-x-4">
                        <div className="flex items-center justify-center w-24 h-24 rounded-full" style={{background: `conic-gradient(${pieColors.map((c, i) => `${c} 0 ${(salesByCategory.slice(0,i+1).reduce((a,b)=>a+b.value, 0)/PRODUCT_DATA.length)*360}deg`).join(', ')})`}}></div>
                        <ul className="text-xs space-y-1">
                            {salesByCategory.map((cat, i) => <li key={cat.name} className="flex items-center"><span className="w-3 h-3 rounded-sm mr-2" style={{backgroundColor: pieColors[i]}}></span>{cat.name} ({cat.value})</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Reporting: React.FC = () => {
    const [activeReport, setActiveReport] = useState<ReportType | null>(null);

    const reports: { key: ReportType; title: string; description: string }[] = [
        { key: 'inventory', title: 'Inventory Stock Report', description: 'Current stock levels for all items.' },
        { key: 'sales', title: 'Sales Performance', description: 'Monthly and quarterly sales data.' },
        { key: 'receivable', title: 'Accounts Receivable Aging', description: 'Breakdown of unpaid invoices by age.' },
    ];
    
    const reportDataMap = {
        inventory: INVENTORY_DATA,
        sales: SALES_ORDER_DATA,
        receivable: RECEIVABLE_DATA,
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Reporting & Analytics</h1>
                    <p className="text-sm text-gray-500">
                        <span className="text-[#4fd1c5] cursor-pointer hover:underline">Beranda</span> &gt; Reporting
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Standard Reports</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reports.map(report => (
                            <ReportCard 
                                key={report.key}
                                title={report.title}
                                description={report.description}
                                onClick={() => setActiveReport(activeReport === report.key ? null : report.key)}
                                isActive={activeReport === report.key}
                            />
                        ))}
                    </div>
                    {activeReport && <ReportPreview type={activeReport} data={reportDataMap[activeReport]} onClose={() => setActiveReport(null)} />}
                </div>
                
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">Custom Analytics</h2>
                    <CustomAnalyticsPreview />
                </div>
            </div>
        </div>
    );
};

export default Reporting;