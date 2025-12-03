#!/usr/bin/env python
import zipfile
import os

with zipfile.ZipFile('backend/lambda/medical-lambda.zip', 'w', zipfile.ZIP_DEFLATED) as zf:
    zf.write('backend/lambda/medical-engine.js', 'medical-engine.js')
    zf.write('backend/lambda/package.json', 'package.json')
