const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.get('/users', AdminAuth, UserController.index);
router.post('/user', UserController.create);
router.post("/login",UserController.login);

module.exports = router;