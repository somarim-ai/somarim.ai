import numpy as np

class CausalityGraph:
    def build(self, flow_field):
        # Build a causality graph from the flow field
        # For simplicity, we'll use a threshold to determine causality
        causality_graph = np.where(flow_field > 0.5, 1, 0)
        return causality_graph
