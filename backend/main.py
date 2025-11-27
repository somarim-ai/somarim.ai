from src.somarim_net.main import SomarimNetworkAI
from src.somarim_net.security_engine import AISecurityEngine

# Initialize the AIOps engines
ai_orchestrator = SomarimNetworkAI()
ai_security = AISecurityEngine()

def execute_intent(command):
    """
    This is the single entry point for all natural language commands.
    It routes the command to the appropriate AIOps engine.
    """
    print(f"Executing intent: '{command}'")
    
    # In a real implementation, this would use Gemini to classify intent
    if "security" in command.lower() or "compliance" in command.lower():
        return ai_security.enforce_security_policy(command)
    elif "interface" in command.lower() or "router" in command.lower():
        return ai_orchestrator.natural_language_command(command)
    else:
        # As a default, we can use the general-purpose orchestrator
        return ai_orchestrator.natural_language_command(command)

# Example Usage:
if __name__ == "__main__":
    # Example 1: High-level network change
    print("--- Executing High-Level Network Change ---")
    execute_intent("Ensure all router interfaces connecting to servers have proper descriptions and security")
    
    # Example 2: Security compliance command
    print("\n--- Enforcing Security Compliance ---")
    execute_intent("Ensure PCI-DSS compliance across all network devices")
