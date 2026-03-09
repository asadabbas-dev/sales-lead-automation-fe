"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import CreateRun from "@/components/runs/create-run/create-run.component";

export default function Page() {
  return <Auth component={<CreateRun />} type={AUTH.PUBLIC} />;
}
