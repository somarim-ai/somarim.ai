import numpy as np

class FlowField:
    def generate(self, harmonic_vectors):
        # Generate a flow field from the harmonic vectors
        flow_field = np.zeros((len(harmonic_vectors), len(harmonic_vectors)))
        keys = list(harmonic_vectors.keys())
        for i in range(len(keys)):
            for j in range(i, len(keys)):
                vec1 = harmonic_vectors[keys[i]]
                vec2 = harmonic_vectors[keys[j]]
                # Calculate a simple interaction metric (e.g., dot product)
                interaction = np.dot(vec1, vec2)
                flow_field[i, j] = interaction
                flow_field[j, i] = interaction
        return flow_field
