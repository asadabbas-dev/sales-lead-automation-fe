"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import RunsPage from "@/components/runs/runs-page/runs-page.component";

export default function Page() {
  return <Auth component={<RunsPage />} type={AUTH.PUBLIC} />;
}
