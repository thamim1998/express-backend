const mongoose = require("mongoose");
const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: [String],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
