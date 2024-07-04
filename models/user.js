//name and avatar
const mongoose = require("mongoose");
import validator from "validator";

//https://github.com/konsumer/mongoose-type-url for url//

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  avatar: {
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    }
  },
});

module.exports = mongoose.model("user", userSchema);
