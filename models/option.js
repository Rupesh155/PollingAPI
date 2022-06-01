const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({

    content : {
        type : String,
        required : true,
    },
    question : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Question',
    },
    votes : {
        type : Number,
        required : true
    },
    link_vote : {
        type : String,
    }

},{
    timestamps : true,
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option