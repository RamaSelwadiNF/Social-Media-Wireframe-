import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Posts from './pages/Posts';

export default function App(): React.ReactElement {
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <div className="h-screen bg-white-smoke flex flex-col font-sans overflow-hidden">
      <nav className="bg-midnight-violet text-white-smoke flex items-center justify-between px-6 py-4 shadow-md">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-12 w-12 object-contain" />
        </div>

        <div className="flex items-center gap-6 font-medium text-sm">
          <Link
            to="/posts"
            className={`transition-colors duration-200 no-underline ${
              isActive('/posts')
                ? 'text-icy-blue font-semibold'
                : 'text-white-smoke hover:text-icy-blue'
            }`}
          >
            Posts
          </Link>
          <Link
            to="/my-profile"
            className={`transition-colors duration-200 no-underline ${
              isActive('/my-profile')
                ? 'text-icy-blue font-semibold'
                : 'text-white-smoke hover:text-icy-blue'
            }`}
          >
            My Profile
          </Link>
          <Link
            to="/login"
            className="transition-colors duration-200 bg-royal-plum px-4 py-2 rounded-md hover:bg-raspberry-plum text-white-smoke no-underline"
          >
            Login
          </Link>
        </div>
      </nav>

      <main className="flex-1 px-4 py-2 flex items-center justify-center overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/posts" element={<Posts />} />
          <Route
            path="*"
            element={<h2 className="text-xl font-bold text-midnight-violet">404 - Page Not Found</h2>}
          />
        </Routes>
      </main>
    </div>
  );
}