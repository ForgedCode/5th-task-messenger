const User = require("../models/User");
const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
	try {
		const { recipient, topic, body } = req.body;
		const userExists = await User.findOne({ username: recipient });
		if (!userExists) {
			return res
				.status(400)
				.json({ message: "Такого пользователя не существует" });
		}
		const newMessage = new Message({
			sender: req.user.username,
			recipient: userExists._id,
			topic,
			body,
		});
		await newMessage.save();
		return res.status(200).json({ message: "Сообщение успешно отправлено" });
	} catch (err) {
		return res.status(400).json({ message: "Произошла ошибка" });
	}
};

exports.getIncomingMessages = async (req, res) => {
	try {
		const { id } = req.user;
		const messages = await Message.find({ recipient: id }).sort("-createdAt");
		return res.status(200).json(messages);
	} catch (err) {
		return res.status(400).json({ message: "Произошла ошибка" });
	}
};

exports.setMessageOpen = async (req, res) => {
	try {
		const { id } = req.body;
		await Message.findOneAndUpdate({ _id: id }, { $set: { isOpen: true } });
		return res.status(200);
	} catch (err) {
		return res.status(400).json({ message: "Произошла ошибка" });
	}
};
