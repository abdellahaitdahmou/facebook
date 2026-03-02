import React from 'react';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import PostCard from './components/PostCard';
import BottomNav from './components/BottomNav';
import IPTracker from './components/IPTracker';
import './App.css';

// Importing generated images (using absolute paths for local dev)
import coverPic from 'C:/Users/espacegamers/.gemini/antigravity/brain/c7ddb6f9-6d89-4cf7-bd7b-58b3f2c67db1/profile_cover_photo_1772409543949.png';
import profilePic from 'C:/Users/espacegamers/.gemini/antigravity/brain/c7ddb6f9-6d89-4cf7-bd7b-58b3f2c67db1/profile_picture_1772409557136.png';
import postImage from 'C:/Users/espacegamers/.gemini/antigravity/brain/c7ddb6f9-6d89-4cf7-bd7b-58b3f2c67db1/post_image_1_1772409570996.png';

function App() {
  const userData = {
    name: 'Abdejalil Ben Moulid',
    friends: 62,
    posts: 18,
    bio: 'انا عبد الجليل زامل وكنتحوا لي ينات معاه يصيفط مساج كنجاوب كلشي',
    profilePic: profilePic,
    coverPic: coverPic
  };

  const postData = {
    authorName: 'Abdejalil Ben Moulid',
    authorAvatar: profilePic,
    time: '1d',
    content: 'انا زامل وكنتحوا لي ينات معاه يصيفط مساج كنجاوب كلشي',
    postImage: postImage,
    phoneNumbers: ['0675-635660', '0702487900']
  };

  return (
    <div className="app-container">
      <ProfileHeader {...userData} />
      <IPTracker />
      <ProfileTabs />
      <div className="feed">
        <PostCard {...postData} />
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
