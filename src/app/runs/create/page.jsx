"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createRun } from "@/provider/features/runs/runs.slice";
import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const INITIAL_FORM = {
  workflow: "",
  source: "web",
  payload_json: "",
  result_json: "",
  status: "pending",
  priority: "",
  error: "",
};

export default function CreateRunPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading } = useSelector((state) => state?.runs?.createRun || {});

  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.workflow.trim()) {
      enqueueSnackbar("Workflow is required.", { variant: "error" });
      return;
    }

    if (!form.payload_json.trim()) {
      enqueueSnackbar("Payload JSON is required.", { variant: "error" });
      return;
    }

    let payloadParsed = {};
    let resultParsed = null;

    try {
      payloadParsed = JSON.parse(form.payload_json);
    } catch {
      enqueueSnackbar("Payload JSON is not valid JSON.", { variant: "error" });
      return;
    }

    if (form.result_json.trim()) {
      try {
        resultParsed = JSON.parse(form.result_json);
      } catch {
        enqueueSnackbar("Result JSON is not valid JSON.", { variant: "error" });
        return;
      }
    }

    const payload = {
      workflow: form.workflow.trim(),
      source: form.source || "web",
      payload_json: payloadParsed,
      result_json: resultParsed,
      status: form.status,
      priority: form.priority || null,
      error: form.error.trim() || null,
    };

    dispatch(
      createRun({
        payload,
        successCallBack: () => {
          setForm(INITIAL_FORM);
          router.push("/runs");
        },
      }),
    );
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex justify-center">
      <div className="w-full max-w-4xl px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-white/10 to-white/5 border border-gray-800 rounded-xl p-8"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-white">Create Run</h1>
            <p className="mt-1 text-sm text-slate-400">
              Manually trigger an automation run for a lead payload.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <CustomInput
              label="Workflow *"
              value={form.workflow}
              onChange={(e) => handleChange(e.target.value, "workflow")}
              placeholder="e.g. b2b-qualification"
              required
            />

            <CustomInput
              label="Source"
              value={form.source}
              onChange={(e) => handleChange(e.target.value, "source")}
              placeholder="web / api / system"
            />

            <CustomInput
              label="Payload JSON *"
              value={form.payload_json}
              onChange={(e) => handleChange(e.target.value, "payload_json")}
              textarea
              placeholder='{"email":"john@acme.com","phone":"+1234567890","budget":50000}'
              required
            />

            <CustomInput
              label="Result JSON (optional)"
              value={form.result_json}
              onChange={(e) => handleChange(e.target.value, "result_json")}
              textarea
              placeholder='{"qualified":true,"score":87,"reasons":["High budget"]}'
            />

            <SimpleSelect
              label="Status"
              name="status"
              value={form.status}
              onChange={(value) => handleChange(value, "status")}
              options={[
                { label: "Pending", value: "pending" },
                { label: "Success", value: "success" },
                { label: "Failed", value: "failed" },
              ]}
            />

            <SimpleSelect
              label="Priority (optional)"
              name="priority"
              value={form.priority}
              onChange={(value) => handleChange(value, "priority")}
              options={[
                { label: "None", value: "" },
                { label: "Low", value: "low" },
                { label: "Medium", value: "medium" },
                { label: "High", value: "high" },
              ]}
            />

            <div className="sm:col-span-2">
              <CustomInput
                label="Error Message (optional)"
                value={form.error}
                onChange={(e) => handleChange(e.target.value, "error")}
                placeholder="Error detail if status is failed"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <CustomButton
              text="Cancel"
              variant="ghost"
              onClick={() => router.push("/runs")}
            />
            <CustomButton
              text="Create Run"
              onClick={handleSubmit}
              loading={isLoading}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
