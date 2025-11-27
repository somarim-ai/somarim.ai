import asyncio
from backend.psychic.neurosky import MindWaveMobile
from backend.psychic.emotion_detection import EmotionAI
from backend.psychic.thought_translation import ThoughtToConfig
import google.generativeai as genai

class PsychicNetworkInterface:
    def __init__(self):
        self.bci = MindWaveMobile()
        self.emotion_ai = EmotionAI()
        self.thought_translator = ThoughtToConfig()
        self.gemini = genai.GenerativeModel('gemini-ultra')
        
    async def read_operator_intent(self, brainwaves):
        """Read brainwaves and translate to network commands"""
        brainwaves = await self.bci.read_brainwaves()
        emotional_state = self.emotion_ai.analyze_emotional_context(brainwaves)
        
        network_intent = self.gemini.generate_content(f"""
        Translate these brainwaves and emotional state into network configuration intent.
        
        Brainwave Patterns: {brainwaves.pattern}
        Emotional State: {emotional_state}
        Operator Stress Level: {brainwaves.stress_index}
        
        Return the network changes the operator is intuitively wanting.
        """
        
        return self.thought_translator.manifest_intent(network_intent.text)
    
    def send_intuitive_feedback(self, network_state):
        """Send network status back through intuition"""
        intuitive_message = self.gemini.generate_content(f"""
        Convert this network state into intuitive feelings for the operator:
        {network_state}
        
        Make them feel the network's status emotionally and intuitively.
        """
        
        self.bci.send_intuitive_feeling(intuitive_message.text)
