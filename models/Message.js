const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const messageSchema = new Schema(
	{
		sender: {
			type: String,
			required: true,
			trim: true,
		},
		recipient: {
			type: Types.ObjectId,
			ref: "User",
			required: true,
		},
		topic: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		isOpen: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = model("Message", messageSchema);
