import React from 'react';
import { Icon } from './Icon';

export const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  </Icon>
);

export const InventoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </Icon>
);

export const OrdersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
  </Icon>
);

export const BOMIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
      <path d="M17.5 19H9a7 7 0 1 1 0-14h8.5a5.5 5.5 0 1 1 0 11H11"></path>
  </Icon>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </Icon>
);

export const RoleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </Icon>
);

export const ProductIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </Icon>
);

export const SupplyChainIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M2 17h16v-4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4z"></path>
    <path d="M20 17h2v-4a2 2 0 0 0-2-2h-2v6z"></path>
    <path d="M12 11V7l-4 4"></path>
    <path d="M16 11V7l4 4"></path>
  </Icon>
);

export const SalesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </Icon>
);

export const QualityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M9 12l2 2 4-4"></path>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
  </Icon>
);

export const MaintenanceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </Icon>
);

export const ComplianceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M12 3v18"></path><path d="M3 8l9 3 9-3"></path><path d="M3 16l9-3 9 3"></path><path d="M21 12l-9-5-9 5"></path>
  </Icon>
);

export const FinanceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
    <path d="M9 8h6"></path><path d="M9 12h6"></path><path d="M9 16h6"></path><path d="M15 8v8"></path>
  </Icon>
);

export const HRIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <polyline points="17 11 19 13 23 9"></polyline>
  </Icon>
);

export const ReportingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M3 3v18h18"></path>
    <path d="M18 17V9"></path>
    <path d="M13 17V5"></path>
    <path d="M8 17v-3"></path>
  </Icon>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className} strokeWidth="2.5">
        <path d="M9 18l6-6-6-6" />
    </Icon>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className} strokeWidth="2.5">
        <path d="M6 9l6 6 6-6" />
    </Icon>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </Icon>
);

export const MESIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M14 9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2Z" />
        <path d="M6 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2" />
        <path d="M6 9h4" />
        <path d="M14 15h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2" />
        <path d="M10 15h4" />
        <path d="M6 21H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2" />
        <path d="M14 21h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2" />
        <path d="M10 21h4" />
        <path d="M10 9v6" />
    </Icon>
);

export const WMSIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </Icon>
);

export const CRMIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
);

export const PlanningIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
        <path d="M8 14h.01"></path>
        <path d="M12 14h.01"></path>
        <path d="M16 14h.01"></path>
        <path d="M8 18h.01"></path>
        <path d="M12 18h.01"></path>
        <path d="M16 18h.01"></path>
    </Icon>
);

// NEW ICONS FOR NEW FEATURES
export const SupplierIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </Icon>
);

export const GoodsReceiptIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"></path>
        <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"></path>
        <path d="M7 21h10"></path>
        <path d="M12 3v18"></path>
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
    </Icon>
);

export const DeliveryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M16 3h5v5"></path>
        <path d="M8 3H4v13h13"></path>
        <path d="M8 13h13v8H8z"></path>
        <path d="M10 16h4"></path>
    </Icon>
);

export const QuotationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="9" y1="15" x2="15" y2="15"></line>
    </Icon>
);

export const StockTransferIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M8 7h12m0 0l-4-4m4 4l-4 4"></path>
        <path d="M16 17H4m0 0l4 4m-4-4l4-4"></path>
    </Icon>
);

export const PaymentIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </Icon>
);

export const TaxIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"></path>
        <circle cx="12" cy="10" r="2"></circle>
    </Icon>
);

export const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
    </Icon>
);