const { computeCausalMatrix } = require("../services/causal");

exports.getCausalLinks = async () => {
  const result = await computeCausalMatrix();
  return {
    timestamp: new Date().toISOString(),
    causalGraph: result,
  };
};

exports.getCausalAnomalies = async () => {
  return {
    timestamp: new Date().toISOString(),
    anomalies: [
      { id: "anomaly-1", description: "Unexpected correlation between events A and B", severity: "high" },
      { id: "anomaly-2", description: "Temporal loop detected in sector 7", severity: "critical" },
    ]
  };
};