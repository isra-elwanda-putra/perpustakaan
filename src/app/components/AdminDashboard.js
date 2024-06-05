import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
            </header>
            <div className="admin-container">
                <aside className="admin-sidebar">
                    <nav>
                        <ul>
                            <li><a href="/admin">Home</a></li>
                            <li><a href="/admin/users">Manage Users</a></li>
                            <li><a href="/admin/settings">Settings</a></li>
                        </ul>
                    </nav>
                </aside>
                <main className="admin-content">
                    <p>Welcome to the Admin Dashboard. Select an option from the sidebar to get started.</p>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
