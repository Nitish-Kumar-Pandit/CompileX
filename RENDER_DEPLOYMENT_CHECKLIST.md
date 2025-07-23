# ✅ Render Deployment Checklist for CompileX

## 🔄 Pre-Deployment Setup

### 📊 Database Setup
- [ ] MongoDB Atlas account created
- [ ] Free cluster created
- [ ] Database user created with read/write permissions
- [ ] Network access configured (0.0.0.0/0 for all IPs)
- [ ] Connection string copied and ready

### 🔐 Security Preparation
- [ ] Strong JWT secret generated (32+ characters)
- [ ] MongoDB credentials secured
- [ ] GitHub repository is public or Render has access

## 🔙 Backend Deployment

### 📝 Render Backend Service Setup
- [ ] New Web Service created on Render
- [ ] GitHub repository connected
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Plan selected (Free tier)

### 🌍 Backend Environment Variables
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `10000`
- [ ] `MONGODB_URI` = Your MongoDB Atlas connection string
- [ ] `JWT_SECRET` = Your generated secure secret
- [ ] `CORS_ORIGIN` = Will update after frontend deployment
- [ ] `PISTON_API_URL` = `https://emkc.org/api/v2/piston`

### 🚀 Backend Deployment
- [ ] Service deployed successfully
- [ ] Build logs checked for errors
- [ ] Service URL noted: `https://______.onrender.com`
- [ ] Health check passed (visit service URL)

## 🎨 Frontend Deployment

### 📝 Render Frontend Service Setup
- [ ] New Static Site created on Render
- [ ] Same GitHub repository connected
- [ ] Root directory set to `frontend`
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`

### 🌍 Frontend Environment Variables
- [ ] `VITE_API_BASE_URL` = Your backend service URL
- [ ] `VITE_APP_NAME` = `CompileX`
- [ ] `VITE_APP_VERSION` = `1.0.0`
- [ ] `VITE_DEV_MODE` = `false`

### 🚀 Frontend Deployment
- [ ] Static site deployed successfully
- [ ] Build logs checked for errors
- [ ] Site URL noted: `https://______.onrender.com`
- [ ] Site loads correctly

## 🔄 Post-Deployment Configuration

### 🔗 Update Backend CORS
- [ ] Backend service environment variables accessed
- [ ] `CORS_ORIGIN` updated to frontend URL
- [ ] Backend service redeployed
- [ ] CORS configuration verified

## 🧪 Testing & Verification

### 🌐 Frontend Testing
- [ ] Frontend loads without errors
- [ ] All pages accessible (Home, About, Login, Signup)
- [ ] UI responsive on mobile and desktop
- [ ] No console errors in browser

### 🔙 Backend Testing
- [ ] API health check: `GET https://your-backend.onrender.com/`
- [ ] CORS working (no CORS errors in browser)
- [ ] Database connection successful

### 🔐 Authentication Testing
- [ ] User signup works
- [ ] User login works
- [ ] JWT tokens generated correctly
- [ ] Protected routes work

### 💻 Application Features
- [ ] Project creation works
- [ ] Project listing displays
- [ ] Code editor loads
- [ ] Code execution works
- [ ] Project saving works
- [ ] Project deletion works

## 🐛 Troubleshooting Checklist

### Common Issues
- [ ] CORS errors → Check CORS_ORIGIN matches frontend URL exactly
- [ ] Database errors → Verify MongoDB URI and network access
- [ ] Build failures → Check Node.js version and dependencies
- [ ] 404 errors → Verify routing configuration
- [ ] Slow responses → Normal for free tier after sleep

### Debug Steps
- [ ] Check Render service logs
- [ ] Verify all environment variables
- [ ] Test API endpoints manually
- [ ] Check browser console for errors
- [ ] Verify MongoDB Atlas connection

## 📊 Performance Optimization

### Free Tier Considerations
- [ ] Understand 15-minute sleep limitation
- [ ] First request after sleep takes ~30 seconds
- [ ] 750 hours/month limit per service
- [ ] Consider upgrading for production use

### Monitoring Setup
- [ ] Render dashboard bookmarked
- [ ] Log monitoring configured
- [ ] Error tracking considered
- [ ] Performance metrics reviewed

## 🎯 Production Readiness

### Security Review
- [ ] Environment variables secured
- [ ] No sensitive data in code
- [ ] HTTPS enabled (automatic on Render)
- [ ] Database access restricted

### Documentation
- [ ] Deployment guide reviewed
- [ ] Environment variables documented
- [ ] Service URLs documented
- [ ] Troubleshooting steps noted

## 🎉 Deployment Complete!

### Final Steps
- [ ] All tests passed
- [ ] Documentation updated
- [ ] Team notified of new URLs
- [ ] Monitoring configured
- [ ] Backup plan established

### Service URLs
- **Frontend**: https://______.onrender.com
- **Backend**: https://______.onrender.com
- **Database**: MongoDB Atlas cluster

---

**🎊 Congratulations! CompileX is now live on Render!**
