const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({

    content : {
        type : String,
        required : true
    },
    options : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Option'
        }
    ]

},{
    timestamps : true
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;