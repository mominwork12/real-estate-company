import React, { useState } from 'react';
import './index.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin123') {
            onLogin(true);
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)'
        }}>
            <div style={{
                background: 'var(--bg-secondary)',
                padding: '3rem',
                borderRadius: '20px',
                border: '1px solid var(--glass-border)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <h2 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                    Admin Login
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    Enter credentials to manage content
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem', display: 'block' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                background: '#000',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                            placeholder="admin"
                        />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem', display: 'block' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                background: '#000',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p style={{ color: '#ff4444', fontSize: '0.8rem' }}>{error}</p>}

                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
