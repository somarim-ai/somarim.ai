class NetworkConfigAI:
    def generate(self, intent, vendor):
        """Generates network configurations for a specific vendor based on intent."""
        print(f"Generating {vendor} config for intent: {intent}")
        
        if vendor.lower() == "cisco":
            return self._generate_cisco_config(intent)
        elif vendor.lower() == "juniper":
            return self._generate_juniper_config(intent)
        else:
            return {"error": "Unsupported vendor"}

    def _generate_cisco_config(self, intent):
        # Placeholder for Cisco-specific config generation
        if intent["action"] == "describe_interface":
            interface = intent["params"]["interface"]
            description = intent["params"]["description"]
            return f"interface {interface}\ndescription \"{description}\""
        return "! No specific Cisco config generated"

    def _generate_juniper_config(self, intent):
        # Placeholder for Juniper-specific config generation
        if intent["action"] == "describe_interface":
            interface = intent["params"]["interface"]
            description = intent["params"]["description"]
            return f"set interfaces {interface} description \"{description}\""
        return "# No specific Juniper config generated"
