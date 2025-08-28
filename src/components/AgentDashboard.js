import { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Plus, 
  Search,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import styles from './CustomerDashboard.module.css'; // Reusing styles

const AgentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { policies } = useSelector((state) => state.policies);
  const { claims } = useSelector((state) => state.claims);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('customers');

  const agentPolicies = policies.filter(p => p.agentId === user?.id);
  const agentClaims = claims.filter(c => {
    const policy = policies.find(p => p.id === c.policyId);
    return policy?.agentId === user?.id;
  });

  const customers = [
    { id: 'customer1', name: 'John Smith', email: 'john@example.com', phone: '(555) 123-4567', policies: 2, totalPremium: 3000 },
    { id: 'customer2', name: 'Emily Davis', email: 'emily@example.com', phone: '(555) 987-6543', policies: 1, totalPremium: 800 },
    { id: 'customer3', name: 'Michael Johnson', email: 'michael@example.com', phone: '(555) 456-7890', policies: 3, totalPremium: 4500 },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const className = status === 'active' || status === 'approved' ? 'statusActive' : 
                     status === 'pending' || status === 'processing' ? 'statusPending' : 'statusInactive';
    return <span className={className}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
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

  const totalCustomers = customers.length;
  const activePolicies = agentPolicies.filter(p => p.status === 'active').length;
  const pendingClaims = agentClaims.filter(c => c.status === 'pending' || c.status === 'processing').length;
  const totalPremiums = agentPolicies.reduce((sum, p) => sum + p.premium, 0);

  return (
    <div className={styles.container}>
      {/* Welcome Section */}
      <div className={styles.welcome}>
        <h1 className={styles.welcomeTitle}>Agent Dashboard</h1>
        <p className={styles.welcomeSubtitle}>
          Manage your clients, policies, and claims efficiently.
        </p>
      </div>

      {/* Agent Performance Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={`${styles.statIcon} ${styles.statIconPrimary}`}>
              <Users color="var(--primary)" size={20} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Total Clients</p>
              <p className={styles.statValue}>{totalCustomers}</p>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={`${styles.statIcon} ${styles.statIconSuccess}`}>
              <FileText color="var(--success)" size={20} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Active Policies</p>
              <p className={styles.statValue}>{activePolicies}</p>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={`${styles.statIcon} ${styles.statIconWarning}`}>
              <Clock color="var(--warning)" size={20} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Pending Claims</p>
              <p className={styles.statValue}>{pendingClaims}</p>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={`${styles.statIcon} ${styles.statIconAccent}`}>
              <TrendingUp color="var(--accent)" size={20} />
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Total Premiums</p>
              <p className={styles.statValue}>{formatCurrency(totalPremiums)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className={styles.tabs}>
        <div className={styles.tabsList}>
          <button 
            className={`${styles.tabsTrigger} ${activeTab === 'customers' ? styles.tabsTriggerActive : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            Customers
          </button>
          <button 
            className={`${styles.tabsTrigger} ${activeTab === 'policies' ? styles.tabsTriggerActive : ''}`}
            onClick={() => setActiveTab('policies')}
          >
            Policies
          </button>
          <button 
            className={`${styles.tabsTrigger} ${activeTab === 'claims' ? styles.tabsTriggerActive : ''}`}
            onClick={() => setActiveTab('claims')}
          >
            Claims
          </button>
        </div>

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionInfo}>
                <h2 className={styles.sectionTitle}>Customer Management</h2>
                <p className={styles.sectionDescription}>Manage your client relationships and portfolios</p>
              </div>
              <button className={`${styles.button} ${styles.buttonPrimary}`}>
                <Plus size={16} />
                Add Customer
              </button>
            </div>

            <div className={styles.paymentsCard}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ position: 'relative', maxWidth: '320px' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'var(--muted-foreground)' }} />
                  <input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ paddingLeft: '40px', width: '100%', height: '36px', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'var(--background)', color: 'var(--foreground)', fontSize: '14px' }}
                  />
                </div>
              </div>
              
              <div className={styles.paymentsList}>
                {filteredCustomers.map((customer) => (
                  <div key={customer.id} className={styles.paymentItem}>
                    <div className={styles.paymentLeft}>
                      <div className={styles.paymentIcon} style={{ borderRadius: '50%', backgroundColor: 'rgba(30, 64, 175, 0.1)' }}>
                        <span style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '14px' }}>
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className={styles.paymentInfo}>
                        <p className={styles.paymentTitle}>{customer.name}</p>
                        <p className={styles.paymentMeta}>{customer.email}</p>
                        <p className={styles.paymentMeta}>{customer.phone}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <p className={styles.statLabel}>Policies</p>
                        <p className={styles.paymentAmount}>{customer.policies}</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p className={styles.statLabel}>Premium</p>
                        <p className={styles.paymentAmount}>{formatCurrency(customer.totalPremium)}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className={`${styles.button} ${styles.buttonOutline} ${styles.buttonSmall}`}>
                          <Eye size={12} />
                          View
                        </button>
                        <button className={`${styles.button} ${styles.buttonOutline} ${styles.buttonSmall}`}>
                          <Edit size={12} />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className={styles.tabContent}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionInfo}>
                <h2 className={styles.sectionTitle}>Policy Management</h2>
                <p className={styles.sectionDescription}>Create and manage insurance policies for your clients</p>
              </div>
              <button className={`${styles.button} ${styles.buttonPrimary}`}>
                <Plus size={16} />
                Create Policy
              </button>
            </div>

            <div className={styles.policiesGrid}>
              {agentPolicies.map((policy) => (
                <div key={policy.id} className={styles.policyCard}>
                  <div className={styles.policyHeader}>
                    <div className={styles.policyTitleInfo}>
                      <h3 className={styles.policyTitle}>
                        {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)} Insurance
                      </h3>
                      <p className={styles.policyNumber}>Policy #{policy.policyNumber}</p>
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
                      <Eye size={12} />
                      View Details
                    </button>
                    <button className={`${styles.button} ${styles.buttonOutline} ${styles.buttonSmall}`}>
                      <Edit size={12} />
                      Edit Policy
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
                <h2 className={styles.sectionTitle}>Claims Processing</h2>
                <p className={styles.sectionDescription}>Review and process insurance claims</p>
              </div>
            </div>

            <div className={styles.claimsList}>
              {agentClaims.map((claim) => (
                <div key={claim.id} className={styles.claimCard}>
                  <div className={styles.claimContent}>
                    <div className={styles.claimInfo}>
                      <div className={styles.claimHeader}>
                        <div className={styles.claimIcon}>
                          {claim.status === 'pending' ? (
                            <AlertCircle color="var(--warning)" size={20} />
                          ) : claim.status === 'approved' ? (
                            <CheckCircle color="var(--success)" size={20} />
                          ) : (
                            <Clock color="var(--warning)" size={20} />
                          )}
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
                        <Eye size={12} />
                        Review
                      </button>
                      {claim.status === 'pending' && (
                        <>
                          <button className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonSmall}`}>
                            <CheckCircle size={12} />
                            Approve
                          </button>
                          <button className={`${styles.button} ${styles.buttonOutline} ${styles.buttonSmall}`} style={{ color: 'var(--destructive)', borderColor: 'var(--destructive)' }}>
                            Deny
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;