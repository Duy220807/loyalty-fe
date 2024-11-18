import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Layout } from 'antd';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import CustomerList from '../pages/Customers';
import TierList from '../pages/Tiers';
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions'; // Import Transactions component
import RewardsList from '../pages/Rewards';
import CustomerPage from '../pages/Customers/CustomerPage';
import CustomerDetail from '../pages/Customers/CustomerDetail';
// import AddCustomer from '../pages/Customers/AddCustomer';
// import Rewards from '../pages/Membership/Rewards';

// Menu cấu hình
const menuItems = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: <DashboardOutlined />,
  },
  {
    path: '/customers',
    name: 'Customers',
    icon: <UserOutlined />,
    routes: [
      {
        path: '/customers/list',
        name: 'Customer List',
      },
      // {
      //   path: '/customers/add',
      //   name: 'Add Customer',
      // },
    ],
  },
  {
    path: '/membership',
    name: 'Membership',
    icon: <UserOutlined />,
    routes: [
      {
        path: '/membership/list',
        name: 'Membership List',
      },

    ],
  },
  {
    path: '/rewards',
    name: 'Rewards',
    icon: <UserOutlined />,
    routes: [
      {
        path: '/rewards/list',
        name: 'Rewards List',
      },
    ],
  },
  // Thêm menu cho trang Transactions
  {
    path: '/transactions',
    name: 'Transactions',
    icon: <UserOutlined />,
    routes: [
      {
        path: '/transactions/list',
        name: 'Transactions List',
      },
    ]
  },
];

// Component chính
const AdminDashboard = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
        <ProLayout
          title="Admin Dashboard"
          menuItemRender={(item, dom) => (
            <Link to={item.path}>{dom}</Link>
          )}
          route={{
            routes: menuItems,
          }}
          style={{
            padding: 0,
            minHeight: '100vh',
          }}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers/list" element={<CustomerList />} />
            {/* <Route path="/customers/add" element={<AddCustomer />} /> */}
            <Route path="/membership/list" element={<TierList />} />
            <Route path="/rewards/list" element={<RewardsList />} />
            {/* Thêm route cho Transactions */}
            <Route path="/transactions/list" element={<Transactions />} />
            <Route path="/customer/add" element={<CustomerPage />} />
            <Route path="/customer/edit/:id" element={<CustomerPage />} />
            <Route path="/customer/detail/:id" element={<CustomerDetail />} /> {/* Thêm đường dẫn chi tiết */}
          </Routes>
        </ProLayout>
      </Layout>
    </Router>
  );
};

export default AdminDashboard;
