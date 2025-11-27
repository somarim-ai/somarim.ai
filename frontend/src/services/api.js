import environment from '../config/environment'

export class ApiService {
  static async sendToGemini(prompt, sessionId = 'default') {
    try {
      const response = await fetch(`${environment.apiUrl}${environment.geminiEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          sessionId,
          userId: 'user-' + Date.now()
        })
      })
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API call failed:', error)
      throw error
    }
  }
}
