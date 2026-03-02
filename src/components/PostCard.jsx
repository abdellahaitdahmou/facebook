import React from 'react';
import './PostCard.css';

const PostCard = ({ authorName, authorAvatar, time, content, postImage, phoneNumbers }) => {
    return (
        <div className="post-card">
            <div className="post-header">
                <img src={authorAvatar} alt={authorName} className="author-avatar" />
                <div className="author-info">
                    <span className="author-name">{authorName}</span>
                    <div className="post-meta">
                        <span className="post-time">{time}</span>
                        <span className="dot">•</span>
                        <span className="privacy-icon">🌎</span>
                    </div>
                </div>
                <div className="more-options">•••</div>
            </div>

            <div className="post-content">
                <div className="post-image-container">
                    <img src={postImage} alt="Post content" className="post-image" />
                    <div className="text-overlay">
                        <p>{content}</p>
                        {phoneNumbers && phoneNumbers.map((num, i) => (
                            <p key={i} className="phone-num">{num}</p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="post-actions">
                <button className="action-btn">👍 Like</button>
                <button className="action-btn">💬 Comment</button>
                <button className="action-btn">↗️ Share</button>
            </div>
        </div>
    );
};

export default PostCard;
