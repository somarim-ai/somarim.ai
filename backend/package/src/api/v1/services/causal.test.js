
const { computeCausalMatrix } = require('./causal');

describe('Causal Service', () => {
  describe('computeCausalMatrix', () => {
    it('should return a 4x4 matrix', async () => {
      const matrix = await computeCausalMatrix();
      expect(Object.keys(matrix)).toHaveLength(4);
      Object.values(matrix).forEach(row => {
        expect(Object.keys(row)).toHaveLength(4);
      });
    });

    it('should have the correct systems as keys', async () => {
      const matrix = await computeCausalMatrix();
      const systems = ["Cognition", "Ethics", "Quantum", "BioGenesis"];
      expect(Object.keys(matrix)).toEqual(systems);
      Object.values(matrix).forEach(row => {
        expect(Object.keys(row)).toEqual(systems);
      });
    });

    it('should have diagonal elements equal to 0', async () => {
      const matrix = await computeCausalMatrix();
      const systems = ["Cognition", "Ethics", "Quantum", "BioGenesis"];
      systems.forEach(system => {
        expect(matrix[system][system]).toBe(0);
      });
    });

    it('should have off-diagonal elements as string representations of numbers', async () => {
      const matrix = await computeCausalMatrix();
      const systems = ["Cognition", "Ethics", "Quantum", "BioGenesis"];
      systems.forEach(a => {
        systems.forEach(b => {
          if (a !== b) {
            expect(typeof matrix[a][b]).toBe('string');
            expect(!isNaN(parseFloat(matrix[a][b]))).toBe(true);
          }
        });
      });
    });
  });
});
