"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import OpportunityDetailPage from "@/components/opportunities/opportunity-detail-page/opportunity-detail-page.component";

export default function Page() {
  return <Auth component={<OpportunityDetailPage />} type={AUTH.PUBLIC} />;
}
