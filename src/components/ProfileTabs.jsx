import React from 'react';
import './ProfileTabs.css';

const ProfileTabs = () => {
    return (
        <div className="profile-tabs-container">
            <div className="tabs">
                <button className="tab active">All</button>
                <button className="tab">Photos</button>
                <button className="tab">Reels</button>
            </div>
            <div className="section-divider"></div>
            <div className="posts-header">
                <h2>Abdejalil's posts</h2>
            </div>
        </div>
    );
};

export default ProfileTabs;
