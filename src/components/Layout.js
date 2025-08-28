import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice.js';
import { Bell, Search, Shield, LogOut, User, Settings } from 'lucide-react';
import styles from './Layout.module.css';

const Layout = ({ children, title }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleClassName = (role) => {
    switch (role) {
      case 'admin': return styles.userRoleAdmin;
      case 'agent': return styles.userRoleAgent;
      case 'customer': return styles.userRoleCustomer;
      default: return '';
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Logo and Title */}
          <div className={styles.logoSection}>
            <div className={styles.logoGroup}>
              <div className={styles.logoIcon}>
                <Shield color="white" size={20} />
              </div>
              <span className={styles.logoText}>InsureWise</span>
            </div>
            <div className={styles.divider} />
            <h1 className={styles.title}>{title}</h1>
          </div>

          {/* Search and Actions */}
          <div className={styles.actions}>
            {/* Search */}
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <input
                placeholder="Search policies, claims..."
                className={styles.searchInput}
              />
            </div>

            {/* Notifications */}
            <button className={styles.notificationButton}>
              <Bell size={20} />
              <span className={styles.notificationBadge}></span>
            </button>

            {/* User Menu */}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button 
                className={styles.userButton}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className={styles.avatar}>
                  {user ? getInitials(user.name) : 'U'}
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>{user?.name}</div>
                  <div className={`${styles.userRole} ${getRoleClassName(user?.role)}`}>
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </div>
                </div>
              </button>

              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownLabel}>My Account</div>
                  <div className={styles.dropdownSeparator} />
                  <button className={styles.dropdownItem}>
                    <User size={16} />
                    Profile
                  </button>
                  <button className={styles.dropdownItem}>
                    <Settings size={16} />
                    Settings
                  </button>
                  <div className={styles.dropdownSeparator} />
                  <button 
                    className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;