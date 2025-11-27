
const { getCausalLinks, getCausalAnomalies } = require('./causal');

describe('Causal Controller', () => {
  describe('getCausalLinks', () => {
    it('should return a causal graph with a timestamp', async () => {
      const result = await getCausalLinks();
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('causalGraph');
    });
  });

  describe('getCausalAnomalies', () => {
    it('should return anomalies with a timestamp', async () => {
      const result = await getCausalAnomalies();
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('anomalies');
    });

    it('should return the correct anomalies', async () => {
      const result = await getCausalAnomalies();
      expect(result.anomalies).toEqual([
        { id: "anomaly-1", description: "Unexpected correlation between events A and B", severity: "high" },
        { id: "anomaly-2", description: "Temporal loop detected in sector 7", severity: "critical" },
      ]);
    });
  });
});
