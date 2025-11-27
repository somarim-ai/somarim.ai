import zipfile
import os

with zipfile.ZipFile('network_automation.zip', 'w') as zipf:
    zipf.write('backend/lambda_handlers/network_automation.py', 'lambda_handlers/network_automation.py')
    zipf.write('backend/src/somarim_net/main.py', 'src/somarim_net/main.py')
    zipf.write('backend/src/somarim_net/core/gemini_integration.py', 'src/somarim_net/core/gemini_integration.py')
    zipf.write('backend/src/somarim_net/monitoring/dashboard.py', 'src/somarim_net/monitoring/dashboard.py')
