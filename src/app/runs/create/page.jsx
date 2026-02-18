"use client";

import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createRun } from "@/provider/features/runs/runs.slice";
import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import { useSnackbar } from "notistack";

export default function CreateRunPage() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading } = useSelector((state) => state?.runs?.createRun || {});

  const [form, setForm] = useState({
    workflow: "", // NEW required field
    source: "web",
    payload_json: "",
    result_json: "",
    status: "pending",
    error: "",
  });

  const handleChange = (value, name) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.workflow) {
      enqueueSnackbar("Workflow is required", { variant: "error" });
      return;
    }

    let payloadParsed = {};
    let resultParsed = null;

    try {
      payloadParsed = JSON.parse(form.payload_json || "{}");
    } catch {
      enqueueSnackbar("Invalid payload_json JSON", { variant: "error" });
      return;
    }

    if (form.result_json) {
      try {
        resultParsed = JSON.parse(form.result_json);
      } catch {
        enqueueSnackbar("Invalid result_json JSON", { variant: "error" });
        return;
      }
    }

    const payload = {
      workflow: form.workflow, // <-- send workflow to backend
      source: form.source,
      payload_json: payloadParsed,
      result_json: resultParsed,
      status: form.status,
      error: form.error || null,
      idempotency_key: crypto.randomUUID(),
    };

    dispatch(
      createRun({
        payload,
        successCallBack: () => {
          setForm({
            workflow: "",
            source: "web",
            payload_json: "",
            result_json: "",
            status: "pending",
            error: "",
          });
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
          className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-8"
        >
          <h1 className="text-2xl font-semibold text-white mb-6">Create Run</h1>

          <div className="grid grid-cols-2 gap-5">
            <CustomInput
              label="Workflow"
              value={form.workflow}
              onChange={(e) => handleChange(e.target.value, "workflow")}
              placeholder="Enter workflow name"
              required
            />

            <CustomInput
              label="Source"
              value={form.source}
              onChange={(e) => handleChange(e.target.value, "source")}
              placeholder="web / api / system"
            />

            <CustomInput
              label="Payload JSON"
              value={form.payload_json}
              onChange={(e) => handleChange(e.target.value, "payload_json")}
              textarea
              placeholder='{"leads":[{"email":"a@b.com"}]}'
              required
            />

            <CustomInput
              label="Result JSON (optional)"
              value={form.result_json}
              onChange={(e) => handleChange(e.target.value, "result_json")}
              textarea
              placeholder='{"qualified":true,"score":87}'
            />

            <SimpleSelect
              options={[
                { label: "pending", value: "pending" },
                { label: "success", value: "success" },
                { label: "failed", value: "failed" },
              ]}
              label="Status"
              value={form.status}
              onChange={(value) => handleChange(value, "status")}
              placeholder="pending / success / failed"
            />

            <CustomInput
              label="Error (optional)"
              value={form.error}
              onChange={(e) => handleChange(e.target.value, "error")}
              placeholder="Error message if failed"
            />
          </div>

          <div className="flex justify-end pt-4">
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
