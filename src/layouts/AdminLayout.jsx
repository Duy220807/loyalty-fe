import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { Layout } from 'antd';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import CustomerList from '../pages/Customers';
// import CustomerForm from '../pages/Customers/CustomerForm';
// import CustomerDetails from '../pages/Customers/CustomerDetails';

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
      {
        path: '/customers/add',
        name: 'Add Customer',
      },
    ],
  },
  {
    path: '/membership',
    name: 'Membership',
    icon: <UserOutlined />,
    routes: [
      {
        path: '/membership/levels',
        name: 'Membership Levels',
      },
      {
        path: '/membership/rewards',
        name: 'Rewards',
      },
    ],
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
            {/* <Route path="/customers/details/:id" element={<CustomerDetails />} /> */}
            {/* <Route path="/customers/edit/:id" element={<CustomerForm />} /> */}
            <Route path="/customers/add" element={<AddCustomer />} />
            <Route path="/membership/levels" element={<MembershipLevels />} />
            <Route path="/membership/rewards" element={<Rewards />} />
          </Routes>
        </ProLayout>
      </Layout>
    </Router>
  );
};

// Các Component phụ
const Dashboard = () => (
  <PageContainer style={{ width: '100%' }}>
    <h2>Dashboard</h2>
    <p>Welcome to the admin dashboard!</p>
  </PageContainer>
);

const AddCustomer = () => (
  <PageContainer style={{ width: '100%' }}>
    <h2>Add Customer</h2>
    <p>Use this page to add a new customer.</p>
  </PageContainer>
);

const MembershipLevels = () => (
  <PageContainer style={{ width: '100%' }}>
    <h2>Membership Levels</h2>
    <p>Manage membership levels here.</p>
  </PageContainer>
);

const Rewards = () => (
  <PageContainer style={{ width: '100%' }}>
    <h2>Rewards</h2>
    <p>Manage rewards for members here.</p>
  </PageContainer>
);

export default AdminDashboard;
