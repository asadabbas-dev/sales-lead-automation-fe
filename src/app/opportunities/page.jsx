"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import Opportunities from "@/components/opportunities/opportunities.component";

export default function Page() {
  return <Auth component={<Opportunities />} type={AUTH.PUBLIC} />;
}
