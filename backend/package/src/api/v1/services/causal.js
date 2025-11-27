exports.computeCausalMatrix = async () => {
  const systems = ["Cognition", "Ethics", "Quantum", "BioGenesis"];
  const matrix = {};

  systems.forEach((a) => {
    matrix[a] = {};
    systems.forEach((b) => {
      matrix[a][b] = a === b ? 0 : Math.random().toFixed(2);
    });
  });

  return matrix;
};
