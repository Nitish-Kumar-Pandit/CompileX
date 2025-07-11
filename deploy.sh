#!/bin/bash

# CompileX Production Deployment Script

echo "🚀 Starting CompileX deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create production environment files if they don't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend environment file..."
    cp backend/.env.production backend/.env
    echo "⚠️  Please update backend/.env with your production values!"
fi

if [ ! -f "frontend/.env" ]; then
    echo "📝 Creating frontend environment file..."
    cp frontend/.env.production frontend/.env
    echo "⚠️  Please update frontend/.env with your production values!"
fi

# Build and start services
echo "🔨 Building and starting services..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ CompileX deployed successfully!"
    echo "🌐 Frontend: http://localhost"
    echo "🔧 Backend API: http://localhost:3000"
    echo "📊 MongoDB: localhost:27017"
else
    echo "❌ Deployment failed. Check logs with: docker-compose logs"
    exit 1
fi
