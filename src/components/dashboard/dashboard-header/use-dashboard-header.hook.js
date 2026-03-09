"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSidebar } from "../sidebar-context/sidebar-context.component";

export function useDashboardHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const { isCollapsed } = useSidebar();

  const user = useMemo(
    () => ({
      name: "John Doe",
      email: "john@example.com",
      avatar: null,
    }),
    []
  );

  const notifications = useMemo(
    () => [
      { id: 1, title: "New run completed", time: "2m ago", unread: true },
      {
        id: 2,
        title: "System update available",
        time: "1h ago",
        unread: true,
      },
      { id: 3, title: "Weekly report ready", time: "3h ago", unread: false },
    ],
    []
  );

  const unreadCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications]
  );

  const toggleProfile = useCallback(() => {
    setProfileOpen((prev) => !prev);
    setNotificationsOpen(false);
  }, []);

  const toggleNotifications = useCallback(() => {
    setNotificationsOpen((prev) => !prev);
    setProfileOpen(false);
  }, []);

  const closeProfile = useCallback(() => {
    setProfileOpen(false);
  }, []);

  const closeNotifications = useCallback(() => {
    setNotificationsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    profileOpen,
    notificationsOpen,
    profileRef,
    notificationsRef,
    isCollapsed,
    user,
    notifications,
    unreadCount,
    toggleProfile,
    toggleNotifications,
    closeProfile,
    closeNotifications,
  };
}
