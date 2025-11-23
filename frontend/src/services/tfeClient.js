/**
 * Handles backend communication with OMARIM SOE APIs
 */
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/somarim-soe/us-central1/app/api/v1";

export async function fetchBiogenesis() {
  const res = await fetch(`${API_BASE}/biogenesis`);
  return res.json();
}

export async function fetchCausalMatrix() {
  const res = await fetch(`${API_BASE}/causal`);
  return res.json();
}
