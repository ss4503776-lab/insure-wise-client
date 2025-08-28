import { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Car, 
  Home, 
  Heart, 
  Shield, 
  CreditCard, 
  FileText, 
  Plus, 
  Upload,
  DollarSign,
  CheckCircle
} from 'lucide-react';
import styles from './CustomerDashboard.module.css';
import '../styles/globals.module.css';

const CustomerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { policies } = useSelector((state) => state.policies);
  const { claims } = useSelector((state) => state.claims);
  const { payments } = useSelector((state) => state.payments);
  
  const [activeTab, setActiveTab] = useState('policies');

  const userPolicies = policies.filter(p => p.customerId === user?.id);
  const userClaims = claims.filter(c => c.customerId === user?.id);
  const userPayments = payments.filter(p => p.customerId === user?.id);

  const getStatusBadge = (status) => {
    const className = status === 'active' ? 'statusActive' : 
                     status === 'pending' ? 'statusPending' : 'statusInactive';
    return <span className={className}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  const getPolicyIcon = (type) => {
    const iconProps = { size: 20, color: 'var(--primary)' };
    switch (type) {
      case 'auto': return <Car {...iconProps} />;
      case 'home': return <Home {...iconProps} />;
      case 'life': return <Heart {...iconProps} />;
      case 'health': return <Shield {...iconProps} />;
      default: return <Shield {...iconProps} />;
    }
  };

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

  return (
    <div className={styles.container}>
      {/* Welcome Section */}
      <div className={styles.welcome}>
        <h1 className={styles.welcomeTitle}>
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className={styles.welcomeSubtitle}>
          Manage your policies, claims, and payments all in one place.
        </p>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={`${styles.statIcon} ${styles.statIconPrimary}`}>
              <Shield color="var(--primary)" size={20} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Active Policies</p>
              <p className={styles.statValue}>
                {userPolicies.filter(p => p.status === 'active').length}
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
              <p className={styles.statLabel}>Open Claims</p>
              <p className={styles.statValue}>
                {userClaims.filter(c => c.status === 'pending' || c.status === 'processing').length}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={`${styles.statIcon} ${styles.statIconSuccess}`}>
              <DollarSign color="var(--success)" size={20} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>This Month</p>
              <p className={styles.statValue}>
                {formatCurrency(userPayments.reduce((sum, p) => sum + p.amount, 0))}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={`${styles.statIcon} ${styles.statIconAccent}`}>
              <CheckCircle color="var(--accent)" size={20} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Coverage</p>
              <p className={styles.statValue}>
                {formatCurrency(userPolicies.reduce((sum, p) => sum + p.coverage, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className={styles.tabs}>
        <div className={styles.tabsList}>
          <button 
            className={`${styles.tabsTrigger} ${activeTab === 'policies' ? styles.tabsTriggerActive : ''}`}
            onClick={() => setActiveTab('policies')}
          >
            My Policies
          </button>
          <button 
            className={`${styles.tabsTrigger} ${activeTab === 'claims' ? styles.tabsTriggerActive : ''}`}
            onClick={() => setActiveTab('claims')}
          >
            Claims
          </button>
          <button 
            className={`${styles.tabsTrigger} ${activeTab === 'payments' ? styles.tabsTriggerActive : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            Payments
          </button>
        </div>

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionInfo}>
                <h2 className={styles.sectionTitle}>Your Policies</h2>
                <p className={styles.sectionDescription}>View and manage your insurance policies</p>
              </div>
              <button className={`${styles.button} ${styles.buttonPrimary}`}>
                <Plus size={16} />
                Request Quote
              </button>
            </div>

            <div className={styles.policiesGrid}>
              {userPolicies.map((policy) => (
                <div key={policy.id} className={styles.policyCard}>
                  <div className={styles.policyHeader}>
                    <div className={styles.policyTitleGroup}>
                      <div className={styles.policyIcon}>
                        {getPolicyIcon(policy.type)}
                      </div>
                      <div className={styles.policyTitleInfo}>
                        <h3 className={styles.policyTitle}>
                          {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)} Insurance
                        </h3>
                        <p className={styles.policyNumber}>Policy #{policy.policyNumber}</p>
                      </div>
                    </div>
                    {getStatusBadge(policy.status)}
                  </div>
                  
                  <div className={styles.policyDetails}>
                    <div className={styles.policyDetailItem}>
                      <p className={styles.policyDetailLabel}>Premium</p>
                      <p className={styles.policyDetailValue}>{formatCurrency(policy.premium)}/year</p>
                    </div>
                    <div className={styles.policyDetailItem}>
                      <p className={styles.policyDetailLabel}>Coverage</p>
                      <p className={styles.policyDetailValue}>{formatCurrency(policy.coverage)}</p>
                    </div>
                    <div className={styles.policyDetailItem}>
                      <p className={styles.policyDetailLabel}>Start Date</p>
                      <p className={styles.policyDetailValue}>{formatDate(policy.startDate)}</p>
                    </div>
                    <div className={styles.policyDetailItem}>
                      <p className={styles.policyDetailLabel}>End Date</p>
                      <p className={styles.policyDetailValue}>{formatDate(policy.endDate)}</p>
                    </div>
                  </div>
                  
                  <div className={styles.policyActions}>
                    <button className={`${styles.button} ${styles.buttonOutline} ${styles.buttonSmall}`}>
                      <FileText size={12} />
                      View Details
                    </button>
                    <button className={`${styles.button} ${styles.buttonOutline} ${styles.buttonSmall}`}>
                      <Upload size={12} />
                      Upload Documents
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Claims Tab */}
        {activeTab === 'claims' && (
          <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionInfo}>
                <h2 className={styles.sectionTitle}>Your Claims</h2>
                <p className={styles.sectionDescription}>Track and manage your insurance claims</p>
              </div>
              <button className={`${styles.button} ${styles.buttonPrimary}`}>
                <Plus size={16} />
                File New Claim
              </button>
            </div>

            <div className={styles.claimsList}>
              {userClaims.map((claim) => (
                <div key={claim.id} className={styles.claimCard}>
                  <div className={styles.claimContent}>
                    <div className={styles.claimInfo}>
                      <div className={styles.claimHeader}>
                        <div className={styles.claimIcon}>
                          <FileText color="var(--warning)" size={20} />
                        </div>
                        <div className={styles.claimTitleInfo}>
                          <h3 className={styles.claimTitle}>Claim #{claim.claimNumber}</h3>
                          <p className={styles.claimDescription}>{claim.description}</p>
                        </div>
                      </div>
                      
                      <div className={styles.claimDetails}>
                        <div className={styles.policyDetailItem}>
                          <p className={styles.policyDetailLabel}>Amount</p>
                          <p className={styles.policyDetailValue}>{formatCurrency(claim.amount)}</p>
                        </div>
                        <div className={styles.policyDetailItem}>
                          <p className={styles.policyDetailLabel}>Submitted</p>
                          <p className={styles.policyDetailValue}>{formatDate(claim.dateSubmitted)}</p>
                        </div>
                        <div className={styles.policyDetailItem}>
                          <p className={styles.policyDetailLabel}>Status</p>
                          {getStatusBadge(claim.status)}
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.claimActions}>
                      <button className={`${styles.button} ${styles.buttonOutline} ${styles.buttonSmall}`}>
                        View Details
                      </button>
                      <button className={`${styles.button} ${styles.buttonOutline} ${styles.buttonSmall}`}>
                        <Upload size={12} />
                        Add Documents
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionInfo}>
                <h2 className={styles.sectionTitle}>Payment History</h2>
                <p className={styles.sectionDescription}>View your payment history and make new payments</p>
              </div>
              <button className={`${styles.button} ${styles.buttonPrimary}`}>
                <CreditCard size={16} />
                Make Payment
              </button>
            </div>

            <div className={styles.paymentsCard}>
              <div className={styles.paymentsList}>
                {userPayments.map((payment) => (
                  <div key={payment.id} className={styles.paymentItem}>
                    <div className={styles.paymentLeft}>
                      <div className={styles.paymentIcon}>
                        <CreditCard color="var(--success)" size={20} />
                      </div>
                      <div className={styles.paymentInfo}>
                        <p className={styles.paymentTitle}>{payment.description}</p>
                        <p className={styles.paymentMeta}>
                          {payment.method.replace('_', ' ').toUpperCase()} • {formatDate(payment.date)}
                        </p>
                      </div>
                    </div>
                    <div className={styles.paymentRight}>
                      <p className={styles.paymentAmount}>{formatCurrency(payment.amount)}</p>
                      {getStatusBadge(payment.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;