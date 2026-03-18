"use client";

import Auth from "@/auth/auth.component";
import AUTH from "@/common/constants/auth.constant";
import SettingsPage from "@/components/settings/settings-page.component";

export default function Page() {
  return (
    <Auth component={<SettingsPage />} type={AUTH.PUBLIC} />
  );
}
