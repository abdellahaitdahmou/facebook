import React from 'react';
import './BottomNav.css';

const BottomNav = () => {
    return (
        <div className="bottom-nav">
            <div className="nav-item active">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 4.1l7.8 6c.2.2.3.4.3.6v8.4c0 .5-.4 1-1 1h-4v-6h-4v6H5c-.6 0-1-.5-1-1v-8.4c0-.2.1-.4.3-.6l7.7-6z"></path></svg>
                <span>Home</span>
            </div>
            <div className="nav-item">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M13.5 14h-3c-1.9 0-3.5 1.6-3.5 3.5V20c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-2.5c0-1.9-1.6-3.5-3.5-3.5zM12 12c1.9 0 3.5-1.6 3.5-3.5S13.9 5 12 5 8.5 6.6 8.5 8.5 10.1 12 12 12z"></path></svg>
                <span>Friends</span>
            </div>
            <div className="nav-item">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zM11 7h2v5h-2V7zM11 13h2v2h-2v-2z"></path></svg>
                <span>Reels</span>
            </div>
            <div className="nav-item">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h12v2H6v-2zm0 4h12v2H6v-2z"></path></svg>
                <span>Marketplace</span>
            </div>
            <div className="nav-item">
                <div className="menu-avatar">
                    <img src="https://i.pravatar.cc/30" alt="Menu" />
                    <span className="badge">3</span>
                </div>
                <span>Menu</span>
            </div>
        </div>
    );
};

export default BottomNav;
