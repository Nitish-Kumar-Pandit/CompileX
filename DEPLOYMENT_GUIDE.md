# 🚀 CompileX Deployment Guide for Render

## 📋 Overview
This guide will help you deploy both the frontend and backend of CompileX to Render.com as separate services. CompileX is now optimized for cloud deployment without Docker.

## 🔧 Prerequisites
1. GitHub account with your CompileX repository
2. Render.com account (free tier available)
3. MongoDB Atlas account (for database hosting)
4. Node.js 18+ (for local development)

## 📁 Project Structure

```
CompileX/
├── backend/          # Node.js/Express API
├── frontend/         # React/Vite application
├── DEPLOYMENT_GUIDE.md
└── README.md
```

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get your connection string

### Step 2: Note Your MongoDB URI
Format: `mongodb+srv://username:password@cluster.mongodb.net/compilex?retryWrites=true&w=majority`

## 🔙 Backend Deployment

### Step 1: Deploy Backend to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `backend` folder as root directory
5. Configure the service:
   - **Name**: `compilex-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 2: Set Environment Variables
Add these environment variables in Render:

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | Required |
| `PORT` | `10000` | Render default |
| `MONGODB_URI` | `your-mongodb-atlas-uri` | From Atlas |
| `JWT_SECRET` | `your-super-secure-jwt-secret` | Generate strong secret |
| `CORS_ORIGIN` | `https://your-frontend-url.onrender.com` | Update after frontend deployment |
| `PISTON_API_URL` | `https://emkc.org/api/v2/piston` | Code execution API |

### Step 3: Deploy Backend
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note your backend URL: `https://your-backend-name.onrender.com`

## 🎨 Frontend Deployment

### Step 1: Deploy Frontend to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Select the `frontend` folder as root directory
5. Configure the service:
   - **Name**: `compilex-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Step 2: Set Environment Variables
Add these environment variables in Render:

| Variable | Value | Notes |
|----------|-------|-------|
| `VITE_API_BASE_URL` | `https://your-backend-name.onrender.com` | Your backend URL |
| `VITE_APP_NAME` | `CompileX` | App name |
| `VITE_APP_VERSION` | `1.0.0` | Version |
| `VITE_DEV_MODE` | `false` | Production mode |

### Step 3: Deploy Frontend
1. Click "Create Static Site"
2. Wait for deployment to complete
3. Note your frontend URL: `https://your-frontend-name.onrender.com`

### Step 4: Verify Client-Side Routing
After deployment, test these URLs to ensure routing works:
- ✅ `https://your-frontend-name.onrender.com/` (Home page)
- ✅ `https://your-frontend-name.onrender.com/about` (About page)
- ✅ `https://your-frontend-name.onrender.com/editor/123` (Editor page)
- ✅ Refresh any page - should work without 404 errors

**Note**: The `_redirects` file in `public/` folder handles client-side routing for React Router.

## 🔄 Update CORS Configuration

### Step 1: Update Backend CORS
1. Go to your backend service in Render
2. Update the `CORS_ORIGIN` environment variable
3. Set it to your frontend URL: `https://your-frontend-name.onrender.com`
4. Redeploy the backend service

## ✅ Post-Deployment Checklist

### Test Your Deployment
1. **Frontend**: Visit your frontend URL
2. **Backend**: Test API endpoints at `https://your-backend-name.onrender.com`
3. **Database**: Verify MongoDB connection
4. **Authentication**: Test login/signup functionality
5. **Code Execution**: Test the code editor and execution

### Common Issues & Solutions
1. **CORS Errors**: Ensure CORS_ORIGIN matches your frontend URL exactly
2. **Database Connection**: Verify MongoDB URI and network access
3. **Environment Variables**: Double-check all required variables are set
4. **Build Failures**: Check build logs for missing dependencies

## 🔐 Security Considerations

### Production Security Checklist
- [ ] Strong JWT secret (32+ characters)
- [ ] MongoDB user with minimal permissions
- [ ] Environment variables properly set
- [ ] CORS configured for specific domain only
- [ ] HTTPS enabled (automatic on Render)

## 📊 Monitoring & Maintenance

### Render Features
- **Logs**: Monitor application logs in Render dashboard
- **Metrics**: View performance metrics
- **Auto-Deploy**: Automatic deployments on git push
- **Custom Domains**: Add your own domain (paid plans)

## 🆘 Troubleshooting

### Backend Issues
- Check logs in Render dashboard
- Verify environment variables
- Test MongoDB connection
- Check API endpoints manually

### Frontend Issues
- Verify build process completes
- Check environment variables
- Test API connectivity
- Verify routing works correctly

## 📞 Support
- Render Documentation: https://render.com/docs
- MongoDB Atlas Support: https://docs.atlas.mongodb.com/
- CompileX Issues: Create GitHub issue in your repository
