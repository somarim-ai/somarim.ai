#!/usr/bin/env python
import zipfile
import os

with zipfile.ZipFile('backend/lambda.zip', 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, _, filenames in os.walk('backend'):
        for filename in filenames:
            if filename.endswith('.js') or filename == 'package.json':
                zf.write(os.path.join(root, filename),
                         os.path.relpath(os.path.join(root, filename), 'backend'))
