// scripts/verify-gemini-setup.js
const { GeminiSetupVerifier } = require('../src/gemini/GeminiSetupVerifier');
const verifier = new GeminiSetupVerifier();

async function verifyGeminiAutomation() {
    console.log('🔍 Verifying Gemini Automated Setup...');
    
    const results = await verifier.verifyAllSystems({
        domain: {
            url: 'https://somarim.com',
            expected: 'SOMARIM OS Landing Page',
            ssl: true,
            dns: true
        },
        aws: {
            s3: 'somarim.com',
            cloudfront: true,
            lambda: ['medical-engine', 'quantum-core'],
            api_gateway: 'somarim-api'
        },
        features: {
            landing_page: true,
            domain_connectivity: true,
            ssl_certificate: true
        }
    });

    if (results.success) {
        console.log('✅ Gemini has successfully configured somarim.com for production!');
        console.log('🌐 Your site is now live at: https://somarim.com');
    } else {
        console.log("Verification failed. Please check the logs for details.");
    }
}

verifyGeminiAutomation();