const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res) => {
	try {
		const { username } = req.body;
		if (!username) {
			return res
				.status(400)
				.json({ message: "Поле ввода не может быть пустым!" });
		}
		const userExists = await User.findOne({ username });
		if (userExists) {
			const payload = {
				id: userExists._id,
				username: userExists.username,
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "30d",
			});
			return res.status(200).json({
				user: userExists.username,
				token,
				message: "Добро пожаловать обратно!",
			});
		} else {
			const newUser = new User({
				username,
			});
			await newUser.save();
			const payload = {
				id: newUser._id,
				username: newUser.username,
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "30d",
			});
			return res
				.status(200)
				.json({ user: newUser, token, message: "Вы создали новый аккаунт" });
		}
	} catch (err) {
		return res.status(400).json({ message: "Произошла ошибка" });
	}
};

exports.getUsers = async (req, res) => {
	try {
		const userList = await User.find();
		return res.status(200).json(userList);
	} catch (err) {
		return res.status(400).json({ message: "Произошла ошибка" });
	}
};
