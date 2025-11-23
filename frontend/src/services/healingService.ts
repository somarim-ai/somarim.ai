class HealingService {
  private baseUrl = '/api/v1/medical';

  async activateSomarimMode(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/activate-somarim-mode`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  }

  async performStrokeReversal(patientData: any, strokeType: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/stroke-reversal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientData, strokeType })
    });
    return await response.json();
  }

  async repairBrainDamage(patientData: any, damageAssessment: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/brain-repair`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientData, damageAssessment })
    });
    return await response.json();
  }

  async performDeviceScan(deviceId: string, patientData: any, scanType: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/device/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, patientData, scanType })
    });
    return await response.json();
  }

  async executeDeviceTreatment(deviceId: string, patientData: any, protocol: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/device/treatment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, patientData, treatmentProtocol: protocol })
    });
    return await response.json();
  }
}

export const healingService = new HealingService();