import { useSelector } from 'react-redux';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  PieChart
} from 'lucide-react';
import styles from './CustomerDashboard.module.css'; // Reusing styles

const AdminDashboard = () => {
  const { policies } = useSelector((state) => state.policies);
  const { claims } = useSelector((state) => state.claims);
  const { payments } = useSelector((state) => state.payments);

  const totalCustomers = 15;
  const totalAgents = 3;
  const activePolicies = policies.filter(p => p.status === 'active').length;
  const pendingPolicies = policies.filter(p => p.status === 'pending').length;
  const totalClaims = claims.length;
  const pendingClaims = claims.filter(c => c.status === 'pending').length;
  const approvedClaims = claims.filter(c => c.status === 'approved').length;
  const processingClaims = claims.filter(c => c.status === 'processing').length;
  
  const totalPremiums = policies.reduce((sum, p) => sum + p.premium, 0);
  const totalCoverage = policies.reduce((sum, p) => sum + p.coverage, 0);
  const totalClaimAmount = claims.reduce((sum, c) => sum + c.amount, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const className = status === 'active' || status === 'approved' ? 'statusActive' : 
                     status === 'pending' || status === 'processing' ? 'statusPending' : 'statusInactive';
    return <span className={className}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  const policyDistribution = {
    auto: policies.filter(p => p.type === 'auto').length,
    home: policies.filter(p => p.type === 'home').length,
    life: policies.filter(p => p.type === 'life').length,
    health: policies.filter(p => p.type === 'health').length,
  };

  const ProgressBar = ({ value, label, count }) => (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
        <span style={{ textTransform: 'capitalize' }}>{label}</span>
        <span>{count} {label.includes('performance') ? '%' : 'items'}</span>
      </div>
      <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--muted)', borderRadius: '4px', overflow: 'hidden' }}>
        <div 
          style={{ 
            width: `${value}%`, 
            height: '100%', 
            backgroundColor: 'var(--primary)', 
            borderRadius: '4px',
            transition: 'width 0.3s ease-in-out'
          }} 
        />
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Welcome Section */}
      <div className={styles.welcome}>
        <h1 className={styles.welcomeTitle}>Administrator Dashboard</h1>
        <p className={styles.welcomeSubtitle}>
          Comprehensive overview of system performance and operations.
        </p>
      </div>

      {/* Key Metrics */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={`${styles.statIcon} ${styles.statIconPrimary}`}>
              <Users color="var(--primary)" size={20} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Total Users</p>
              <p className={styles.statValue}>{totalCustomers + totalAgents}</p>
              <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: 0 }}>
                {totalCustomers} customers, {totalAgents} agents
              </p>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={`${styles.statIcon} ${styles.statIconSuccess}`}>
              <Shield color="var(--success)" size={20} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Active Policies</p>
              <p className={styles.statValue}>{activePolicies}</p>
              <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: 0 }}>
                {pendingPolicies} pending
              </p>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={`${styles.statIcon} ${styles.statIconWarning}`}>
              <FileText color="var(--warning)" size={20} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Total Claims</p>
              <p className={styles.statValue}>{totalClaims}</p>
              <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: 0 }}>
                {pendingClaims} pending review
              </p>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={`${styles.statIcon} ${styles.statIconAccent}`}>
              <DollarSign color="var(--accent)" size={20} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Total Premiums</p>
              <p className={styles.statValue}>{formatCurrency(totalPremiums)}</p>
              <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: 0 }}>
                Annual revenue
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* System Health */}
        <div className={styles.statCard}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
              <Activity size={20} />
              System Health
            </h3>
            <p style={{ color: 'var(--muted-foreground)', margin: 0, fontSize: '14px' }}>
              Real-time system performance metrics
            </p>
          </div>
          <div>
            <ProgressBar value={98} label="Server Performance" count={98} />
            <ProgressBar value={95} label="Database Health" count={95} />
            <ProgressBar value={99} label="API Response Time" count={99} />
            <ProgressBar value={96} label="User Satisfaction" count={96} />
          </div>
        </div>

        {/* Financial Overview */}
        <div className={styles.statCard}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
              <TrendingUp size={20} />
              Financial Overview
            </h3>
            <p style={{ color: 'var(--muted-foreground)', margin: 0, fontSize: '14px' }}>
              Key financial metrics and performance
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'rgba(5, 150, 105, 0.05)', borderRadius: '8px', border: '1px solid rgba(5, 150, 105, 0.2)' }}>
              <p className={styles.statLabel}>Total Coverage</p>
              <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--success)', margin: 0 }}>
                {formatCurrency(totalCoverage)}
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'rgba(217, 119, 6, 0.05)', borderRadius: '8px', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
              <p className={styles.statLabel}>Claims Paid</p>
              <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--warning)', margin: 0 }}>
                {formatCurrency(totalClaimAmount)}
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'rgba(30, 64, 175, 0.05)', borderRadius: '8px', border: '1px solid rgba(30, 64, 175, 0.2)' }}>
              <p className={styles.statLabel}>Annual Revenue</p>
              <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary)', margin: 0 }}>
                {formatCurrency(totalPremiums)}
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'rgba(249, 115, 22, 0.05)', borderRadius: '8px', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
              <p className={styles.statLabel}>Profit Margin</p>
              <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent)', margin: 0 }}>
                24.5%
              </p>
            </div>
          </div>
        </div>

        {/* Policy Distribution */}
        <div className={styles.statCard}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
              <PieChart size={20} />
              Policy Distribution
            </h3>
            <p style={{ color: 'var(--muted-foreground)', margin: 0, fontSize: '14px' }}>
              Breakdown by insurance type
            </p>
          </div>
          <div>
            {Object.entries(policyDistribution).map(([type, count]) => (
              <ProgressBar 
                key={type}
                value={(count / policies.length) * 100} 
                label={`${type} Insurance`} 
                count={count}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.statCard}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>Recent System Activity</h3>
            <p style={{ color: 'var(--muted-foreground)', margin: 0, fontSize: '14px' }}>
              Latest updates and important events
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', backgroundColor: 'rgba(5, 150, 105, 0.05)', borderRadius: '8px', border: '1px solid rgba(5, 150, 105, 0.2)' }}>
              <CheckCircle color="var(--success)" size={20} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '500', color: 'var(--foreground)', margin: 0 }}>New policy activated</p>
                <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', margin: 0 }}>AUTO-001 for John Smith - 2 hours ago</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', backgroundColor: 'rgba(217, 119, 6, 0.05)', borderRadius: '8px', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
              <Clock color="var(--warning)" size={20} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '500', color: 'var(--foreground)', margin: 0 }}>Claim pending review</p>
                <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', margin: 0 }}>CLM-003 requires agent attention - 4 hours ago</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', backgroundColor: 'rgba(30, 64, 175, 0.05)', borderRadius: '8px', border: '1px solid rgba(30, 64, 175, 0.2)' }}>
              <Users color="var(--primary)" size={20} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '500', color: 'var(--foreground)', margin: 0 }}>New customer registered</p>
                <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', margin: 0 }}>Emily Davis joined the platform - 6 hours ago</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', backgroundColor: 'rgba(220, 38, 38, 0.05)', borderRadius: '8px', border: '1px solid rgba(220, 38, 38, 0.2)' }}>
              <AlertTriangle color="var(--destructive)" size={20} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: '500', color: 'var(--foreground)', margin: 0 }}>System maintenance scheduled</p>
                <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', margin: 0 }}>Database optimization planned for tomorrow 2 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Policies */}
      <div className={styles.statCard}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>Recent Policies</h3>
          <p style={{ color: 'var(--muted-foreground)', margin: 0, fontSize: '14px' }}>
            Latest policy activities across the system
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {policies.slice(0, 5).map((policy) => (
            <div key={policy.id} className={styles.paymentItem}>
              <div className={styles.paymentLeft}>
                <div className={styles.paymentIcon}>
                  <Shield color="var(--primary)" size={20} />
                </div>
                <div className={styles.paymentInfo}>
                  <p className={styles.paymentTitle}>
                    {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)} Insurance
                  </p>
                  <p className={styles.paymentMeta}>Policy #{policy.policyNumber}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <p className={styles.paymentAmount}>{formatCurrency(policy.premium)}</p>
                  <p className={styles.statLabel}>Premium</p>
                </div>
                {getStatusBadge(policy.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;