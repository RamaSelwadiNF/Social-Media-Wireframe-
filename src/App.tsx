import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Posts from './pages/Posts';
import { useAuth } from './context/AuthContext';
import { Newspaper, LogIn, LogOut } from 'lucide-react';

function getInitials(name?: string): string {
  if (!name || typeof name !== 'string') return 'U';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return (parts[0]?.[0] || 'U').toUpperCase();
}

export default function App(): React.ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const isActive = (path: string): boolean => {
    if (path === '/posts') {
      return location.pathname === '/posts' || location.pathname === '/';
    }
    return location.pathname === path;
  };

  const handleLogout = (): void => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-midnight-violet font-sans text-slate-900">
      {/* Top Header / Topbar shadcn component */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200/20 bg-white/95 px-6 shadow-sm backdrop-blur">
        <div className="flex items-center gap-6">
          <Link to="/posts" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain shrink-0" />
            <span className="text-xl font-bold tracking-tight text-midnight-violet">Loop</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              to="/posts"
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive('/posts')
                  ? 'bg-icy-blue/50 text-royal-plum font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Newspaper className="h-4 w-4" />
              <span>Posts</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <Link
                to="/my-profile"
                title={`${currentUser.name} (@${currentUser.username})`}
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-royal-plum to-raspberry-plum text-xs font-bold text-white shadow transition-transform hover:scale-105 ${
                  isActive('/my-profile') ? 'ring-2 ring-royal-plum ring-offset-2' : ''
                }`}
              >
                {getInitials(currentUser.name)}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-lg bg-royal-plum px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-raspberry-plum"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center">
        <Routes>
          {/* Both '/' and '/posts' show landing page */}
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