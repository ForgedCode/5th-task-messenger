const express = require("express");
const { auth, getUsers } = require("../controllers/users");
const router = express.Router();

router.post("/auth", auth);
router.get("/getUsers", getUsers);

module.exports = router;
