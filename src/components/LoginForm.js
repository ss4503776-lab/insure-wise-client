import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Shield, Mail, Lock, User } from 'lucide-react';
import { loginSuccess } from '../store/authSlice.js';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const dispatch = useDispatch();

  const demoUsers = {
    customer: { id: 'customer1', name: 'John Smith', email: 'john@example.com', role: 'customer' },
    agent: { id: 'agent1', name: 'Sarah Johnson', email: 'sarah@insure.com', role: 'agent' },
    admin: { id: 'admin1', name: 'Michael Brown', email: 'admin@insure.com', role: 'admin' },
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = demoUsers[role];
    dispatch(loginSuccess(user));
  };

  const quickLogin = (userRole) => {
    const user = demoUsers[userRole];
    dispatch(loginSuccess(user));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Logo and Header */}
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <Shield color="white" size={32} />
            </div>
          </div>
          <h1 className={styles.title}>InsureWise</h1>
          <p className={styles.subtitle}>Secure access to your insurance portal</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Sign In</h2>
            <p className={styles.cardDescription}>
              Enter your credentials to access your account
            </p>
          </div>
          <div>
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.fieldGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} />
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="role" className={styles.label}>Role</label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className={styles.select}
                >
                  <option value="customer">Customer</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>
                Sign In
              </button>
            </form>

            <div className={styles.separator}>
              <div className={styles.separatorLine}>
                <span className={styles.separatorBorder} />
              </div>
              <div className={styles.separatorText}>
                <span>Demo Access</span>
              </div>
            </div>

            <div className={styles.demoButtons}>
              <button
                className={`${styles.button} ${styles.buttonOutline} ${styles.buttonSmall}`}
                onClick={() => quickLogin('customer')}
              >
                <User size={12} />
                Customer
              </button>
              <button
                className={`${styles.button} ${styles.buttonOutline} ${styles.buttonSmall}`}
                onClick={() => quickLogin('agent')}
              >
                <User size={12} />
                Agent
              </button>
              <button
                className={`${styles.button} ${styles.buttonOutline} ${styles.buttonSmall}`}
                onClick={() => quickLogin('admin')}
              >
                <User size={12} />
                Admin
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          Protected by industry-standard security
        </div>
      </div>
    </div>
  );
};

export default LoginForm;