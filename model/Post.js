const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    image_link: {
      type: String,
    },
    description: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Post", postSchema);
