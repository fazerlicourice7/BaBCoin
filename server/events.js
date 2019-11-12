const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const Event = new Schema({
     iCalID: String,
     approved: Boolean,
     rsvp_map: {type: Map, of: Boolean}, // user_email => RSVP_type (true - going, false - maybe)
     attended: [{type: Schema.Types.ObjectId, ref: 'User'}],
     datetime: String,
     name: String,
     description: String,
     creator: {type: Schema.Types.ObjectId, ref: 'User'}
 }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Event", Event);
