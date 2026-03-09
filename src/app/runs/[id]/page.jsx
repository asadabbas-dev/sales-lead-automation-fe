"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import RunDetailPage from "@/components/runs/run-detail-page/run-detail-page.component";

export default function Page() {
  return <Auth component={<RunDetailPage />} type={AUTH.PUBLIC} />;
}
