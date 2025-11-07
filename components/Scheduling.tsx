import React from 'react';
import { WORK_ORDER_DATA } from '../constants';
import type { WorkOrder } from '../types';

const productColors: { [key: string]: string } = {
    'IV Drip Set - Adult': 'bg-indigo-500',
    'Syringe 10ml with Needle': 'bg-teal-500',
    'Digital Thermometer': 'bg-amber-500',
};

const Scheduling: React.FC = () => {
    const machines = Array.from(new Set(WORK_ORDER_DATA.map(wo => wo.machine)));

    // Simple scheduling logic for demonstration
    const schedule: { [machine: string]: WorkOrder[] } = {};
    machines.forEach(m => {
        schedule[m] = WORK_ORDER_DATA.filter(wo => wo.machine === m);
    });

    return (
        <div>
             <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Production Scheduling</h1>
                    <p className="text-sm text-gray-500">
                         <span className="text-[#4fd1c5] cursor-pointer hover:underline">Planning</span> &gt; Scheduling
                    </p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-end mb-4">
                     <div className="flex items-center space-x-4 text-xs">
                        {Object.entries(productColors).map(([name, color]) => (
                            <div key={name} className="flex items-center">
                                <div className={`w-3 h-3 rounded-sm mr-2 ${color}`}></div>
                                <span className="text-gray-600">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {machines.map(machine => (
                        <div key={machine}>
                            <h3 className="font-semibold text-gray-700 mb-2">{machine}</h3>
                            <div className="relative bg-gray-100 h-12 rounded-lg">
                                <div className="flex h-full">
                                    {schedule[machine].map((wo, index) => (
                                        <div 
                                            key={wo.id} 
                                            title={`${wo.productName} (${wo.id})`}
                                            className={`h-full ${productColors[wo.productName] || 'bg-gray-400'} rounded-md mx-0.5 flex items-center justify-center text-white text-xs font-bold overflow-hidden cursor-pointer`}
                                            style={{ width: `${100 / schedule[machine].length}%`}} // Simple width distribution
                                        >
                                           <span className="truncate px-1">{wo.id}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Scheduling;