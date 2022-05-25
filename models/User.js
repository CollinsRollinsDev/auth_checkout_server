import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: [true, "Sorry, this username already exist."],
    },
    emailAddress: {
      type: String,
      required: [true, "Please provide an email address."],
      unique: [true, "Sorry, this email address already existed."],
    },
    password: {
      type: String,
      minLength: [7, "Password must be up to 7 and above."],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);