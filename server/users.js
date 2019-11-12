const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const User = new Schema({
     name: String,
     email:  String,
     balance: Number,
     total_accrued: Number,
     events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
 }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", User);
