const express = require("express");
const {
	sendMessage,
	getIncomingMessages,
	setMessageOpen,
} = require("../controllers/messages");
const { checkIsAuth } = require("../middlewares/checkIsAuth");
const router = express.Router();

router.post("/send", checkIsAuth, sendMessage);
router.put("/setMessageOpen", checkIsAuth, setMessageOpen);
router.get("/getMessages", checkIsAuth, getIncomingMessages);

module.exports = router;
