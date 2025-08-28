import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm.js';
import Layout from '../components/Layout.js';
import CustomerDashboard from '../components/CustomerDashboard.js';
import AgentDashboard from '../components/AgentDashboard.js';
import AdminDashboard from '../components/AdminDashboard.js';

const Index = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const getDashboardTitle = () => {
    switch (user?.role) {
      case 'customer': return 'Customer Dashboard';
      case 'agent': return 'Agent Dashboard'; 
      case 'admin': return 'Administrator Dashboard';
      default: return 'Dashboard';
    }
  };

  const renderDashboard = () => {
    switch (user?.role) {
      case 'customer': return <CustomerDashboard />;
      case 'agent': return <AgentDashboard />;
      case 'admin': return <AdminDashboard />;
      default: return <CustomerDashboard />;
    }
  };

  return (
    <Layout title={getDashboardTitle()}>
      {renderDashboard()}
    </Layout>
  );
};

export default Index;