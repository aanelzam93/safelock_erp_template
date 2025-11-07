import React, { useState, useMemo } from 'react';
import { INVENTORY_DATA, SALES_ORDER_DATA, RECEIVABLE_DATA, PRODUCTION_LOG_DATA } from '../constants';
import { SalesIcon, OrdersIcon, InventoryIcon } from './icons/NavIcons';
import { Icon } from './icons/Icon';
import type { SalesOrder } from '../types';

const AlertTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </Icon>
);

const StatCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: string;
    badge?: string;
    badgeType?: 'processing' | 'pending' | 'shipped' | 'urgent';
    change?: string;
    changeType?: 'increase' | 'decrease';
    iconStyle?: 'success' | 'info' | 'warning' | 'danger';
}> = ({ icon, title, value, badge, badgeType, change, changeType, iconStyle = 'success' }) => (
    <div className="stat-card">
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1 uppercase">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{value}</h3>
                {badge && badgeType && (
                    <div className="flex items-center space-x-3">
                        <span className={`status-badge badge-${badgeType}`}>{badge}</span>
                        {change && <span className="text-xs text-gray-500">{change}</span>}
                    </div>
                )}
                {change && !badge && (
                    <div className="flex items-center text-sm">
                        <span className={`font-semibold flex items-center ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                            {changeType === 'increase' && (
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                                </svg>
                            )}
                            {change}
                        </span>
                    </div>
                )}
            </div>
            <div className={`icon-container icon-${iconStyle}`}>
                {icon}
            </div>
        </div>
    </div>
);

const statusStyles: { [key in SalesOrder['status']]: string } = {
  Pending: 'badge-pending',
  Processing: 'badge-processing',
  Shipped: 'badge-shipped',
  Delivered: 'badge-shipped',
  Cancelled: 'bg-gray-100 text-gray-800',
};

const productColors: { [key: string]: string } = {
    'IV Drip Set - Adult': 'indigo-500',
    'Syringe 10ml with Needle': 'teal-500',
    'Digital Thermometer': 'amber-500',
};

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'orders' | 'stock'>('orders');
    const [productionPeriod, setProductionPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
    const [highlightedProduct, setHighlightedProduct] = useState<string | null>(null);

    const stats = useMemo(() => {
        const totalSales = SALES_ORDER_DATA
            .filter(o => o.status === 'Delivered' || o.status === 'Shipped')
            .reduce((sum, order) => sum + order.total, 0);
        const openOrders = SALES_ORDER_DATA.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
        const lowStockItems = INVENTORY_DATA.filter(i => i.stock < 100).length;
        const overdueInvoices = RECEIVABLE_DATA.filter(r => r.status === 'Overdue').length;
        return {
            totalSales: `Rp ${Math.floor(totalSales / 1_000_000)} Jt`,
            openOrders: openOrders.toString(),
            lowStockItems: lowStockItems.toString(),
            overdueInvoices: overdueInvoices.toString(),
        };
    }, []);

    const salesOverviewData = useMemo(() => {
        const salesByMonth: { [key: string]: number } = {};
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        const today = new Date();
        for(let i=2; i>=0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthKey = `${monthNames[d.getMonth()]}`;
            salesByMonth[monthKey] = 0;
        }

        SALES_ORDER_DATA.forEach(order => {
            const orderDate = new Date(order.date);
            if (orderDate >= new Date(today.getFullYear(), today.getMonth() - 2, 1)) {
                 const monthKey = `${monthNames[orderDate.getMonth()]}`;
                 if(salesByMonth[monthKey] !== undefined) {
                    salesByMonth[monthKey] += order.total;
                 }
            }
        });

        const labels = Object.keys(salesByMonth);
        const values = Object.values(salesByMonth);
        const maxVal = Math.max(...values, 1);
        
        return {
            labels,
            values: values.map(v => ({ value: v, height: (v / maxVal) * 100 })),
            maxVal,
        };
    }, []);

    const productionData = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dataByProduct: { [productName: string]: { [label: string]: number } } = {};
        Object.keys(productColors).forEach(p => { dataByProduct[p] = {}; });
        
        let labels: string[] = [];
        let startDate = new Date(today);

        if (productionPeriod === 'Daily') {
            startDate.setDate(today.getDate() - 6);
            for (let i = 6; i >= 0; i--) {
                const d = new Date(today);
                d.setDate(today.getDate() - i);
                const label = d.toLocaleDateString('en-US', { day: 'numeric' });
                labels.push(label);
                Object.keys(productColors).forEach(p => { dataByProduct[p][label] = 0; });
            }

            const filteredLogs = PRODUCTION_LOG_DATA.filter(log => new Date(log.date) >= startDate);
            filteredLogs.forEach(log => {
                if (dataByProduct[log.productName]) {
                    const logDate = new Date(log.date);
                    const label = logDate.toLocaleDateString('en-US', { day: 'numeric' });
                    if (dataByProduct[log.productName][label] !== undefined) {
                        dataByProduct[log.productName][label] += log.quantityProduced;
                    }
                }
            });

        } else if (productionPeriod === 'Weekly') {
            startDate.setDate(today.getDate() - 27);
            labels = ['Week 4', 'Week 3', 'Week 2', 'This Week'];
            labels.forEach(label => {
                Object.keys(productColors).forEach(p => { dataByProduct[p][label] = 0; });
            });

            const filteredLogs = PRODUCTION_LOG_DATA.filter(log => new Date(log.date) >= startDate);
            filteredLogs.forEach(log => {
                if (dataByProduct[log.productName]) {
                    const logDate = new Date(log.date);
                    logDate.setHours(0, 0, 0, 0);
                    const diffDays = (today.getTime() - logDate.getTime()) / (1000 * 3600 * 24);
                    
                    let weekLabel = '';
                    if (diffDays < 7) weekLabel = 'This Week';
                    else if (diffDays < 14) weekLabel = 'Week 2';
                    else if (diffDays < 21) weekLabel = 'Week 3';
                    else if (diffDays < 28) weekLabel = 'Week 4';

                    if (weekLabel) {
                        dataByProduct[log.productName][weekLabel] += log.quantityProduced;
                    }
                }
            });

        } else if (productionPeriod === 'Monthly') {
            startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
            for (let i = 2; i >= 0; i--) {
                const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
                const label = d.toLocaleDateString('en-US', { month: 'short' });
                labels.push(label);
                Object.keys(productColors).forEach(p => { dataByProduct[p][label] = 0; });
            }

            const filteredLogs = PRODUCTION_LOG_DATA.filter(log => new Date(log.date) >= startDate);
            filteredLogs.forEach(log => {
                if (dataByProduct[log.productName]) {
                    const logDate = new Date(log.date);
                    const label = logDate.toLocaleDateString('en-US', { month: 'short' });
                    if (dataByProduct[log.productName][label] !== undefined) {
                        dataByProduct[log.productName][label] += log.quantityProduced;
                    }
                }
            });
        }

        const series = Object.keys(dataByProduct).map(productName => ({
            name: productName,
            data: labels.map(label => dataByProduct[productName][label] || 0)
        }));

        const allValues = series.flatMap(s => s.data);
        const maxVal = Math.max(...allValues, 1);

        return { labels, series, maxVal };
    }, [productionPeriod]);

    const recentOrders = useMemo(() => {
        return [...SALES_ORDER_DATA]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
    }, []);
    
    const lowStockItems = useMemo(() => {
        return INVENTORY_DATA.filter(item => item.stock < 100)
            .sort((a,b) => a.stock - b.stock)
            .slice(0,5);
    }, []);

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Selamat Datang, Admin! 👋</h1>
                        <p className="text-teal-100 text-lg">Ini adalah ringkasan operasional PT. Safelock Medical.</p>
                    </div>
                    <div className="hidden lg:block">
                        <svg className="w-32 h-32 text-white opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon="💰"
                    title="Total Penjualan"
                    value={stats.totalSales}
                    change="+12%"
                    changeType="increase"
                    iconStyle="success"
                />
                <StatCard
                    icon="📦"
                    title="Pesanan Baru"
                    value={stats.openOrders}
                    badge="2 Baru"
                    badgeType="processing"
                    change="Perlu diproses"
                    iconStyle="info"
                />
                <StatCard
                    icon="⚠️"
                    title="Stok Rendah"
                    value={stats.lowStockItems}
                    badge="-100 Items"
                    badgeType="pending"
                    change="Perlu perhatian"
                    iconStyle="warning"
                />
                <StatCard
                    icon="🚨"
                    title="Tagihan Jatuh Tempo"
                    value={stats.overdueInvoices}
                    badge="Urgent"
                    badgeType="urgent"
                    change="Perlu tindakan"
                    iconStyle="danger"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 chart-wrapper">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Sales Overview (Monthly)</h3>
                            <p className="text-sm text-gray-500">Pertumbuhan penjualan bulanan</p>
                        </div>
                        <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-semibold text-sm">
                            +23% Growth
                        </div>
                    </div>
                     <div className="h-64 relative">
                        <div className="h-full flex flex-col justify-between text-xs text-gray-400">
                            { [1, 0.5, 0].map(val => (
                                <div key={val} className="relative border-t border-dashed">
                                    <span className="absolute -top-2.5">Rp {Math.round(salesOverviewData.maxVal * val / 1000000)} Jt</span>
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-full flex justify-around items-end px-4">
                            {salesOverviewData.values.map((month, index) => (
                                <div key={index} className="w-8 bg-[#4fd1c5] hover:bg-teal-500 transition-colors rounded-t-md" title={`Rp ${month.value.toLocaleString('id-ID')}`} style={{ height: `${month.height}%` }}></div>
                            ))}
                        </div>
                     </div>
                     <div className="flex justify-around text-xs text-gray-500 mt-2 border-t pt-2">
                        {salesOverviewData.labels.map(label => <span key={label}>{label}</span>)}
                     </div>
                </div>
                <div className="lg:col-span-3 chart-wrapper flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Production Overview</h3>
                            <p className="text-sm text-gray-500">Tren produksi mingguan</p>
                        </div>
                        <div className="flex space-x-1 bg-gray-100 p-1 rounded-md">
                            {(['Daily', 'Weekly', 'Monthly'] as const).map(p => (
                                <button key={p} onClick={() => setProductionPeriod(p)} className={`px-2 py-0.5 text-xs font-semibold rounded-md transition ${productionPeriod === p ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}>{p}</button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-grow h-64 relative">
                         <svg className="w-full h-full" viewBox={`0 0 500 200`}>
                            {/* Y-axis lines and labels */}
                            {[1, 0.5, 0].map((val, i) => (
                                <g key={i}>
                                    <line x1="30" x2="500" y1={20 + (1-val) * 150} stroke="#e5e7eb" strokeDasharray="2,2" />
                                    <text x="25" y={25 + (1-val) * 150} textAnchor="end" fontSize="10" fill="#9ca3af">{Math.round(productionData.maxVal * val)}</text>
                                </g>
                            ))}
                             {/* X-axis labels */}
                            {productionData.labels.map((label, i) => (
                                <text key={i} x={50 + i * (450 / (productionData.labels.length - 1))} y="195" textAnchor="middle" fontSize="10" fill="#6b7280">{label}</text>
                            ))}
                            {/* Lines */}
                            {productionData.series.map(s => {
                                 const points = s.data.map((d, i) => `${50 + i * (450 / (s.data.length - 1))},${170 - (d / productionData.maxVal) * 150}`).join(' ');
                                 return (
                                    <polyline key={s.name} fill="none" stroke={`var(--color-${productColors[s.name]})`} strokeWidth={highlightedProduct === s.name ? 3 : 2} points={points} className={`transition-opacity duration-300 ${highlightedProduct && highlightedProduct !== s.name ? 'opacity-30' : 'opacity-100'}`} />
                                 )
                            })}
                        </svg>
                    </div>
                    <div className="flex justify-center space-x-4 text-xs mt-2 border-t pt-2">
                        {productionData.series.map(s => (
                            <div key={s.name} onMouseEnter={() => setHighlightedProduct(s.name)} onMouseLeave={() => setHighlightedProduct(null)} className="flex items-center cursor-pointer">
                                <div className={`w-3 h-3 rounded-sm mr-2 bg-${productColors[s.name]}`}></div>
                                <span className="text-gray-600">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Latest Orders Table */}
            <div className="chart-wrapper">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">
                            {activeTab === 'orders' ? 'Latest Sales Orders' : 'Low Stock Items'}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {activeTab === 'orders' ? 'Pesanan terbaru yang perlu diproses' : 'Item dengan stok rendah yang perlu perhatian'}
                        </p>
                    </div>
                    <button className="px-4 py-2 text-sm font-semibold text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                        Lihat Semua →
                    </button>
                </div>

                <div className="flex border-b mb-4">
                    <button onClick={() => setActiveTab('orders')} className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}>Latest Sales Orders</button>
                    <button onClick={() => setActiveTab('stock')} className={`tab-btn ${activeTab === 'stock' ? 'active' : ''}`}>Low Stock Items</button>
                </div>
                {activeTab === 'orders' ? (
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                             <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                                <tr>
                                    <th className="px-4 py-2">Order ID</th><th className="px-4 py-2">Pelanggan</th><th className="px-4 py-2">Total</th><th className="px-4 py-2">Status</th>
                                </tr>
                             </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-4 py-3 font-mono text-teal-800">#{order.id}</td>
                                        <td className="px-4 py-3 font-medium text-gray-800">{order.customer}</td>
                                        <td className="px-4 py-3">Rp {order.total.toLocaleString('id-ID')}</td>
                                        <td className="px-4 py-3"><span className={`status-badge ${statusStyles[order.status]}`}>{order.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                             <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                                <tr><th className="px-4 py-2">Item Name</th><th className="px-4 py-2">SKU</th><th className="px-4 py-2">Category</th><th className="px-4 py-2">Stock Left</th></tr>
                             </thead>
                            <tbody>
                                {lowStockItems.map(item => (
                                    <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                                        <td className="px-4 py-3">{item.sku}</td>
                                        <td className="px-4 py-3">{item.category}</td>
                                        <td className="px-4 py-3"><span className="font-bold text-red-600">{item.stock} {item.unit}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* Dynamic Tailwind CSS color classes to ensure they are not purged */}
            <div className="hidden bg-indigo-500 stroke-indigo-500 bg-teal-500 stroke-teal-500 bg-amber-500 stroke-amber-500"></div>
        </div>
    );
};

export default Dashboard;