import asyncio

class MindWaveMobile:
    async def read_brainwaves(self):
        """Simulates reading brainwaves and returns a mock pattern."""
        print("Reading brainwaves...")
        await asyncio.sleep(1)  # Simulate async operation
        return type('Brainwaves', (object,), {
            'pattern': 'alpha_waves',
            'stress_index': 0.2
        })()