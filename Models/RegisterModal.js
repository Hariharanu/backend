import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const registerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType:{
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

registerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// ✅ Method to compare entered password with hashed password
registerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Method to generate JWT token
registerSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, userName: this.userName, userType: this.userType },
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const RegisterModal = mongoose.model("Users", registerSchema);

export default RegisterModal;
