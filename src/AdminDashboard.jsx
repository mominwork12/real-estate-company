import React, { useState } from 'react';
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    Settings,
    Eye,
    EyeOff,
    Plus,
    Trash2,
    Save,
    LogOut,
    Bell
} from 'lucide-react';
import './Dashboard.css';

const AdminDashboard = ({ content, setContent, onLogout }) => {
    const [activeTab, setActiveTab] = useState('general');
    const [tempContent, setTempContent] = useState(content);

    const handleSave = () => {
        setContent(tempContent);
        alert('Content saved successfully!');
    };

    const updateNested = (category, field, value) => {
        setTempContent(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
    };

    const updateSectionToggle = (section) => {
        setTempContent(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [section]: !prev.sections[section]
            }
        }));
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">CMS CONTROL</div>
                <nav className="nav-menu">
                    <button
                        className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <LayoutDashboard size={20} />
                        <span>General Content</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}
                        onClick={() => setActiveTab('services')}
                    >
                        <FileText size={20} />
                        <span>Services Studio</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'media' ? 'active' : ''}`}
                        onClick={() => setActiveTab('media')}
                    >
                        <ImageIcon size={20} />
                        <span>Media Assets</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'sections' ? 'active' : ''}`}
                        onClick={() => setActiveTab('sections')}
                    >
                        <Settings size={20} />
                        <span>Site Sections</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'notices' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notices')}
                    >
                        <Bell size={20} />
                        <span>Announcements</span>
                    </button>

                    <div style={{ marginTop: 'auto' }}>
                        <button onClick={onLogout} className="nav-item" style={{ width: '100%', color: '#ff4444' }}>
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="dashboard-header">
                    <div className="header-search">
                        <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
                    </div>
                    <div className="header-actions">
                        <button onClick={handleSave} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Save size={18} />
                            Save Changes
                        </button>
                        <a href="/" target="_blank" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                            <Eye size={18} />
                            View Site
                        </a>
                    </div>
                </header>

                <div className="stats-grid">
                    {activeTab === 'services' && (
                        <div className="cms-editor-card">
                            <h3>Services Management</h3>
                            {tempContent.services.map((service, sIdx) => (
                                <div key={sIdx} className="service-edit-box" style={{ marginBottom: '2rem', padding: '1.5rem', background: '#000', borderRadius: '12px' }}>
                                    <div className="input-group">
                                        <label>Category Title</label>
                                        <input
                                            type="text"
                                            value={service.title}
                                            onChange={(e) => {
                                                const newServices = [...tempContent.services];
                                                newServices[sIdx].title = e.target.value;
                                                setTempContent({ ...tempContent, services: newServices });
                                            }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Items (One per line)</label>
                                        <textarea
                                            value={service.items.join('\n')}
                                            onChange={(e) => {
                                                const newServices = [...tempContent.services];
                                                newServices[sIdx].items = e.target.value.split('\n');
                                                setTempContent({ ...tempContent, services: newServices });
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'general' && (
                        <div className="cms-editor-card">
                            <h3>Hero Section</h3>
                            <div className="input-group">
                                <label>Subtitle</label>
                                <input
                                    type="text"
                                    value={tempContent.hero.subtitle}
                                    onChange={(e) => updateNested('hero', 'subtitle', e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Main Title</label>
                                <input
                                    type="text"
                                    value={tempContent.hero.title}
                                    onChange={(e) => updateNested('hero', 'title', e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Description</label>
                                <textarea
                                    value={tempContent.hero.description}
                                    onChange={(e) => updateNested('hero', 'description', e.target.value)}
                                />
                            </div>

                            <h3 style={{ marginTop: '3rem' }}>About Section</h3>
                            <div className="input-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    value={tempContent.about.address}
                                    onChange={(e) => updateNested('about', 'address', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'sections' && (
                        <div className="cms-editor-card">
                            <h3>Visibility Controls</h3>
                            <div className="toggle-group">
                                <div className="toggle-item">
                                    <span>Show Services Section</span>
                                    <button onClick={() => updateSectionToggle('showServices')}>
                                        {tempContent.sections.showServices ? <Eye size={20} color="var(--accent-gold)" /> : <EyeOff size={20} />}
                                    </button>
                                </div>
                                <div className="toggle-item">
                                    <span>Show About Section</span>
                                    <button onClick={() => updateSectionToggle('showAbout')}>
                                        {tempContent.sections.showAbout ? <Eye size={20} color="var(--accent-gold)" /> : <EyeOff size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'media' && (
                        <div className="cms-editor-card">
                            <h3>Asset Management</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Upload banners, cover images, and thumbnails.</p>
                            <div className="upload-placeholder">
                                <Plus size={40} />
                                <span>Upload New Media</span>
                            </div>
                            <div className="media-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                                <div className="media-item-thumb"></div>
                                <div className="media-item-thumb"></div>
                                <div className="media-item-thumb"></div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notices' && (
                        <div className="cms-editor-card">
                            <h3>Sitewide Announcements</h3>
                            <div className="input-group">
                                <label>Active Notice</label>
                                <input
                                    type="text"
                                    placeholder="Enter important announcement..."
                                    value={tempContent.announcement}
                                    onChange={(e) => setTempContent({ ...tempContent, announcement: e.target.value })}
                                />
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                * This notice will appear at the very top of your website for all users.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <style>{`
        .cms-editor-card {
          background: var(--bg-secondary);
          padding: 2.5rem;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          grid-column: span 3;
        }
        .input-group {
          margin-bottom: 1.5rem;
        }
        .input-group label {
          display: block;
          color: var(--accent-gold);
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .input-group input, .input-group textarea {
          width: 100%;
          padding: 1rem;
          background: #000;
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: #fff;
          font-family: inherit;
        }
        .input-group textarea {
          height: 120px;
          resize: vertical;
        }
        .toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: #000;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          margin-bottom: 1rem;
        }
        .toggle-item button {
          background: none;
          border: none;
          cursor: pointer;
        }
        .upload-placeholder {
          height: 200px;
          border: 2px dashed var(--glass-border);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition);
        }
        .upload-placeholder:hover {
          border-color: var(--accent-gold);
          color: var(--accent-gold);
        }
        .media-item-thumb {
          aspect-ratio: 16/9;
          background: #111;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
        }
      `}</style>
        </div>
    );
};

export default AdminDashboard;
