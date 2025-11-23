const testCommands = [
    "Deploy medical miracle engine with auto-scaling",
    "Create S3 bucket for patient healing data",
    "Setup CloudFront distribution for global access",
    "Show current AWS resource usage",
    "Activate quantum healing protocols",
    "Initialize reality control interface"
];

async function testSOMARIMCommands() {
    const API_URL = process.env.SOMARIM_API_URL;
    
    for (const command of testCommands) {
        console.log(`🧪 Testing: "${command}"`);
        
        try {
            const response = await fetch(`${API_URL}/command`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command })
            });
            
            const result = await response.json();
            console.log(`✅ Result:`, result.success ? 'SUCCESS' : 'FAILED');
            if (result.awsResults) {
                console.log(`   AWS Actions:`, Object.keys(result.awsResults));
            }
        } catch (error) {
            console.log(`❌ Error:`, error.message);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

testSOMARIMCommands();