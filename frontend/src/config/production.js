
// src/config/production.js
export const CONFIG = {
    // AWS Backend Endpoints
    AWS_API_GATEWAY: 'https://your-api.execute-api.us-east-1.amazonaws.com/production',
    AWS_LAMBDA_ENDPOINTS: {
        medical: 'https://lambda-medical.us-east-1.amazonaws.com',
        quantum: 'https://lambda-quantum.us-east-1.amazonaws.com',
        devops: 'https://lambda-devops.us-east-1.amazonaws.com'
    },
    
    // Gemini AI Integration
    GEMINI_API_KEY: process.env.REACT_APP_GEMINI_API_KEY,
    
    // Firebase (Frontend only)
    FIREBASE_CONFIG: {
        projectId: 'omarim-soe',
        appId: 'your-firebase-app-id'
    }
};
