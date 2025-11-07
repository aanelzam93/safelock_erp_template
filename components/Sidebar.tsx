import React, { useState } from 'react';
import { 
    DashboardIcon, InventoryIcon, OrdersIcon, BOMIcon, ChevronRightIcon, UserIcon, RoleIcon, ProductIcon,
    SupplyChainIcon, SalesIcon, QualityIcon, MaintenanceIcon, ComplianceIcon, FinanceIcon, HRIcon, ReportingIcon, ChevronDownIcon,
    MESIcon, WMSIcon, CRMIcon, PlanningIcon
} from './icons/NavIcons';
import type { Page } from '../App';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick, hasSubmenu = false, isSubmenuOpen }) => {
  return (
    <li
      className={`nav-item ${isActive ? 'active' : ''} ${hasSubmenu ? 'justify-between' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-3">{label}</span>
      </div>
      {hasSubmenu && (isSubmenuOpen ? <ChevronDownIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />)}
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isOpen }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleNavClick = (page: Page, submenu: string | null = null) => {
      setActivePage(page);
      if (submenu) {
          setOpenSubmenu(openSubmenu === submenu ? null : submenu);
      }
  };
  
  const financeSubmenuOpen = openSubmenu === 'Finance';
  const isFinanceActive = ['Finance', 'AccountsPayable', 'AccountsReceivable', 'GeneralLedger', 'CostAccounting', 'Budgeting'].includes(activePage);

  const userSubmenuOpen = openSubmenu === 'Users';
  const isUserMenuActive = ['Users', 'Roles'].includes(activePage);

  const navItems = [
    { type: 'item', id: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" />, label: 'Dashboard' },
    { type: 'header', label: 'PLANNING & EXECUTION' },
    { type: 'item', id: 'MRP', icon: <PlanningIcon className="w-6 h-6" />, label: 'MRP' },
    { type: 'item', id: 'Scheduling', icon: <PlanningIcon className="w-6 h-6" />, label: 'Production Scheduling' },
    { type: 'item', id: 'MES', icon: <MESIcon className="w-6 h-6" />, label: 'MES (Operator View)' },
    { type: 'header', label: 'CORE MODULES' },
    { type: 'item', id: 'ProductManagement', icon: <ProductIcon className="w-6 h-6" />, label: 'Product Management' },
    { type: 'item', id: 'BOM', icon: <BOMIcon className="w-6 h-6" />, label: 'BOM' },
    { type: 'item', id: 'SupplyChain', icon: <SupplyChainIcon className="w-6 h-6" />, label: 'Supply Chain (PO)' },
    { type: 'header', label: 'WAREHOUSE & LOGISTICS'},
    { type: 'item', id: 'Inventory', icon: <InventoryIcon className="w-6 h-6" />, label: 'Inventory' },
    { type: 'item', id: 'WMS', icon: <WMSIcon className="w-6 h-6" />, label: 'Warehouse Management' },
    { type: 'header', label: 'SALES & CUSTOMERS'},
    { type: 'item', id: 'CRM', icon: <CRMIcon className="w-6 h-6" />, label: 'CRM' },
    { type: 'item', id: 'Sales', icon: <SalesIcon className="w-6 h-6" />, label: 'Sales & Distribution' },
    { type: 'item', id: 'Orders', icon: <OrdersIcon className="w-6 h-6" />, label: 'Orders' },
    { type: 'header', label: 'OPERATIONS & ADMIN' },
    { type: 'item', id: 'QualityAssurance', icon: <QualityIcon className="w-6 h-6" />, label: 'Quality Assurance' },
    { type: 'item', id: 'Maintenance', icon: <MaintenanceIcon className="w-6 h-6" />, label: 'Maintenance' },
    { type: 'submenu', id: 'Finance', icon: <FinanceIcon className="w-6 h-6" />, label: 'Finance & Accounting', active: isFinanceActive, open: financeSubmenuOpen, children: [
        { id: 'AccountsPayable', label: 'Accounts Payable' },
        { id: 'AccountsReceivable', label: 'Accounts Receivable' },
        { id: 'GeneralLedger', label: 'General Ledger' },
        { id: 'CostAccounting', label: 'Cost Accounting' },
        { id: 'Budgeting', label: 'Budgeting' },
    ]},
    { type: 'item', id: 'HR', icon: <HRIcon className="w-6 h-6" />, label: 'Human Resource' },
    { type: 'submenu', id: 'Users', icon: <UserIcon className="w-6 h-6" />, label: 'User Management', active: isUserMenuActive, open: userSubmenuOpen, children: [
        { id: 'Users', label: 'Users' },
        { id: 'Roles', label: 'Roles & Permissions' },
    ]},
    { type: 'item', id: 'Compliance', icon: <ComplianceIcon className="w-6 h-6" />, label: 'Regulatory & Compliance' },
    { type: 'header', label: 'ANALYTICS' },
    { type: 'item', id: 'Reporting', icon: <ReportingIcon className="w-6 h-6" />, label: 'Reporting & Analytics' },
  ];

  return (
    <aside className={`sidebar custom-scrollbar flex flex-col w-64 lg:w-72 overflow-y-auto absolute inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-20`}>
        {/* Logo */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-100 px-6 py-5">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                    </svg>
                </div>
                <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">Safelock</h1>
                    <p className="text-xs text-gray-500 font-medium">Medical ERP System</p>
                </div>
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
            <ul className="space-y-1">
                {navItems.map((item) => {
                    if (item.type === 'header') {
                        return <li key={item.label} className="nav-category">{item.label}</li>;
                    }
                    if (item.type === 'item') {
                         return <NavItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            isActive={activePage === item.id}
                            onClick={() => setActivePage(item.id as Page)}
                        />
                    }
                    if (item.type === 'submenu') {
                        return (
                            <React.Fragment key={item.id}>
                                <NavItem
                                    icon={item.icon}
                                    label={item.label}
                                    isActive={item.active && !item.open}
                                    onClick={() => handleNavClick(item.id as Page, item.id)}
                                    hasSubmenu
                                    isSubmenuOpen={item.open}
                                />
                                {item.open && (
                                    <ul className="pl-8 space-y-1 mt-1">
                                        {item.children.map(child => (
                                            <li key={child.id} onClick={() => setActivePage(child.id as Page)}
                                                className={`p-2 text-sm rounded-md cursor-pointer transition-colors ${activePage === child.id ? 'text-teal-500 font-semibold' : 'text-gray-600 hover:bg-gray-200'}`}>
                                                {child.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </React.Fragment>
                        )
                    }
                    return null;
                })}
            </ul>
        </nav>

        {/* User Profile (Sidebar Footer) */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-teal-50 to-cyan-50">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                    A
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">Administrator</p>
                    <p className="text-xs text-gray-500 truncate">PT. Safelock Medical</p>
                </div>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;