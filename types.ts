export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  unit: string;
  lastUpdated: string;
  cost: number;
  locationId: string;
}

export interface SalesOrder {
  id: string;
  customer: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  itemCount: number;
  total: number;
}

export interface BillOfMaterial {
  id: string;
  productName: string;
  productSku: string;
  componentCount: number;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  unitPrice: number;
  bomId: string;
}

export interface PurchaseOrder {
  id: string;
  supplier: string;
  date: string;
  status: 'Draft' | 'Sent' | 'Received' | 'Cancelled';
  itemCount: number;
  total: number;
}

export interface QualityCheck {
  id: string;
  productName: string;
  batchId: string;
  checkDate: string;
  inspector: string;
  status: 'Passed' | 'Pending' | 'Failed';
}

export interface MaintenanceTask {
  id: string;
  machine: string;
  task: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface Regulation {
  id: string;
  name: string;
  issuingBody: string;
  status: 'Compliant' | 'Pending Review' | 'Non-Compliant';
  nextReviewDate: string;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
  joinDate: string;
}

export interface Payable {
  invoiceId: string;
  supplier: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

export interface Receivable {
  invoiceId: string;
  customer: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

export interface LedgerEntry {
  id: number;
  date: string;
  account: string;
  description: string;
  debit: number | null;
  credit: number | null;
  balance: number;
}

export interface CostCenter {
  id: string;
  name: string;
  hpp: number;
  lastCalculated: string;
}

export interface Budget {
  id: string;
  department: string;
  year: number;
  totalBudget: number;
  spent: number;
  status: 'On Track' | 'Over Budget' | 'Under Budget';
}

export interface ProductionLog {
    date: string;
    productId: string;
    productName: string;
    quantityProduced: number;
}

export interface WorkOrder {
    id: string;
    productName: string;
    productSku: string;
    quantityToProduce: number;
    quantityProduced: number;
    quantityRejected: number;
    status: 'Pending' | 'In Progress' | 'Completed' | 'On Hold';
    operator: string;
    machine: string;
    dueDate: string;
}

export interface WarehouseLocation {
    id: string;
    name: string;
    area: 'Receiving' | 'Storage' | 'Picking' | 'Quarantine';
    capacity: number; // in cubic meters or pallet slots
    itemCount: number;
}

export interface Customer {
    id: string;
    name: string;
    industry: string;
    contactPerson: string;
    email: string;
    phone: string;
    status: 'Lead' | 'Active' | 'Inactive';
}