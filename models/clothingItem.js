//name — the name of the clothing item, a required string from 2 to 30 characters
//weather — a required string that describes the weather type. Make sure it matches the weather type you defined in your React app ('hot', 'warm', and'cold'). Use the enum validator to implement the field.
//imageUrl — the picture of the clothing item, a required string for the image URL
//owner — a link to the item author's model of the ObjectId type, a required field
//likes — a list of users who liked the item, an ObjectId array with a reference to the user modal (empty by default)//
//createdAt — the item creation date, a field with the Date type and the default value Date.now

//https://github.com/konsumer/mongoose-type-url for url//

const mongoose = require("mongoose");
const validator = require("validator");

clothingSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  weather: { type: String, enum: ["hot", "warm", "cold"] },
  imageUrl: {type:String,
    required:true,
    validate: {
    validator(value) {
      return validator.isURL(value);
    },
    message: "You must enter a valid URL",
  },},
  owner: {
    type: mongoose.Schema.Types.ObjectId, // Changed type to ObjectId
    required: true,
    ref: 'user',
  },
  likes: { type: [mongoose.Schema.Types.ObjectId], ref: "user", default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("clothingItem", clothingSchema);
