const UserModel = require("../.././models/users");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

module.exports = {
  createUser: async (args) => {
    const { email, password } = args.userInput;
    try {
      let user = await UserModel.findOne({ email: email });
      if (user) {
        throw new Error("User already exists");
      }
      let hashPassword = await bcryptjs.hash(password, 12);
      const newUser = new UserModel({
        email,
        password: hashPassword,
      });
      let result = await newUser.save();
      return { ...result._doc, password: null, id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async (args, req, res) => {
    const { email, password } = args;
    try {
      let User = await UserModel.findOne({ email: email });
      if (!User) {
        throw new Error("User does not exist");
      }

      let isPasswordEqual = await bcryptjs.compare(password, User.password);
      if (!isPasswordEqual) throw new Error("Password is incorrect");

      let token = jsonwebtoken.sign(
        {
          userId: User._id,
          email: User.email,
        },
        "supersecretkey",
        {
          expiresIn: "1h",
        }
      );
      return {
        token,
        tokenExpiration: 2,
        userId: User._id,
      };
    } catch (err) {
      throw err;
    }
  },
};
