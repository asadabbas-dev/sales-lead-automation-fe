"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import CreateOpportunity from "@/components/opportunities/create-opportunity/create-opportunity.component";

export default function Page() {
  return <Auth component={<CreateOpportunity />} type={AUTH.PUBLIC} />;
}
