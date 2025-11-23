const { MedicalProductionActivator } = require('../medical/ProductionActivator');
const { RealityActivator } = require('../quantum/RealityActivator');
const { DashboardDeployer } = require('../dashboard/DashboardDeployer');

class SystemActivator {
    constructor() {
        this.medicalActivator = new MedicalProductionActivator();
        this.realityActivator = new RealityActivator();
        this.dashboardDeployer = new DashboardDeployer();
    }

    async activateMedicalSystems(config) {
        console.log('Activating medical systems with config:', config);
        await this.medicalActivator.activateAllHealingProtocols();
    }

    async activateQuantumSystems(config) {
        console.log('Activating quantum systems with config:', config);
        await this.realityActivator.activateRealityManipulation();
    }

    async deployCinematicDashboard(config) {
        console.log('Deploying cinematic dashboard with config:', config);
        await this.dashboardDeployer.deployFullDashboard(config);
    }
}

module.exports = { SystemActivator };