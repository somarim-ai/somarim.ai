class CapacityPlanner:
    def predict_capacity_needs(self, growth_percentage, new_offices, new_apps):
        """Predicts bandwidth and hardware needs for the next 6 months."""
        # In a real implementation, this would be a more sophisticated model
        print("Predicting capacity needs...")
        
        # Simulate Gemini analysis
        recommendations = self._analyze_capacity(growth_percentage, new_offices, new_apps)
        
        return {"recommendations": recommendations}

    def _analyze_capacity(self, growth_percentage, new_offices, new_apps):
        # This is a simplified model. A real implementation would use machine learning.
        required_bandwidth = 1000  # Start with a baseline of 1Gbps
        required_bandwidth *= (1 + growth_percentage / 100)
        required_bandwidth += new_offices * 500  # Add 500Mbps for each new office
        required_bandwidth += len(new_apps) * 100 # Add 100Mbps for each new app

        recommendations = []
        if required_bandwidth > 10000:
            recommendations.append("Upgrade internet circuit to 10Gbps by Q3")
        elif required_bandwidth > 1000:
            recommendations.append("Upgrade internet circuit to 1Gbps by Q2")
        
        if new_offices > 0:
            recommendations.append(f"Add 2x 100G spine links for the {new_offices} new offices")
        
        return recommendations
