import pytest
import asyncio
from backend.src.somarim_net.main import SomarimNetworkAI
from backend.src.somarim_net.core.gemini_integration import GeminiNetworkOrchestrator

class TestSOMARIMNetworkAutomation:
    
    @pytest.fixture
    def somarim_ai(self):
        return SomarimNetworkAI(GeminiNetworkOrchestrator("test-key"))
    
    @pytest.mark.asyncio
    async def test_config_generation(self, somarim_ai):
        """Test natural language to network config conversion"""
        result = await somarim_ai.generate_configuration(
            intent="Configure BGP between router A and B with route redistribution",
            vendor="cisco"
        )
        
        assert 'vendor_configs' in result
        assert 'cisco' in result['vendor_configs']
        assert 'validation_commands' in result
        
    @pytest.mark.asyncio 
    async def test_failure_prediction(self, somarim_ai):
        """Test network failure prediction"""
        telemetry = {
            "interface_errors": {"Gi0/1": 150, "Gi0/2": 25},
            "cpu_utilization": 85,
            "memory_usage": 78,
            "bgp_flaps": 3
        }
        
        result = await somarim_ai.predict_failures(telemetry)
        assert 'predicted_failures' in result
        assert 'pre_emptive_actions' in result
        
    @pytest.mark.asyncio
    async def test_troubleshooting(self, somarim_ai):
        """Test network troubleshooting"""
        result = await somarim_ai.troubleshoot_network(
            symptoms="Users reporting slow VoIP calls and packet loss"
        )
        
        assert 'root_cause' in result
        assert 'resolution_steps' in result
