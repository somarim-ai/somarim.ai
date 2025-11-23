import apiClient from './apiClient';

class HealingService {
    baseUrl = '/api/v1/medical';

    async activateSomarimMode() {
        return await apiClient.post(`${this.baseUrl}/activate-somarim-mode`);
    }

    async performStrokeReversal(patientData, strokeType) {
        return await apiClient.post(`${this.baseUrl}/stroke-reversal`, { patientData, strokeType });
    }

    async repairBrainDamage(patientData, damageAssessment) {
        return await apiClient.post(`${this.baseUrl}/brain-repair`, { patientData, damageAssessment });
    }

    async performDeviceScan(deviceId, patientData, scanType) {
        return await apiClient.post(`${this.baseUrl}/device/scan`, { deviceId, patientData, scanType });
    }

    async executeDeviceTreatment(deviceId, patientData, protocol) {
        return await apiClient.post(`${this.baseUrl}/device/treatment`, { deviceId, patientData, treatmentProtocol: protocol });
    }
}

export const healingService = new HealingService();
