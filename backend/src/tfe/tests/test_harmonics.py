import unittest
import numpy as np
from backend.src.tfe.core.harmonics import Harmonics

class TestHarmonics(unittest.TestCase):
    def test_calculate_harmonics(self):
        harmonics = Harmonics()
        preprocessed_signals = {
            'cpu_usage': 0.5,
            'memory_usage': 0.8
        }
        harmonic_vectors = harmonics.calculate(preprocessed_signals)

        # Check that the output is a dictionary
        self.assertIsInstance(harmonic_vectors, dict)

        # Check that the keys are the same as the input
        self.assertEqual(set(harmonic_vectors.keys()), set(preprocessed_signals.keys()))

        # Check that the values are numpy arrays
        for vector in harmonic_vectors.values():
            self.assertIsInstance(vector, np.ndarray)

        # Check that the vectors have the correct shape
        for vector in harmonic_vectors.values():
            self.assertEqual(vector.shape, (2,))

if __name__ == '__main__':
    unittest.main()
