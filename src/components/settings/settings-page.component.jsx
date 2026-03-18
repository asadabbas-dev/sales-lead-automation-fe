"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import { PageHeader } from "@/components/dashboard/page-header/page-header.component";
import { Target } from "lucide-react";
import useSettingsPage from "./use-settings-page.hook";

export default function SettingsPage() {
  const { register, handleSubmit, errors, loading, saving } = useSettingsPage();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-300 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <PageHeader
        title="Settings"
        subtitle="Ideal Customer Profile (ICP) used to score leads"
      />

      <form onSubmit={handleSubmit}>
        <section className="rounded-lg border border-white/10 bg-black/40 p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <Target className="h-4 w-4 text-yellow-300" />
            Company profile (ICP)
          </h2>
          <p className="mb-4 text-xs text-white/70">
            Configure your ideal customer profile. New runs will compute an ICP
            score (0–100) for each lead based on industry, budget, intent, and
            size match.
          </p>
          {errors?.root?.message && (
            <p className="mb-4 text-sm text-red-300">{errors.root.message}</p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <CustomInput
              name="industry"
              label="Industry"
              register={register}
              errors={errors}
              placeholder="e.g. SaaS, Healthcare"
            />
            <CustomInput
              name="company_size"
              label="Company size"
              register={register}
              errors={errors}
              placeholder="e.g. SME, Enterprise"
            />
            <CustomInput
              name="budget_min"
              type="number"
              label="Budget min"
              register={register}
              errors={errors}
              placeholder="e.g. 10000"
            />
            <CustomInput
              name="budget_max"
              type="number"
              label="Budget max"
              register={register}
              errors={errors}
              placeholder="e.g. 100000"
            />
            <CustomInput
              name="location"
              label="Location"
              register={register}
              errors={errors}
              placeholder="e.g. Global, US"
              className="sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <CustomInput
                name="intent_keywords"
                label="Intent keywords (comma-separated)"
                register={register}
                errors={errors}
                placeholder="e.g. enterprise, automation, integration"
              />
            </div>
          </div>
          <div className="mt-6">
            <CustomButton
              type="submit"
              text={saving ? "Saving" : "Save ICP"}
              variant="primary"
              size="sm"
              loading={saving}
            />
          </div>
        </section>
      </form>
    </div>
  );
}
