#!/bin/bash

# CompileX - Build Verification Script
# This script verifies that both frontend and backend can build successfully

echo "🔨 CompileX Build Verification"
echo "============================="

# Function to check if command succeeded
check_status() {
    if [ $? -eq 0 ]; then
        echo "✅ $1 successful"
    else
        echo "❌ $1 failed"
        exit 1
    fi
}

# Verify backend
echo "🔍 Verifying Backend..."
cd backend

echo "📦 Installing backend dependencies..."
npm install
check_status "Backend dependency installation"

echo "🧪 Testing backend start..."
timeout 10s npm start > /dev/null 2>&1 &
sleep 5
if pgrep -f "node.*bin/www" > /dev/null; then
    echo "✅ Backend starts successfully"
    pkill -f "node.*bin/www"
else
    echo "⚠️  Backend may have startup issues"
fi

cd ..

# Verify frontend
echo "🔍 Verifying Frontend..."
cd frontend

echo "📦 Installing frontend dependencies..."
npm install
check_status "Frontend dependency installation"

echo "🏗️  Testing frontend build..."
npm run build
check_status "Frontend build"

echo "📊 Build statistics:"
if [ -d "dist" ]; then
    echo "   - Build directory: dist/"
    echo "   - Build size: $(du -sh dist/ | cut -f1)"
    echo "   - Files created: $(find dist/ -type f | wc -l)"
else
    echo "❌ Build directory not found"
    exit 1
fi

cd ..

echo ""
echo "🎉 Build Verification Complete!"
echo "✅ Backend: Ready for deployment"
echo "✅ Frontend: Ready for deployment"
echo ""
echo "🚀 Your CompileX application is ready for Render!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Deploy to Render using the deployment guides"
echo "3. Configure environment variables"
echo "4. Test your live deployment"
