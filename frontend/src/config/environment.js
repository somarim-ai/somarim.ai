const config = {
  development: {
    apiUrl: 'http://localhost:5000',
    geminiEndpoint: '/gemini/brain'
  },
  production: {
    apiUrl: process.env.REACT_APP_API_URL || 'https://your-api-id.execute-api.us-east-1.amazonaws.com',
    geminiEndpoint: '/gemini/brain'
  }
}

export default config[process.env.NODE_ENV || 'development']
