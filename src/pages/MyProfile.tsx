import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, type User } from "../context/AuthContext";
import { Mail, Phone, Globe, Building2, MapPin } from "lucide-react";

export default function MyProfile(): React.JSX.Element {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser?.id) return;

    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${currentUser.id}`)
      .then((res) => res.json())
      .then((data: User) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading user profile:", err);
        setLoading(false);
      });
  }, [currentUser?.id]);

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-white">
        <p className="text-lg font-semibold">You are not logged in.</p>
        <Link
          to="/login"
          className="mt-4 rounded-md bg-royal-plum px-4 py-2 text-sm font-medium text-white hover:bg-raspberry-plum"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="text-white text-sm">Loading profile...</div>;
  }

  const user = profile || currentUser;

  return (
    <div className="w-full max-w-6xl min-h-[85vh] flex flex-col justify-start rounded-3xl border border-slate-200 bg-white p-8 sm:p-14 shadow-2xl text-slate-900">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-slate-100 pb-8">
        <div className="flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-royal-plum to-raspberry-plum text-4xl sm:text-5xl font-black text-white shadow-lg shadow-royal-plum/20">
          {user.name.charAt(0)}
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-midnight-violet">
            {user.name}
          </h2>
          <p className="text-lg sm:text-xl font-medium text-raspberry-plum">
            @{user.username}
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Email */}
        <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition-all hover:border-slate-200 hover:bg-slate-50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-icy-blue/60 text-royal-plum">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</span>
            <p className="text-base sm:text-lg font-semibold text-slate-900 break-all">{user.email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition-all hover:border-slate-200 hover:bg-slate-50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-icy-blue/60 text-royal-plum">
            <Phone className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Phone</span>
            <p className="text-base sm:text-lg font-semibold text-slate-900">{user.phone}</p>
          </div>
        </div>

        {/* Website */}
        <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition-all hover:border-slate-200 hover:bg-slate-50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-icy-blue/60 text-royal-plum">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Website</span>
            <p className="text-base sm:text-lg font-semibold text-slate-900">{user.website}</p>
          </div>
        </div>

        {/* Company */}
        <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-6 transition-all hover:border-slate-200 hover:bg-slate-50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-icy-blue/60 text-royal-plum">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Company</span>
            <p className="text-base sm:text-lg font-semibold text-slate-900">{user.company?.name}</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-6 md:col-span-2 transition-all hover:border-slate-200 hover:bg-slate-50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-icy-blue/60 text-royal-plum mt-1">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Address</span>
            <p className="text-base sm:text-lg font-semibold text-slate-900">
              {user.address?.street}, {user.address?.suite}, {user.address?.city} ({user.address?.zipcode})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}