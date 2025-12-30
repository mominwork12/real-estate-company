import React from 'react';
import {
    LayoutDashboard,
    Home,
    Users,
    BarChart3,
    Settings,
    Search,
    Bell,
    TrendingUp,
    DollarSign,
    MapPin,
    Calendar
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
    const stats = [
        { label: 'Total Revenue', value: '$84,200', trend: '+12.5%', icon: <DollarSign size={20} />, up: true },
        { label: 'Active Listings', value: '142', trend: '+4.2%', icon: <Home size={20} />, up: true },
        { label: 'New Leads', value: '28', trend: '-2.1%', icon: <Users size={20} />, up: false },
        { label: 'Pending Sales', value: '12', trend: '+18.7%', icon: <TrendingUp size={20} />, up: true },
    ];

    const recentActivities = [
        { id: 1, property: 'Modern Penthouse', client: 'John Smith', price: '$5.9M', status: 'Active', date: '2025-12-28' },
        { id: 2, property: 'Luxury Villa', client: 'Sarah Johnson', price: '$12.5M', status: 'Pending', date: '2025-12-27' },
        { id: 3, property: 'Glass House', client: 'Michael Brown', price: '$7.1M', status: 'Sold', date: '2025-12-25' },
        { id: 4, property: 'Oceanfront Estate', client: 'Emma Wilson', price: '$8.2M', status: 'Active', date: '2025-12-24' },
    ];

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">AJIM ADMIN</div>
                <nav className="nav-menu">
                    <a href="#" className="nav-item active">
                        <LayoutDashboard size={20} />
                        <span>Overview</span>
                    </a>
                    <a href="#" className="nav-item">
                        <Home size={20} />
                        <span>Properties</span>
                    </a>
                    <a href="#" className="nav-item">
                        <Users size={20} />
                        <span>Clients</span>
                    </a>
                    <a href="#" className="nav-item">
                        <BarChart3 size={20} />
                        <span>Analytics</span>
                    </a>
                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <a href="#" className="nav-item">
                            <Settings size={20} />
                            <span>Settings</span>
                        </a>
                        <button onClick={onLogout} className="nav-item" style={{ width: '100%', textAlign: 'left' }}>
                            <TrendingUp size={20} style={{ transform: 'rotate(180deg)' }} />
                            <span>Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="dash-header">
                    <div>
                        <h1 className="hero-subtitle" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
                        <h2 style={{ fontSize: '1.8rem' }}>Dashboard Overview</h2>
                    </div>
                    <div className="user-profile">
                        <div className="search-bar" style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                placeholder="Search..."
                                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '8px', color: 'white', outline: 'none' }}
                            />
                        </div>
                        <Bell size={20} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
                        <div className="user-avatar">A</div>
                        <div className="user-info">
                            <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Admin Ajim</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Super Admin</div>
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <div className="stat-header">
                                <span>{stat.label}</span>
                                <span style={{ color: 'var(--accent-gold)' }}>{stat.icon}</span>
                            </div>
                            <div className="stat-value">{stat.value}</div>
                            <div className={`stat-trend ${stat.up ? 'trend-up' : 'trend-down'}`}>
                                {stat.trend} <span style={{ color: 'var(--text-secondary)' }}>vs last month</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Table */}
                <section className="dash-section">
                    <div className="dash-section-header">
                        <h3>Recent Transactions</h3>
                        <button style={{ color: 'var(--accent-gold)', fontSize: '0.9rem' }}>View All</button>
                    </div>
                    <table className="dash-table">
                        <thead>
                            <tr>
                                <th>Property</th>
                                <th>Client</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivities.map((activity) => (
                                <tr key={activity.id}>
                                    <td style={{ fontWeight: '500' }}>{activity.property}</td>
                                    <td>{activity.client}</td>
                                    <td>{activity.price}</td>
                                    <td>{activity.date}</td>
                                    <td>
                                        <span className={`status-pills status-${activity.status.toLowerCase()}`}>
                                            {activity.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
