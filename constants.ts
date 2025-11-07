import type { InventoryItem, SalesOrder, BillOfMaterial, User, Role, Product, PurchaseOrder, QualityCheck, MaintenanceTask, Regulation, Employee, Payable, Receivable, LedgerEntry, CostCenter, Budget, ProductionLog, WorkOrder, WarehouseLocation, Customer } from './types';

export const WAREHOUSE_LOCATION_DATA: WarehouseLocation[] = [
    { id: 'LOC-A01', name: 'Rak A-01', area: 'Storage', capacity: 100, itemCount: 5 },
    { id: 'LOC-B02', name: 'Rak B-02', area: 'Storage', capacity: 150, itemCount: 8 },
    { id: 'LOC-RCV', name: 'Area Penerimaan', area: 'Receiving', capacity: 50, itemCount: 2 },
    { id: 'LOC-PCK', name: 'Area Picking #1', area: 'Picking', capacity: 80, itemCount: 10 },
    { id: 'LOC-QRN', name: 'Karantina QC', area: 'Quarantine', capacity: 30, itemCount: 1 },
];

export const INVENTORY_DATA: InventoryItem[] = [
  { id: 'ITM00001', name: 'IV Drip Set - Adult', sku: 'SFL-IV-AD-01', category: 'Infusion Supplies', stock: 1500, unit: 'pcs', lastUpdated: '2023-10-26', cost: 25000, locationId: 'LOC-A01' },
  { id: 'ITM00002', name: 'Syringe 10ml with Needle', sku: 'SFL-SYR-10ML-01', category: 'Medical Consumables', stock: 850, unit: 'box', lastUpdated: '2023-10-25', cost: 150000, locationId: 'LOC-A01' },
  { id: 'ITM00003', name: 'Saline Solution 500ml', sku: 'SFL-SAL-500ML-01', category: 'Pharmaceuticals', stock: 250, unit: 'pcs', lastUpdated: '2023-10-26', cost: 18000, locationId: 'LOC-B02' },
  { id: 'ITM00004', name: 'Surgical Gloves (Box of 100)', sku: 'SFL-GLV-SUR-M-01', category: 'Protective Gear', stock: 480, unit: 'box', lastUpdated: '2023-10-24', cost: 85000, locationId: 'LOC-B02' },
  { id: 'ITM00005', name: 'Alcohol Swabs (Box of 200)', sku: 'SFL-SWB-ALC-01', category: 'Medical Consumables', stock: 1200, unit: 'box', lastUpdated: '2023-10-26', cost: 35000, locationId: 'LOC-PCK' },
  { id: 'ITM00006', name: 'Digital Thermometer', sku: 'SFL-TRM-DIG-01', category: 'Medical Devices', stock: 95, unit: 'pcs', lastUpdated: '2023-10-23', cost: 75000, locationId: 'LOC-A01' },
  { id: 'ITM00007', name: 'Blood Pressure Monitor', sku: 'SFL-BPM-DIG-01', category: 'Medical Devices', stock: 150, unit: 'pcs', lastUpdated: '2023-10-25', cost: 350000, locationId: 'LOC-B02' },
  { id: 'ITM00008', name: 'Gauze Pads (Sterile)', sku: 'SFL-GAU-ST-4x4', category: 'Medical Consumables', stock: 3000, unit: 'pcs', lastUpdated: '2023-10-26', cost: 1000, locationId: 'LOC-PCK' },
  { id: 'ITM00009', name: 'IV Drip Set - Pediatric', sku: 'SFL-IV-PD-01', category: 'Infusion Supplies', stock: 75, unit: 'pcs', lastUpdated: '2023-10-22', cost: 28000, locationId: 'LOC-A01' },
  { id: 'ITM00010', name: 'Catheter - Size 14G', sku: 'SFL-CAT-14G-01', category: 'Medical Consumables', stock: 600, unit: 'pcs', lastUpdated: '2023-10-26', cost: 12000, locationId: 'LOC-B02' },
];

export const CUSTOMER_DATA: Customer[] = [
    { id: 'CUST-001', name: 'RS Harapan Kita', industry: 'Healthcare', contactPerson: 'Bpk. Santoso', email: 'purchasing@rshk.co.id', phone: '021-568-1234', status: 'Active' },
    { id: 'CUST-002', name: 'Klinik Medika Utama', industry: 'Healthcare', contactPerson: 'Ibu Wati', email: 'info@klinikmedika.com', phone: '021-789-4561', status: 'Active' },
    { id: 'CUST-003', name: 'Distributor Medis Jaya', industry: 'Distribution', contactPerson: 'Bpk. Hartono', email: 'order@dmj.co.id', phone: '031-888-9999', status: 'Active' },
    { id: 'CUST-004', name: 'Global Pharma Inc.', industry: 'Pharmaceutical', contactPerson: 'Ms. Jane Doe', email: 'jane.doe@globalpharma.com', phone: '+1-202-555-0174', status: 'Lead' },
]

const generateSalesData = (): SalesOrder[] => {
    const data: SalesOrder[] = [];
    const today = new Date();
    for (let i = 0; i < 90; i++) {
        const orderCount = Math.floor(Math.random() * 3);
        if (orderCount === 0 && i > 5) continue;

        for (let j = 0; j < orderCount; j++) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];

            const statusOptions: SalesOrder['status'][] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
            
            const itemCount = Math.floor(Math.random() * 20) + 1;
            const total = (Math.floor(Math.random() * 50) + 1) * 250000;

            data.push({
                id: `SO-${1000 + data.length}`,
                customer: CUSTOMER_DATA[Math.floor(Math.random() * CUSTOMER_DATA.length)].name,
                date: dateString,
                status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
                itemCount: itemCount,
                total: total
            });
        }
    }
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const SALES_ORDER_DATA: SalesOrder[] = generateSalesData();

export const BOM_DATA: BillOfMaterial[] = [
    { id: 'BOM-IV-AD-01', productName: 'IV Drip Set - Adult', productSku: 'SFL-IV-AD-01', componentCount: 12, createdAt: '2022-01-15' },
    { id: 'BOM-SYR-10ML-01', productName: 'Syringe 10ml with Needle', productSku: 'SFL-SYR-10ML-01', componentCount: 4, createdAt: '2022-02-20' },
    { id: 'BOM-GLV-SUR-M-01', productName: 'Surgical Gloves (Box of 100)', productSku: 'SFL-GLV-SUR-M-01', componentCount: 2, createdAt: '2022-03-10' },
    { id: 'BOM-TRM-DIG-01', productName: 'Digital Thermometer', productSku: 'SFL-TRM-DIG-01', componentCount: 25, createdAt: '2022-05-01' },
    { id: 'BOM-BPM-DIG-01', productName: 'Blood Pressure Monitor', productSku: 'SFL-BPM-DIG-01', componentCount: 38, createdAt: '2022-05-05' },
];

export const USER_DATA: User[] = [
    { id: 1, name: 'Admin ERP', email: 'admin@safelock.com', role: 'Administrator', status: 'Active', lastLogin: '2023-10-26 08:00' },
    { id: 2, name: 'Budi Santoso', email: 'budi.s@safelock.com', role: 'Inventory Manager', status: 'Active', lastLogin: '2023-10-26 07:45' },
    { id: 3, name: 'Citra Lestari', email: 'citra.l@safelock.com', role: 'Sales Representative', status: 'Active', lastLogin: '2023-10-25 15:20' },
    { id: 4, name: 'Dewi Anggraini', email: 'dewi.a@safelock.com', role: 'Finance Staff', status: 'Inactive', lastLogin: '2023-09-01 10:00' },
    { id: 5, name: 'Eko Prasetyo', email: 'eko.p@safelock.com', role: 'Operator', status: 'Active', lastLogin: '2023-10-26 06:55' },
];

export const ROLE_DATA: Role[] = [
    { id: 'R01', name: 'Administrator', description: 'Full access to all modules', userCount: 1, permissions: ['Dashboard', 'Inventory', 'Orders', 'BOM', 'Users', 'Roles', 'Finance', 'HR', 'MES', 'WMS', 'CRM', 'MRP'] },
    { id: 'R02', name: 'Inventory Manager', description: 'Manages inventory and stock', userCount: 5, permissions: ['Dashboard', 'Inventory', 'WMS'] },
    { id: 'R03', name: 'Sales Representative', description: 'Manages sales orders', userCount: 12, permissions: ['Dashboard', 'Orders', 'Sales', 'CRM'] },
    { id: 'R04', name: 'Finance Staff', description: 'Manages financial data', userCount: 4, permissions: ['Dashboard', 'Finance'] },
    { id: 'R05', name: 'Operator', description: 'Access to MES for production logging', userCount: 25, permissions: ['MES'] },
];

export const PRODUCT_DATA: Product[] = [
    { id: 'PROD001', name: 'IV Drip Set - Adult', sku: 'SFL-IV-AD-01', category: 'Infusion Supplies', unitPrice: 35000, bomId: 'BOM-IV-AD-01' },
    { id: 'PROD002', name: 'Syringe 10ml with Needle', sku: 'SFL-SYR-10ML-01', category: 'Medical Consumables', unitPrice: 200000, bomId: 'BOM-SYR-10ML-01' },
    { id: 'PROD003', name: 'Digital Thermometer', sku: 'SFL-TRM-DIG-01', category: 'Medical Devices', unitPrice: 110000, bomId: 'BOM-TRM-DIG-01' },
];

export const PURCHASE_ORDER_DATA: PurchaseOrder[] = [
    { id: 'PO-001', supplier: 'PT Medika Supply', date: '2023-10-15', status: 'Received', itemCount: 3, total: 15_000_000 },
    { id: 'PO-002', supplier: 'CV Sejahtera Kimia', date: '2023-10-20', status: 'Sent', itemCount: 5, total: 8_500_000 },
    { id: 'PO-003', supplier: 'PT Global Plastik', date: '2023-10-22', status: 'Draft', itemCount: 2, total: 22_000_000 },
];

export const QUALITY_CHECK_DATA: QualityCheck[] = [
    { id: 'QC-001', productName: 'IV Drip Set - Adult', batchId: 'B2310-001A', checkDate: '2023-10-25', inspector: 'Siti Aminah', status: 'Passed' },
    { id: 'QC-002', productName: 'Syringe 10ml', batchId: 'B2310-002B', checkDate: '2023-10-26', inspector: 'Siti Aminah', status: 'Pending' },
    { id: 'QC-003', productName: 'Digital Thermometer', batchId: 'B2309-051F', checkDate: '2023-09-30', inspector: 'Agus Salim', status: 'Failed' },
];

export const MAINTENANCE_TASK_DATA: MaintenanceTask[] = [
    { id: 'MT-001', machine: 'Extruder Machine #1', task: 'Monthly Lubrication', dueDate: '2023-11-01', priority: 'Medium', status: 'Pending' },
    { id: 'MT-002', machine: 'Sterilization Chamber #3', task: 'Calibrate Temperature Sensor', dueDate: '2023-10-28', priority: 'High', status: 'In Progress' },
    { id: 'MT-003', machine: 'Packaging Line #2', task: 'Check Conveyor Belt', dueDate: '2023-10-20', priority: 'Low', status: 'Completed' },
];

export const REGULATION_DATA: Regulation[] = [
    { id: 'REG-01', name: 'ISO 13485:2016', issuingBody: 'International Organization for Standardization', status: 'Compliant', nextReviewDate: '2024-05-15' },
    { id: 'REG-02', name: 'CDAKB', issuingBody: 'Kemenkes RI', status: 'Pending Review', nextReviewDate: '2023-12-01' },
];

export const EMPLOYEE_DATA: Employee[] = [
    { id: 'EMP001', name: 'Anwar Hidayat', department: 'Produksi', position: 'Operator', email: 'anwar.h@company.com', joinDate: '2021-01-15' },
    { id: 'EMP002', name: 'Sari Indraswari', department: 'Quality Control', position: 'QC Inspector', email: 'sari.i@company.com', joinDate: '2022-05-20' },
    { id: 'EMP003', name: 'Budi Santoso', department: 'Gudang', position: 'Staff Gudang', email: 'budi.s@company.com', joinDate: '2019-10-09' },
];

export const PAYABLE_DATA: Payable[] = [
    { invoiceId: 'INV-SUP-001', supplier: 'PT Medika Supply', issueDate: '2023-10-01', dueDate: '2023-10-31', amount: 15_000_000, status: 'Unpaid' },
    { invoiceId: 'INV-SUP-002', supplier: 'CV Sejahtera Kimia', issueDate: '2023-09-15', dueDate: '2023-10-15', amount: 8_500_000, status: 'Overdue' },
    { invoiceId: 'INV-SUP-003', supplier: 'PT Global Plastik', issueDate: '2023-09-20', dueDate: '2023-10-20', amount: 22_000_000, status: 'Paid' },
];

export const RECEIVABLE_DATA: Receivable[] = [
    { invoiceId: 'INV-CUST-001', customer: 'RS Harapan Kita', issueDate: '2023-10-25', dueDate: '2023-11-24', amount: 5_250_000, status: 'Unpaid' },
    { invoiceId: 'INV-CUST-002', customer: 'Klinik Medika Utama', issueDate: '2023-09-10', dueDate: '2023-10-10', amount: 1_800_000, status: 'Overdue' },
    { invoiceId: 'INV-CUST-003', customer: 'RS Mitra Keluarga', issueDate: '2023-09-24', dueDate: '2023-10-24', amount: 12_500_000, status: 'Paid' },
];

export const LEDGER_DATA: LedgerEntry[] = [
    { id: 1, date: '2023-10-01', account: 'Cash', description: 'Initial Balance', debit: 500_000_000, credit: null, balance: 500_000_000 },
    { id: 2, date: '2023-10-05', account: 'Accounts Receivable', description: 'Sale to RS Harapan Kita', debit: 5_250_000, credit: null, balance: 505_250_000 },
    { id: 3, date: '2023-10-05', account: 'Sales Revenue', description: 'Sale to RS Harapan Kita', debit: null, credit: 5_250_000, balance: 500_000_000 },
    { id: 4, date: '2023-10-10', account: 'Accounts Payable', description: 'Purchase from PT Medika Supply', debit: null, credit: 15_000_000, balance: 485_000_000 },
];

export const COST_ACCOUNTING_DATA: CostCenter[] = [
    { id: 'CC-01', name: 'Produk: IV Drip Set - Adult', hpp: 18_500, lastCalculated: '2023-10-01' },
    { id: 'CC-02', name: 'Produk: Syringe 10ml', hpp: 110_000, lastCalculated: '2023-10-01' },
];

export const BUDGET_DATA: Budget[] = [
    { id: 'BUD-01', department: 'Produksi', year: 2023, totalBudget: 1_500_000_000, spent: 1_200_000_000, status: 'On Track' },
    { id: 'BUD-02', department: 'Marketing', year: 2023, totalBudget: 300_000_000, spent: 310_000_000, status: 'Over Budget' },
    { id: 'BUD-03', department: 'R&D', year: 2023, totalBudget: 250_000_000, spent: 180_000_000, status: 'Under Budget' },
];

// Generate production log data for the last 90 days
const generateProductionData = (): ProductionLog[] => {
    const data: ProductionLog[] = [];
    const today = new Date();
    for (let i = 0; i < 90; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];

        // Produce 1 to 3 different products each day
        const productCount = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < productCount; j++) {
            const product = PRODUCT_DATA[Math.floor(Math.random() * PRODUCT_DATA.length)];
            const quantityProduced = Math.floor(Math.random() * (500 - 50 + 1)) + 50; // Random quantity between 50 and 500
            data.push({
                date: dateString,
                productId: product.id,
                productName: product.name,
                quantityProduced: quantityProduced,
            });
        }
    }
    return data;
};

export const PRODUCTION_LOG_DATA: ProductionLog[] = generateProductionData();

export const WORK_ORDER_DATA: WorkOrder[] = [
    { id: 'WO-001', productName: 'IV Drip Set - Adult', productSku: 'SFL-IV-AD-01', quantityToProduce: 1000, quantityProduced: 1000, quantityRejected: 15, status: 'Completed', operator: 'Eko Prasetyo', machine: 'Assembly Line #1', dueDate: '2023-10-25' },
    { id: 'WO-002', productName: 'Syringe 10ml with Needle', productSku: 'SFL-SYR-10ML-01', quantityToProduce: 500, quantityProduced: 250, quantityRejected: 5, status: 'In Progress', operator: 'Anwar Hidayat', machine: 'Molding Machine #2', dueDate: '2023-10-27' },
    { id: 'WO-003', productName: 'Digital Thermometer', productSku: 'SFL-TRM-DIG-01', quantityToProduce: 800, quantityProduced: 0, quantityRejected: 0, status: 'Pending', operator: 'N/A', machine: 'Assembly Line #2', dueDate: '2023-10-28' },
    { id: 'WO-004', productName: 'IV Drip Set - Adult', productSku: 'SFL-IV-AD-01', quantityToProduce: 1200, quantityProduced: 0, quantityRejected: 0, status: 'Pending', operator: 'N/A', machine: 'Assembly Line #1', dueDate: '2023-10-29' },
];