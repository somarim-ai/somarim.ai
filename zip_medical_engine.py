
import zipfile

with zipfile.ZipFile('backend/lambda/medical-engine.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
    zipf.write('backend/lambda/medical-engine.js', 'medical-engine.js')
