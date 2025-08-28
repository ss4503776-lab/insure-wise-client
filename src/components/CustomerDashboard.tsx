import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  Car, 
  Home, 
  Heart, 
  Shield, 
  CreditCard, 
  FileText, 
  Plus, 
  Search,
  Upload,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CustomerDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { policies } = useSelector((state: RootState) => state.policies);
  const { claims } = useSelector((state: RootState) => state.claims);
  const { payments } = useSelector((state: RootState) => state.payments);
  
  const [searchTerm, setSearchTerm] = useState('');

  const userPolicies = policies.filter(p => p.customerId === user?.id);
  const userClaims = claims.filter(c => c.customerId === user?.id);
  const userPayments = payments.filter(p => p.customerId === user?.id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="status-active">Active</Badge>;
      case 'pending':
        return <Badge className="status-pending">Pending</Badge>;
      case 'inactive':
        return <Badge className="status-inactive">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPolicyIcon = (type: string) => {
    switch (type) {
      case 'auto': return <Car className="h-5 w-5" />;
      case 'home': return <Home className="h-5 w-5" />;
      case 'life': return <Heart className="h-5 w-5" />;
      case 'health': return <Shield className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Manage your policies, claims, and payments all in one place.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="insurance-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Policies</p>
                <p className="text-2xl font-bold text-foreground">
                  {userPolicies.filter(p => p.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="insurance-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Open Claims</p>
                <p className="text-2xl font-bold text-foreground">
                  {userClaims.filter(c => c.status === 'pending' || c.status === 'processing').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="insurance-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(userPayments.reduce((sum, p) => sum + p.amount, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="insurance-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Coverage</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(userPolicies.reduce((sum, p) => sum + p.coverage, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="policies" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="policies">My Policies</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        {/* Policies Tab */}
        <TabsContent value="policies" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Your Policies</h2>
              <p className="text-muted-foreground">View and manage your insurance policies</p>
            </div>
            <Button variant="professional">
              <Plus className="w-4 h-4 mr-2" />
              Request Quote
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {userPolicies.map((policy) => (
              <Card key={policy.id} className="insurance-card hover:shadow-elevated transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getPolicyIcon(policy.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{policy.type.charAt(0).toUpperCase() + policy.type.slice(1)} Insurance</CardTitle>
                        <CardDescription>Policy #{policy.policyNumber}</CardDescription>
                      </div>
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
                      <FileText className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="w-3 h-3 mr-1" />
                      Upload Documents
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
              <h2 className="text-2xl font-semibold text-foreground">Your Claims</h2>
              <p className="text-muted-foreground">Track and manage your insurance claims</p>
            </div>
            <Button variant="professional">
              <Plus className="w-4 h-4 mr-2" />
              File New Claim
            </Button>
          </div>

          <div className="space-y-4">
            {userClaims.map((claim) => (
              <Card key={claim.id} className="insurance-card">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-warning" />
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
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-3 h-3 mr-1" />
                        Add Documents
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Payment History</h2>
              <p className="text-muted-foreground">View your payment history and make new payments</p>
            </div>
            <Button variant="professional">
              <CreditCard className="w-4 h-4 mr-2" />
              Make Payment
            </Button>
          </div>

          <Card className="insurance-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                {userPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{payment.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.method.replace('_', ' ').toUpperCase()} • {formatDate(payment.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{formatCurrency(payment.amount)}</p>
                      {getStatusBadge(payment.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDashboard;