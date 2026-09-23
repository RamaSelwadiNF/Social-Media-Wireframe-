import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import Posts from './pages/Posts';
import { useAuth } from './context/AuthContext';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarRail,
} from './components/ui/sidebar';
import { Newspaper, User, LogIn, LogOut } from 'lucide-react';
import { TooltipProvider } from 'radix-ui/tooltip';

export default function App(): React.ReactElement {
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-midnight-violet font-sans text-slate-900">
          {/* Shadcn Sidebar */}
          <Sidebar collapsible="icon" className="border-r border-slate-200 bg-white">
            <SidebarHeader className="p-4 border-b border-slate-100 flex flex-row items-center gap-3">
              <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain shrink-0" />
              <span className="font-bold text-lg text-midnight-violet group-data-[collapsible=icon]:hidden">
                Loop
              </span>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive('/posts')}
                        tooltip="Posts"
                        className="data-[active=true]:bg-icy-blue/40 data-[active=true]:text-royal-plum hover:bg-slate-100"
                      >
                        <Link to="/posts" className="flex items-center gap-3">
                          <Newspaper className="h-4 w-4 shrink-0" />
                          <span>Posts</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive('/my-profile')}
                        tooltip="My Profile"
                        className="data-[active=true]:bg-icy-blue/40 data-[active=true]:text-royal-plum hover:bg-slate-100"
                      >
                        <Link to="/my-profile" className="flex items-center gap-3">
                          <User className="h-4 w-4 shrink-0" />
                          <span>Profile</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-3 border-t border-slate-100">
              <SidebarMenu>
                {currentUser ? (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive('/my-profile')}
                        tooltip={currentUser.username}
                        className="bg-slate-100 hover:bg-slate-200"
                      >
                        <Link to="/my-profile" className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-royal-plum text-xs text-white">
                            {currentUser.name.charAt(0)}
                          </div>
                          <span className="truncate font-medium">{currentUser.username}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={logout}
                        tooltip="Logout"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <LogOut className="h-4 w-4 shrink-0" />
                        <span>Logout</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                ) : (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive('/login')}
                      tooltip="Login"
                      className="bg-royal-plum text-white hover:bg-raspberry-plum hover:text-white"
                    >
                      <Link to="/login" className="flex items-center gap-3">
                        <LogIn className="h-4 w-4 shrink-0" />
                        <span>Login</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
          </Sidebar>

          {/* Main Area */}
          <SidebarInset className="flex flex-1 flex-col overflow-hidden bg-midnight-violet">
            <main className="flex-1 overflow-auto p-4 flex items-center justify-center">
              <Routes>
                <Route path="/" element={<Navigate to="/posts" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/posts" element={<Posts />} />
                <Route
                  path="*"
                  element={<h2 className="text-xl font-bold text-white">404 - Page Not Found</h2>}
                />
              </Routes>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}