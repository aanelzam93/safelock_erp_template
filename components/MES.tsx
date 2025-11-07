import React from 'react';
import { WORK_ORDER_DATA } from '../constants';
import type { WorkOrder } from '../types';
import { Icon } from './icons/Icon';

const statusStyles: { [key in WorkOrder['status']]: { bg: string, text: string, border: string } } = {
  'Pending': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
  'In Progress': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  'Completed': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  'On Hold': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
};

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></Icon>
);

const AlertTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </Icon>
);


const WorkOrderCard: React.FC<{ wo: WorkOrder }> = ({ wo }) => {
    const progress = wo.quantityToProduce > 0 ? (wo.quantityProduced / wo.quantityToProduce) * 100 : 0;
    const statusStyle = statusStyles[wo.status];
    return (
        <div className="bg-white p-4 rounded-xl shadow-md border flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start">
                    <div>
                         <p className="font-mono text-sm text-teal-800 font-semibold">#{wo.id}</p>
                         <h3 className="font-bold text-gray-800 text-lg">{wo.productName}</h3>
                         <p className="text-xs text-gray-500">{wo.productSku}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>{wo.status}</span>
                </div>

                <div className="my-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold text-gray-700">Progress</span>
                        <span className="font-bold">{wo.quantityProduced} / {wo.quantityToProduce}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                     <div className="flex justify-between text-xs mt-1 text-gray-500">
                        <span>Rejected: <span className="font-semibold text-red-600">{wo.quantityRejected}</span></span>
                        <span>Due: {wo.dueDate}</span>
                    </div>
                </div>
            </div>

            <div className="border-t pt-3 flex space-x-2">
                <button className="flex-1 bg-teal-500 text-white font-semibold py-2 px-3 rounded-lg shadow-sm hover:bg-teal-600 transition flex items-center justify-center text-sm">
                    <CheckCircleIcon className="w-4 h-4 mr-1.5"/> Log Production
                </button>
                <button className="flex-1 bg-yellow-500 text-white font-semibold py-2 px-3 rounded-lg shadow-sm hover:bg-yellow-600 transition flex items-center justify-center text-sm">
                    <AlertTriangleIcon className="w-4 h-4 mr-1.5"/> Report Issue
                </button>
            </div>
        </div>
    )
}

const MES: React.FC = () => {
    return (
        <div>
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">MES - Operator Dashboard</h1>
                <p className="text-sm text-gray-500">
                    Menampilkan daftar Work Order yang perlu dikerjakan.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {WORK_ORDER_DATA.map(wo => (
                    <WorkOrderCard key={wo.id} wo={wo} />
                ))}
            </div>
        </div>
    );
};

export default MES;