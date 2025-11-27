const generateBtn = document.getElementById('generate-btn');
const intentTextarea = document.getElementById('intent');
const vendorSelect = document.getElementById('vendor');
const configOutput = document.getElementById('config-output');

generateBtn.addEventListener('click', async () => {
    const intent = intentTextarea.value;
    const vendor = vendorSelect.value;

    if (!intent) {
        alert('Please describe your desired network configuration.');
        return;
    }

    const apiUrl = 'YOUR_API_GATEWAY_URL/network'; // Replace with your actual API Gateway URL

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'generate_config',
                parameters: {
                    intent: intent,
                    vendor: vendor
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        configOutput.textContent = JSON.stringify(data.vendor_configs[vendor], null, 2);
    } catch (error) {
        console.error('Error:', error);
        configOutput.textContent = 'An error occurred while generating the configuration.';
    }
});
