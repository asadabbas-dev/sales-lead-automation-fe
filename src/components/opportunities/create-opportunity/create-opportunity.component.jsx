"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import TextArea from "@/common/components/text-area/text-area.component";
import { Briefcase } from "lucide-react";
import useCreateOpportunity from "./use-create-opportunity.hook";

export default function CreateOpportunity() {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setSelect,
    onSubmit,
    isLoading,
    sourceOptions,
    goBack,
  } = useCreateOpportunity();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <button
        type="button"
        onClick={goBack}
        className="text-sm text-white/70 hover:text-yellow-300 transition-colors flex items-center gap-1"
      >
        ← Back to Opportunities
      </button>

      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
          Create opportunity
        </h1>
        <p className="mt-1 text-sm text-white/70">
          Add a grant or funding opportunity. You can run AI analysis from the
          detail page after saving.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-white/10 bg-black/40 p-6 space-y-4"
      >
        <CustomInput
          label="Title"
          name="title"
          register={register}
          errors={errors}
          placeholder="e.g. SBIR Phase II – Clean Energy"
          isRequired
        />

        <SimpleSelect
          label="Source"
          name="source"
          value={watch("source")}
          onChange={setSelect("source")}
          options={sourceOptions}
          errors={errors}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <CustomInput
            label="Deadline (YYYY-MM-DD)"
            name="deadline"
            type="date"
            register={register}
            errors={errors}
            placeholder="Optional"
          />
          <CustomInput
            label="Funding value"
            name="funding_value"
            register={register}
            errors={errors}
            placeholder="e.g. 200000 or $200,000"
          />
        </div>

        <CustomInput
          label="Organization"
          name="organization"
          register={register}
          errors={errors}
          placeholder="e.g. DOE"
        />

        <CustomInput
          label="Location"
          name="location"
          register={register}
          errors={errors}
          placeholder="Optional"
        />

        <CustomInput
          label="URL"
          name="url"
          register={register}
          errors={errors}
          placeholder="https://..."
        />

        <CustomInput
          label="Industry tags (comma-separated)"
          name="industry_tags"
          register={register}
          errors={errors}
          placeholder="e.g. cleantech, energy, R&D"
        />

        <TextArea
          label="Description"
          name="description"
          register={register}
          errors={errors}
          placeholder="Optional summary or requirements..."
          minRows={4}
        />

        <div className="flex flex-wrap gap-3 pt-2">
          <CustomButton
            type="submit"
            text="Create opportunity"
            variant="primary"
            size="md"
            startIcon={<Briefcase className="h-4 w-4" />}
            disabled={isLoading}
            loading={isLoading}
          />
          <CustomButton
            type="button"
            text="Cancel"
            variant="ghost"
            size="md"
            onClick={goBack}
          />
        </div>
      </form>
    </div>
  );
}
