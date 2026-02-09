const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface RunListItem {
  id: string;
  source: string;
  status: "success" | "failed";
  qualified: boolean | null;
  score: number | null;
  created_at: string;
  error: string | null;
}

export interface RunListResponse {
  runs: RunListItem[];
  total: number;
}

export interface RunDetailResponse {
  id: string;
  source: string;
  status: "success" | "failed";
  payload_json: Record<string, unknown>;
  result_json: {
    qualified: boolean;
    score: number;
    reasons: string[];
    lead: {
      name: string | null;
      email: string | null;
      phone: string | null;
      budget: number | null;
      intent: string | null;
      urgency: "low" | "medium" | "high" | null;
      industry: string | null;
    };
  } | null;
  error: string | null;
  created_at: string;
}

export async function fetchRuns(params?: {
  status?: "success" | "failed";
  qualified?: boolean;
  limit?: number;
  offset?: number;
}): Promise<RunListResponse> {
  const search = new URLSearchParams();
  if (params?.status) search.set("status", params.status);
  if (params?.qualified !== undefined) search.set("qualified", String(params.qualified));
  if (params?.limit) search.set("limit", String(params.limit));
  if (params?.offset) search.set("offset", String(params.offset));
  const url = `${API_BASE}/runs${search.toString() ? `?${search}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch runs: ${res.status}`);
  return res.json();
}

export async function fetchRun(id: string): Promise<RunDetailResponse> {
  const res = await fetch(`${API_BASE}/runs/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error("Run not found");
    throw new Error(`Failed to fetch run: ${res.status}`);
  }
  return res.json();
}
