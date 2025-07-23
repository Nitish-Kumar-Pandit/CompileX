# CompileX - Online Code Editor & Compiler

A modern, full-stack web application for online code editing and compilation with support for multiple programming languages.

## 🚀 Features

- **Multi-Language Support**: Python, JavaScript, Java, C++, C, Bash
- **Real-time Code Editing**: Monaco Editor with syntax highlighting
- **Cloud Storage**: Save and manage your projects
- **User Authentication**: Secure JWT-based authentication
- **Responsive Design**: Works on desktop and mobile devices
- **Glassmorphism UI**: Modern, beautiful user interface

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Monaco Editor** for code editing
- **React Router** for navigation
- **React Icons** for UI icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled

## 📋 Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier available)
- GitHub account
- Render.com account (free tier available)

## 🔧 Development Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd CompileX
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

### 4. Database Setup
- Install MongoDB locally or use MongoDB Atlas
- Update the MONGODB_URI in backend/.env

## 🚀 Production Deployment (Render.com)

### Quick Deploy to Render

1. **Fork this repository** to your GitHub account

2. **Set up MongoDB Atlas:**
   - Create free cluster at [MongoDB Atlas](https://cloud.mongodb.com/)
   - Get connection string
   - Whitelist all IPs (0.0.0.0/0)

3. **Deploy Backend (Web Service):**
   - Connect GitHub repo to Render
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`

4. **Deploy Frontend (Static Site):**
   - Connect same GitHub repo to Render
   - Root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`

5. **Configure Environment Variables** (see below)

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🔒 Security Considerations

### Production Checklist:
- [ ] Change default JWT_SECRET
- [ ] Use strong MongoDB credentials
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Regular security updates

## 📊 Environment Variables

### Backend (Render Web Service)

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/compilex?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-secret-32-chars-min
CORS_ORIGIN=https://your-frontend.onrender.com
PISTON_API_URL=https://emkc.org/api/v2/piston
```

### Frontend (Render Static Site)

```env
VITE_API_BASE_URL=https://your-backend.onrender.com
VITE_APP_NAME=CompileX
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=false
```

## 📝 API Endpoints

- `POST /signUp` - User registration
- `POST /login` - User authentication
- `POST /createProj` - Create new project
- `POST /saveProject` - Save project code
- `POST /getProjects` - Get user projects
- `POST /getProject` - Get specific project
- `POST /deleteProject` - Delete project
- `POST /editProject` - Edit project details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting guide

---

**CompileX** - Transform your ideas into reality with the power of cloud-based coding! - Full-Stack Multi-Language Code IDE

CompileX is a powerful web-based integrated development environment (IDE) that supports multiple programming languages including Python, JavaScript, C, C++, Java, and Bash. Built with React frontend and Node.js backend, it provides a seamless coding experience with real-time code execution and project management.