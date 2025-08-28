import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import LoginForm from '@/components/LoginForm';
import Layout from '@/components/Layout';
import CustomerDashboard from '@/components/CustomerDashboard';
import AgentDashboard from '@/components/AgentDashboard';
import AdminDashboard from '@/components/AdminDashboard';

const Index = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

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
