import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import BOM from './components/BOM';
import Users from './components/Users';
import Roles from './components/Roles';
import ProductManagement from './components/ProductManagement';
import SupplyChain from './components/SupplyChain';
import Sales from './components/Sales';
import QualityAssurance from './components/QualityAssurance';
import Compliance from './components/Compliance';
import FinanceLanding from './components/FinanceLanding';
import AccountsPayable from './components/AccountsPayable';
import AccountsReceivable from './components/AccountsReceivable';
import GeneralLedger from './components/GeneralLedger';
import CostAccounting from './components/CostAccounting';
import Budgeting from './components/Budgeting';
import HR from './components/HR';
import Maintenance from './components/Maintenance';
import Reporting from './components/Reporting';
import MES from './components/MES';
import WMS from './components/WMS';
import CRM from './components/CRM';
import MRP from './components/MRP';
import Scheduling from './components/Scheduling';
import LoginPage from './components/LoginPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SupplierManagement from './components/SupplierManagement';
import GoodsReceipt from './components/GoodsReceipt';
import DeliveryOrder from './components/DeliveryOrder';
import Quotation from './components/Quotation';
import StockTransfer from './components/StockTransfer';
import PaymentProcessing from './components/PaymentProcessing';
import TaxManagement from './components/TaxManagement';
import DocumentControl from './components/DocumentControl';
import IncomingQuality from './components/IncomingQuality';


export type Page =
  | 'Dashboard'
  | 'Inventory'
  | 'Orders'
  | 'BOM'
  | 'Users'
  | 'Roles'
  | 'ProductManagement'
  | 'SupplyChain'
  | 'Sales'
  | 'QualityAssurance'
  | 'Compliance'
  | 'Finance'
  | 'AccountsPayable'
  | 'AccountsReceivable'
  | 'GeneralLedger'
  | 'CostAccounting'
  | 'Budgeting'
  | 'HR'
  | 'Maintenance'
  | 'Reporting'
  | 'MES'
  | 'WMS'
  | 'CRM'
  | 'MRP'
  | 'Scheduling'
  | 'Login'
  | 'SupplierManagement'
  | 'GoodsReceipt'
  | 'DeliveryOrder'
  | 'Quotation'
  | 'StockTransfer'
  | 'PaymentProcessing'
  | 'TaxManagement'
  | 'DocumentControl'
  | 'IncomingQuality';

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isAuthenticated, login, logout, isLoading } = useAuth();
  const [loginError, setLoginError] = useState<string>('');

  const handleLogin = async (username: string, password: string) => {
    setLoginError('');
    const success = await login(username, password);
    if (!success) {
      setLoginError('Invalid username or password');
    }
    return success;
  };

  const handleLogout = () => {
    logout();
    setActivePage('Dashboard');
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl shadow-lg">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading SafeLock ERP...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} error={loginError} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard': return <Dashboard />;
      case 'Inventory': return <Inventory />;
      case 'Orders': return <Orders />;
      case 'BOM': return <BOM />;
      case 'Users': return <Users />;
      case 'Roles': return <Roles />;
      case 'ProductManagement': return <ProductManagement />;
      case 'SupplyChain': return <SupplyChain />;
      case 'Sales': return <Sales />;
      case 'QualityAssurance': return <QualityAssurance />;
      case 'Compliance': return <Compliance />;
      case 'Finance': return <FinanceLanding />;
      case 'AccountsPayable': return <AccountsPayable />;
      case 'AccountsReceivable': return <AccountsReceivable />;
      case 'GeneralLedger': return <GeneralLedger />;
      case 'CostAccounting': return <CostAccounting />;
      case 'Budgeting': return <Budgeting />;
      case 'HR': return <HR />;
      case 'Maintenance': return <Maintenance />;
      case 'Reporting': return <Reporting />;
      case 'MES': return <MES />;
      case 'WMS': return <WMS />;
      case 'CRM': return <CRM />;
      case 'MRP': return <MRP />;
      case 'Scheduling': return <Scheduling />;
      case 'SupplierManagement': return <SupplierManagement />;
      case 'GoodsReceipt': return <GoodsReceipt />;
      case 'DeliveryOrder': return <DeliveryOrder />;
      case 'Quotation': return <Quotation />;
      case 'StockTransfer': return <StockTransfer />;
      case 'PaymentProcessing': return <PaymentProcessing />;
      case 'TaxManagement': return <TaxManagement />;
      case 'DocumentControl': return <DocumentControl />;
      case 'IncomingQuality': return <IncomingQuality />;
      default:
        return <div className="p-6"><h1 className="text-2xl font-semibold text-gray-700">{activePage}</h1><p className="mt-2 text-gray-500">This page is under construction.</p></div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isOpen={isSidebarOpen} />
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} onLogout={handleLogout} />
        <div className="p-4 lg:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;