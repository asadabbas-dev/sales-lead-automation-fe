"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import LeadDetailPage from "@/components/leads/lead-detail-page/lead-detail-page.component";

export default function Page() {
  return <Auth component={<LeadDetailPage />} type={AUTH.PUBLIC} />;
}
