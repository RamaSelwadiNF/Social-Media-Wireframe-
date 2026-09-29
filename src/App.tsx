import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Posts from './pages/Posts';
import Header from './components/shadcn-space/blocks/topbar-06/header';

export default function App(): React.ReactElement {
  return (
    <div className="flex min-h-screen w-full flex-col bg-midnight-violet font-sans text-slate-900">
      <Header />

      <main className="flex flex-1 items-center justify-center overflow-auto p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route
            path="*"
            element={<h2 className="text-xl font-bold text-white">404 - Page Not Found</h2>}
          />
        </Routes>
      </main>
    </div>
  );
}