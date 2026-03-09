"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import Leads from "@/components/leads/leads.component";

export default function Page() {
  return <Auth component={<Leads />} type={AUTH.PUBLIC} />;
}
