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
- MongoDB (local or cloud)
- Docker & Docker Compose (for containerized deployment)

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

## 🚀 Production Deployment

### Option 1: Docker Compose (Recommended)

1. **Prepare environment files:**
```bash
cp backend/.env.production backend/.env
cp frontend/.env.production frontend/.env
```

2. **Update environment variables:**
   - Backend: Update JWT_SECRET, MONGODB_URI, CORS_ORIGIN
   - Frontend: Update VITE_API_BASE_URL

3. **Deploy with Docker:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Manual Deployment

1. **Build Frontend:**
```bash
cd frontend
npm install
npm run build
```

2. **Deploy Backend:**
```bash
cd backend
npm install --production
npm start
```

3. **Serve Frontend:**
   - Use Nginx, Apache, or any static file server
   - Point to the `frontend/dist` directory

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

### Backend (.env)
```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/compilex
JWT_SECRET=your-super-secure-secret
CORS_ORIGIN=https://your-domain.com
```

### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_NAME=CompileX
VITE_APP_VERSION=1.0.0
```

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild services
docker-compose build --no-cache
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