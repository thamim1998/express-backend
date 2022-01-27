const Message = require("../model/Message");

const createMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(404).send(err);
  }
};

const getMessage = async (req, res) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(message);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = { createMessage, getMessage };
