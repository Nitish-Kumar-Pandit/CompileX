# 🚀 Quick Deployment Steps for Render

## 📝 Environment Variables You Need to Set

### 🔙 Backend Environment Variables (Web Service)
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/compilex?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-at-least-32-characters-long
CORS_ORIGIN=https://your-frontend-name.onrender.com
PISTON_API_URL=https://emkc.org/api/v2/piston
```

### 🎨 Frontend Environment Variables (Static Site)
```
VITE_API_BASE_URL=https://your-backend-name.onrender.com
VITE_APP_NAME=CompileX
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=false
```

## 📋 Step-by-Step Deployment

### 1️⃣ Setup MongoDB Atlas
1. Create account at https://cloud.mongodb.com/
2. Create free cluster
3. Create database user
4. Whitelist all IPs (0.0.0.0/0)
5. Copy connection string

### 2️⃣ Deploy Backend First
1. Go to https://dashboard.render.com/
2. New → Web Service
3. Connect GitHub repo
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables above
8. Deploy and note the URL

### 3️⃣ Deploy Frontend Second
1. New → Static Site
2. Connect same GitHub repo
3. Root Directory: `frontend`
4. Build Command: `npm install && npm run build`
5. Publish Directory: `dist`
6. Add environment variables above (use backend URL)
7. Deploy and note the URL

### 4️⃣ Update Backend CORS
1. Go to backend service
2. Update CORS_ORIGIN to frontend URL
3. Redeploy backend

## ⚠️ Important Notes

### Security
- Generate a strong JWT secret (use a password generator)
- Keep environment variables secure
- Don't commit .env files to git

### URLs Format
- Backend: `https://your-backend-name.onrender.com`
- Frontend: `https://your-frontend-name.onrender.com`

### Free Tier Limitations
- Services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month limit per service

## 🔧 Testing Your Deployment

### Quick Tests
1. Visit frontend URL - should load CompileX
2. Try signup/login - should work
3. Create a project - should save to database
4. Run code - should execute properly

### API Test
Visit: `https://your-backend-name.onrender.com/`
Should return: "CompileX Backend API is running!"

## 🐛 Common Issues

### CORS Error
- Check CORS_ORIGIN matches frontend URL exactly
- Include https:// in the URL
- No trailing slash

### Database Connection Error
- Verify MongoDB URI is correct
- Check database user permissions
- Ensure IP whitelist includes 0.0.0.0/0

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in package.json
- Check build logs for specific errors

## 📞 Need Help?
- Check Render logs in dashboard
- Verify all environment variables
- Test locally first
- Check GitHub repository settings
