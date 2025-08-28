import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminDashboard = () => {
  const { policies } = useSelector((state: RootState) => state.policies);
  const { claims } = useSelector((state: RootState) => state.claims);
  const { payments } = useSelector((state: RootState) => state.payments);

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

  const policyDistribution = {
    auto: policies.filter(p => p.type === 'auto').length,
    home: policies.filter(p => p.type === 'home').length,
    life: policies.filter(p => p.type === 'life').length,
    health: policies.filter(p => p.type === 'health').length,
  };

  const claimStatusDistribution = {
    pending: pendingClaims,
    processing: processingClaims,
    approved: approvedClaims,
    denied: claims.filter(c => c.status === 'denied').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Administrator Dashboard
        </h1>
        <p className="text-muted-foreground">
          Comprehensive overview of system performance and operations.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="insurance-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-foreground">{totalCustomers + totalAgents}</p>
                <p className="text-xs text-muted-foreground">{totalCustomers} customers, {totalAgents} agents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="insurance-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Policies</p>
                <p className="text-2xl font-bold text-foreground">{activePolicies}</p>
                <p className="text-xs text-muted-foreground">{pendingPolicies} pending</p>
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
                <p className="text-sm text-muted-foreground">Total Claims</p>
                <p className="text-2xl font-bold text-foreground">{totalClaims}</p>
                <p className="text-xs text-muted-foreground">{pendingClaims} pending review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="insurance-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Premiums</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(totalPremiums)}</p>
                <p className="text-xs text-muted-foreground">Annual revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health */}
            <Card className="insurance-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>System Health</span>
                </CardTitle>
                <CardDescription>Real-time system performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Server Performance</span>
                    <span>98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Health</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response Time</span>
                    <span>99%</span>
                  </div>
                  <Progress value={99} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>User Satisfaction</span>
                    <span>96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Financial Overview */}
            <Card className="insurance-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Financial Overview</span>
                </CardTitle>
                <CardDescription>Key financial metrics and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
                    <p className="text-sm text-muted-foreground">Total Coverage</p>
                    <p className="text-xl font-bold text-success">{formatCurrency(totalCoverage)}</p>
                  </div>
                  <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
                    <p className="text-sm text-muted-foreground">Claims Paid</p>
                    <p className="text-xl font-bold text-warning">{formatCurrency(totalClaimAmount)}</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground">Annual Revenue</p>
                    <p className="text-xl font-bold text-primary">{formatCurrency(totalPremiums)}</p>
                  </div>
                  <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <p className="text-sm text-muted-foreground">Profit Margin</p>
                    <p className="text-xl font-bold text-accent">24.5%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="insurance-card">
            <CardHeader>
              <CardTitle>Recent System Activity</CardTitle>
              <CardDescription>Latest updates and important events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-success/5 rounded-lg border border-success/20">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">New policy activated</p>
                    <p className="text-sm text-muted-foreground">AUTO-001 for John Smith - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-warning/5 rounded-lg border border-warning/20">
                  <Clock className="w-5 h-5 text-warning" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Claim pending review</p>
                    <p className="text-sm text-muted-foreground">CLM-003 requires agent attention - 4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <Users className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">New customer registered</p>
                    <p className="text-sm text-muted-foreground">Emily Davis joined the platform - 6 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">System maintenance scheduled</p>
                    <p className="text-sm text-muted-foreground">Database optimization planned for tomorrow 2 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies Tab */}
        <TabsContent value="policies" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Policy Distribution */}
            <Card className="insurance-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5" />
                  <span>Policy Distribution</span>
                </CardTitle>
                <CardDescription>Breakdown by insurance type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(policyDistribution).map(([type, count]) => (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{type} Insurance</span>
                      <span>{count} policies</span>
                    </div>
                    <Progress value={(count / policies.length) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Policy Status Overview */}
            <Card className="insurance-card">
              <CardHeader>
                <CardTitle>Policy Status Overview</CardTitle>
                <CardDescription>Current status of all policies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
                    <p className="text-2xl font-bold text-success">{activePolicies}</p>
                    <p className="text-sm text-muted-foreground">Active Policies</p>
                  </div>
                  <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
                    <p className="text-2xl font-bold text-warning">{pendingPolicies}</p>
                    <p className="text-sm text-muted-foreground">Pending Policies</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-2xl font-bold text-primary">{formatCurrency(totalPremiums)}</p>
                    <p className="text-sm text-muted-foreground">Total Premiums</p>
                  </div>
                  <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <p className="text-2xl font-bold text-accent">{formatCurrency(totalCoverage)}</p>
                    <p className="text-sm text-muted-foreground">Total Coverage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Policies */}
          <Card className="insurance-card">
            <CardHeader>
              <CardTitle>Recent Policies</CardTitle>
              <CardDescription>Latest policy activities across the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.slice(0, 5).map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)} Insurance
                        </p>
                        <p className="text-sm text-muted-foreground">Policy #{policy.policyNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{formatCurrency(policy.premium)}</p>
                        <p className="text-sm text-muted-foreground">Premium</p>
                      </div>
                      {getStatusBadge(policy.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Claims Tab */}
        <TabsContent value="claims" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Claims Status Distribution */}
            <Card className="insurance-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Claims Status</span>
                </CardTitle>
                <CardDescription>Current status of all claims</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(claimStatusDistribution).map(([status, count]) => (
                  <div key={status} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{status} Claims</span>
                      <span>{count}</span>
                    </div>
                    <Progress value={(count / totalClaims) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Claims Financial Impact */}
            <Card className="insurance-card">
              <CardHeader>
                <CardTitle>Claims Financial Impact</CardTitle>
                <CardDescription>Financial overview of claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
                    <p className="text-2xl font-bold text-warning">{totalClaims}</p>
                    <p className="text-sm text-muted-foreground">Total Claims</p>
                  </div>
                  <div className="text-center p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                    <p className="text-2xl font-bold text-destructive">{formatCurrency(totalClaimAmount)}</p>
                    <p className="text-sm text-muted-foreground">Claims Value</p>
                  </div>
                  <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
                    <p className="text-2xl font-bold text-success">{approvedClaims}</p>
                    <p className="text-sm text-muted-foreground">Approved</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-2xl font-bold text-primary">{pendingClaims}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Claims */}
          <Card className="insurance-card">
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>Latest claim submissions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claims.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Claim #{claim.claimNumber}</p>
                        <p className="text-sm text-muted-foreground">{claim.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{formatCurrency(claim.amount)}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(claim.dateSubmitted)}</p>
                      </div>
                      {getStatusBadge(claim.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card className="insurance-card">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key business performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Customer Retention Rate</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Claim Processing Speed</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Policy Conversion Rate</span>
                    <span>76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Customer Satisfaction</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Growth Analytics */}
            <Card className="insurance-card">
              <CardHeader>
                <CardTitle>Growth Analytics</CardTitle>
                <CardDescription>Business growth and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-success/5 rounded-lg border border-success/20">
                    <p className="text-2xl font-bold text-success">+15%</p>
                    <p className="text-sm text-muted-foreground">Policy Growth</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-2xl font-bold text-primary">+23%</p>
                    <p className="text-sm text-muted-foreground">Revenue Growth</p>
                  </div>
                  <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <p className="text-2xl font-bold text-accent">+8%</p>
                    <p className="text-sm text-muted-foreground">Customer Growth</p>
                  </div>
                  <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
                    <p className="text-2xl font-bold text-warning">-5%</p>
                    <p className="text-sm text-muted-foreground">Claim Ratio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;