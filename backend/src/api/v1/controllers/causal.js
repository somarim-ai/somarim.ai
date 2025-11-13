const { computeCausalMatrix } = require("../services/causal");

exports.getCausalLinks = async () => {
  const result = await computeCausalMatrix();
  return {
    timestamp: new Date().toISOString(),
    causalGraph: result,
  };
};
