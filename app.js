const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("common"));
const db = process.env.MONGO_URI;
const connector = async () => {
	await mongoose.connect(
		db,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => console.log("Соединение с MONGO: OK")
	);
};
connector();
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.listen(port, () => console.log(`Приложение запущено, порт: ${port}`));
