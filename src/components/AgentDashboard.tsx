import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
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
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AgentDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { policies } = useSelector((state: RootState) => state.policies);
  const { claims } = useSelector((state: RootState) => state.claims);
  const [searchTerm, setSearchTerm] = useState('');

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="status-active">Active</Badge>;
      case 'pending':
        return <Badge className="status-pending">Pending</Badge>;
      case 'processing':
        return <Badge className="status-pending">Processing</Badge>;
      case 'approved':
        return <Badge className="status-active">Approved</Badge>;
      case 'denied':
        return <Badge className="bg-destructive/10 text-destructive border border-destructive/20 px-3 py-1 rounded-full text-sm font-medium">Denied</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
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
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Agent Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your clients, policies, and claims efficiently.
        </p>
      </div>

      {/* Agent Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="insurance-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold text-foreground">{totalCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="insurance-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Policies</p>
                <p className="text-2xl font-bold text-foreground">{activePolicies}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="insurance-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Claims</p>
                <p className="text-2xl font-bold text-foreground">{pendingClaims}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="insurance-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Premiums</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(totalPremiums)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
        </TabsList>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Customer Management</h2>
              <p className="text-muted-foreground">Manage your client relationships and portfolios</p>
            </div>
            <Button variant="professional">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </div>

          <Card className="insurance-card">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-primary">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{customer.name}</h3>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Policies</p>
                        <p className="font-semibold text-foreground">{customer.policies}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Premium</p>
                        <p className="font-semibold text-foreground">{formatCurrency(customer.totalPremium)}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies Tab */}
        <TabsContent value="policies" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Policy Management</h2>
              <p className="text-muted-foreground">Create and manage insurance policies for your clients</p>
            </div>
            <Button variant="professional">
              <Plus className="w-4 h-4 mr-2" />
              Create Policy
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {agentPolicies.map((policy) => (
              <Card key={policy.id} className="insurance-card hover:shadow-elevated transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{policy.type.charAt(0).toUpperCase() + policy.type.slice(1)} Insurance</CardTitle>
                      <CardDescription>Policy #{policy.policyNumber}</CardDescription>
                    </div>
                    {getStatusBadge(policy.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Premium</p>
                      <p className="font-semibold">{formatCurrency(policy.premium)}/year</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Coverage</p>
                      <p className="font-semibold">{formatCurrency(policy.coverage)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-semibold">{formatDate(policy.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p className="font-semibold">{formatDate(policy.endDate)}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit Policy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Claims Tab */}
        <TabsContent value="claims" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Claims Processing</h2>
              <p className="text-muted-foreground">Review and process insurance claims</p>
            </div>
          </div>

          <div className="space-y-4">
            {agentClaims.map((claim) => (
              <Card key={claim.id} className="insurance-card">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                          {claim.status === 'pending' ? (
                            <AlertCircle className="w-5 h-5 text-warning" />
                          ) : claim.status === 'approved' ? (
                            <CheckCircle className="w-5 h-5 text-success" />
                          ) : (
                            <Clock className="w-5 h-5 text-warning" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Claim #{claim.claimNumber}</h3>
                          <p className="text-sm text-muted-foreground">{claim.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p className="font-semibold">{formatCurrency(claim.amount)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Submitted</p>
                          <p className="font-semibold">{formatDate(claim.dateSubmitted)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          {getStatusBadge(claim.status)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                      {claim.status === 'pending' && (
                        <>
                          <Button variant="success" size="sm">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button variant="destructive" size="sm">
                            Deny
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentDashboard;