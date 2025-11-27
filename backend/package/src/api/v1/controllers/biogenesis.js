const { generateBiogenesisData } = require("../services/biogenesis");

exports.handleBiogenesis = async () => {
  const bioData = await generateBiogenesisData();
  return {
    timestamp: new Date().toISOString(),
    signature: "OMARIM-SOE::BIOGENESIS",
    bioData,
  };
};
