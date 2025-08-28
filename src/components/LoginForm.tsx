import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Shield, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { loginSuccess } from '@/store/authSlice';
import { UserRole } from '@/store/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const dispatch = useDispatch();

  const demoUsers = {
    customer: { id: 'customer1', name: 'John Smith', email: 'john@example.com', role: 'customer' as UserRole },
    agent: { id: 'agent1', name: 'Sarah Johnson', email: 'sarah@insure.com', role: 'agent' as UserRole },
    admin: { id: 'admin1', name: 'Michael Brown', email: 'admin@insure.com', role: 'admin' as UserRole },
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = demoUsers[role];
    dispatch(loginSuccess(user));
  };

  const quickLogin = (userRole: UserRole) => {
    const user = demoUsers[userRole];
    dispatch(loginSuccess(user));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 insurance-gradient rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">InsureWise</h1>
          <p className="text-muted-foreground">Secure access to your insurance portal</p>
        </div>

        <Card className="insurance-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" variant="professional">
                Sign In
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Demo Access</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('customer')}
                className="text-xs"
              >
                <User className="w-3 h-3 mr-1" />
                Customer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('agent')}
                className="text-xs"
              >
                <User className="w-3 h-3 mr-1" />
                Agent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('admin')}
                className="text-xs"
              >
                <User className="w-3 h-3 mr-1" />
                Admin
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          Protected by industry-standard security
        </div>
      </div>
    </div>
  );
};

export default LoginForm;