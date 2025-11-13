import { useEffect, useState } from "react";
import { fetchBiogenesis, fetchCausalMatrix } from "../services/tfeClient";

/**
 * Custom React hook that synchronizes flow state with backend
 */
export default function useFlowState(refreshRate = 3000) {
  const [bioData, setBioData] = useState(null);
  const [causalData, setCausalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        const bio = await fetchBiogenesis();
        const causal = await fetchCausalMatrix();
        if (active) {
          setBioData(bio.data);
          setCausalData(causal.result);
          setLoading(false);
        }
      } catch (e) {
        console.error("Flow state sync error:", e);
        if (active) {
            setLoading(false);
        }
      }
    }

    loadData();
    const interval = setInterval(loadData, refreshRate);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [refreshRate]);

  return { bioData, causalData, loading };
}
