var express = require('express');
const { signUp, login, createProj, saveProject, getProjects, getProject, deleteProject, editProject } = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    success: true,
    message: 'CompileX Backend API is running!',
    timestamp: new Date().toISOString(),
    cors: 'enabled'
  });
});

/* Test CORS endpoint */
router.get('/test-cors', function(req, res, next) {
  res.json({
    success: true,
    message: 'CORS is working!',
    origin: req.headers.origin || 'No origin header',
    timestamp: new Date().toISOString()
  });
});

router.post("/signUp", signUp); // signUp is the controller function
router.post("/login", login); 
router.post("/createProj", createProj); 
router.post("/saveProject", saveProject); 
router.post("/getProjects", getProjects); 
router.post("/getProject", getProject); 
router.post("/deleteProject", deleteProject); 
router.post("/editProject", editProject); 

module.exports = router;
