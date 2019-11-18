const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const User = new Schema({
     name: {
         type: String,
         required: true
     },
     email:  {
         type: String,
         required: true
     },
     balance: {
         type: Number,
         required: true
     },
     total_accrued: {
         type: Number,
         required: true
     },
     events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
 }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", User);
