# PowerShell script to fix routing for Render deployment
Write-Host "🔧 Fixing client-side routing for Render deployment..." -ForegroundColor Green

# Clean and rebuild
Write-Host "📦 Building project..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}
npm run build

# Copy routing files manually
Write-Host "📁 Copying routing files..." -ForegroundColor Yellow

# Create the correct _redirects content
$redirectsContent = @"
# Handle client-side routing for React Router on Render.com
# All routes should serve index.html and let React Router handle routing

# Static assets - serve as-is
/assets/*  /assets/:splat  200
/favicon.svg  /favicon.svg  200
/vite.svg  /vite.svg  200

# All other routes - serve index.html for React Router
/*  /index.html  200
"@

# Write the _redirects file
$redirectsContent | Out-File -FilePath "dist\_redirects" -Encoding UTF8

# Copy 404.html
if (Test-Path "public\404.html") {
    Copy-Item "public\404.html" "dist\404.html" -Force
}

Write-Host "✅ Routing fix applied!" -ForegroundColor Green
Write-Host "📤 Now commit and push to GitHub to trigger Render deployment" -ForegroundColor Cyan

# Verify files
Write-Host "`n📋 Files in dist folder:" -ForegroundColor Yellow
Get-ChildItem "dist" | Format-Table Name, Length
