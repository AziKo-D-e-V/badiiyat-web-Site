const { Router } = require("express");
const { register, login, profilEdit, changePassword } = require("../controllers/auth.controller");
const isAuth = require("../middlewares/isAuth");

const router = Router();

router.post("/auth/login", login);
router.post("/auth/register", register);
router.post("/auth/editprofil", profilEdit);
router.post("/auth/changepassword",changePassword);


module.exports = router;
