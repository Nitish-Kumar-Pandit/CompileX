#!/bin/bash

# CompileX - Prepare for Render Deployment Script
# This script helps prepare your CompileX application for Render deployment

echo "🚀 Preparing CompileX for Render Deployment"
echo "=========================================="

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the CompileX root directory"
    exit 1
fi

echo "📋 Pre-deployment checklist:"
echo ""

# Check Node.js version
echo "🔍 Checking Node.js version..."
node_version=$(node --version 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Node.js version: $node_version"
else
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check if package.json files exist
echo "🔍 Checking package.json files..."
if [ -f "backend/package.json" ]; then
    echo "✅ Backend package.json found"
else
    echo "❌ Backend package.json not found"
    exit 1
fi

if [ -f "frontend/package.json" ]; then
    echo "✅ Frontend package.json found"
else
    echo "❌ Frontend package.json not found"
    exit 1
fi

# Check environment files
echo "🔍 Checking environment files..."
if [ -f "backend/.env.example" ]; then
    echo "✅ Backend .env.example found"
else
    echo "⚠️  Backend .env.example not found"
fi

if [ -f "frontend/.env.example" ]; then
    echo "✅ Frontend .env.example found"
else
    echo "⚠️  Frontend .env.example not found"
fi

# Test backend dependencies
echo "🔍 Testing backend dependencies..."
cd backend
if npm install --dry-run > /dev/null 2>&1; then
    echo "✅ Backend dependencies look good"
else
    echo "⚠️  Backend dependencies may have issues"
fi
cd ..

# Test frontend dependencies
echo "🔍 Testing frontend dependencies..."
cd frontend
if npm install --dry-run > /dev/null 2>&1; then
    echo "✅ Frontend dependencies look good"
else
    echo "⚠️  Frontend dependencies may have issues"
fi
cd ..

echo ""
echo "🎯 Next Steps for Render Deployment:"
echo "1. 📊 Set up MongoDB Atlas (https://cloud.mongodb.com/)"
echo "2. 🔙 Deploy Backend to Render as Web Service"
echo "3. 🎨 Deploy Frontend to Render as Static Site"
echo "4. 🔧 Configure environment variables"
echo "5. 🧪 Test your deployment"
echo ""
echo "📚 For detailed instructions, see:"
echo "   - DEPLOYMENT_GUIDE.md"
echo "   - deploy-to-render.md"
echo "   - RENDER_DEPLOYMENT_CHECKLIST.md"
echo ""
echo "✅ CompileX is ready for Render deployment!"
