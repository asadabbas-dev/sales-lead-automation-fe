"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import DashboardPage from "@/components/dashboard/dashboard-page/dashboard-page.component";

export default function Page() {
  return <Auth component={<DashboardPage />} type={AUTH.PUBLIC} />;
}
