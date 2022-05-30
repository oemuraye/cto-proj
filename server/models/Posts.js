import mongoose from "mongoose";
// import moment from "moment";

const postSchema = new mongoose.Schema({
  current: {
    type: Number,
  },
  voltage: {
    type: Number,
  },
  power: {
    type: Number,
  },
  energy: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostReadings = mongoose.model("PostReadings", postSchema);

export default PostReadings;