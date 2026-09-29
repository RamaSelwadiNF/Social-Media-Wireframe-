import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import Search from "@/components/shadcn-space/blocks/topbar-06/header/search";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/lib/utils";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate("/login");
  };
  

  return (
    <header className="sticky top-0 z-50 border-b bg-card">
      <div className="mx-auto flex items-center justify-between gap-6 px-4 py-2.5 sm:px-6">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4">
          <Link to="/posts" className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Loop logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-midnight-violet">
              Loop
            </span>
          </Link>
        </div>
        <div>
          <Search />
        </div>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <Link to="/my-profile" title={currentUser.name}>
                <Avatar className="size-8 rounded-full border border-slate-200 transition-transform hover:scale-105">
                  <AvatarFallback className="bg-gradient-to-tr from-royal-plum to-raspberry-plum text-xs font-bold text-white">
                    {getInitials(currentUser.name)}
                  </AvatarFallback>
                </Avatar>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline ml-1.5">Logout</span>
              </Button>
            </>
          ) : (
            <Button asChild size="sm" className="bg-royal-plum hover:bg-raspberry-plum">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}