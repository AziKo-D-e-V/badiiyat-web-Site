const { Router } = require("express");
const { authors, books } = require("../controllers/main.controller");

const router = new Router();

router.post("/api/createauthor", authors);
router.post("/api/createbook", books);

module.exports = router;
