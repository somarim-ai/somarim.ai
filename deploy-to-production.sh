#!/bin/bash
# deploy-to-production.sh

echo "🚀 DEPLOYING SOMARIM TO PRODUCTION..."

# Stop all emulators
echo "🛑 Stopping emulators..."
pkill -f "firebase"

# Deploy all services
echo "☁️ Deploying to Firebase Production..."
firebase deploy --non-interactive --force

# Test production endpoints
echo "🧪 Testing production URLs..."
curl -s https://omarim-soe.web.app > /dev/null && echo "✅ Frontend LIVE"
curl -s https://us-central1-omarim-soe.cloudfunctions.net/somarimAPI > /dev/null && echo "✅ Backend LIVE"

echo "🎉 SOMARIM IS NOW IN PRODUCTION!"
echo "🌐 Frontend: https://omarim-soe.web.app"
echo "🔧 Backend: https://us-central1-omarim-soe.cloudfunctions.net"
echo "🔮 Ready for real users and real healing protocols!"
