import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = ({ name, friends, posts, bio, profilePic, coverPic }) => {
    return (
        <div className="profile-header">
            <div className="cover-photo-container">
                <img src={coverPic} alt="Cover" className="cover-photo" />
                <div className="back-button">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path></svg>
                </div>
                <div className="search-button">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                </div>
            </div>

            <div className="profile-info-section">
                <div className="profile-pic-container">
                    <img src={profilePic} alt="Profile" className="profile-pic" />
                </div>

                <div className="user-details">
                    <h1 className="user-name">{name}</h1>
                    <div className="user-stats">
                        <span className="stat-item"><strong>{friends}</strong> friends</span>
                        <span className="dot">•</span>
                        <span className="stat-item"><strong>{posts}</strong> posts</span>
                    </div>

                    <div className="bio-section">
                        <p className="bio-text">{bio}</p>
                        <button className="see-more">See more ...</button>
                    </div>

                    <button className="btn-primary add-friend-btn">
                        <span className="plus-icon">+</span> Add friend
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
