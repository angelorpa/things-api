const mongoose = require("mongoose");
const { body } = require("express-validator");

const { Schema } = mongoose;

const fields = {
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 512,
  },
  done: {
    type: Boolean,
    required: true,
    default: false,
  },
};

const references = {
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
};

const sanatizers = [body("description").trim().escape()];

const task = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model("task", task),
  fields,
  references,
  sanatizers,
};
