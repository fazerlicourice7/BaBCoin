const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const Event = new Schema({
     iCalID: {
         type: String,
         required: true
     },
     rsvp_map: {type: Map, of: Number}, // user_email => RSVP_type (1 - going, 2 - maybe, 3 - Not Going)
     attended: [{type: Schema.Types.ObjectId, ref: 'User'}],
     datetime: {
         type: String,
         required: true
     },
     name: {
         type: String,
         required: true
     },
     description: {
         type: String,
         required: true
     },
 }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Event", Event);
