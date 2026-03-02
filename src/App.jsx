import React from 'react';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import PostCard from './components/PostCard';
import BottomNav from './components/BottomNav';
import IPTracker from './components/IPTracker';
import './App.css';

// Using assets from the public directory for deployment
const coverPic = '/assets/cover.png';
const profilePic = '/assets/profile.png';
const postImage = '/assets/post.png';

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
