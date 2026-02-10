"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "./sidebar.context";

export function DashboardHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const { isCollapsed } = useSidebar();

  // Mock user data - replace with actual user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
  };

  const notifications = [
    { id: 1, title: "New run completed", time: "2m ago", unread: true },
    { id: 2, title: "System update available", time: "1h ago", unread: true },
    { id: 3, title: "Weekly report ready", time: "3h ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-white">AI Runs</h1>
            <p className="text-xs font-medium text-slate-400 mt-0.5">
              System activity, workflows, and AI execution history
            </p>
          </div>

          <div className="flex items-center gap-3">
          {/* Notifications */}
          <div ref={notificationsRef} className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl"
                  >
                    <div className="border-b border-white/10 p-4">
                      <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-slate-400">
                          No notifications
                        </div>
                      ) : (
                        <div className="divide-y divide-white/10">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 transition-colors hover:bg-white/5 ${
                                notification.unread ? "bg-white/5" : ""
                              }`}
                            >
                              <p className="text-sm font-medium text-white">
                                {notification.title}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">
                                {notification.time}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-4 w-4 text-slate-300" />
                )}
              </div>
              {!isCollapsed && (
                <>
                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </button>

            <AnimatePresence>
              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl"
                  >
                    <div className="border-b border-white/10 p-4">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="mt-1 text-xs text-slate-400">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white">
                        <User className="h-4 w-4" />
                        Profile
                      </button>
                      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white">
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                      <div className="my-1 h-px bg-white/10" />
                      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
