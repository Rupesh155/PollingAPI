const mongoose = require('mongoose');
const Question = require('../../../models/question');
const Option = require('../../../models/option');

// create an option for the question with a given id
module.exports.createNewOption = async function(req, res){

    try{
        // verify if a question exists
        let question = await Question.findById(req.params.id);

        if(question){
            // create an option
            let option = await Option.create({
                content : req.body.content,
                votes : req.body.votes,
                question : req.params.id,
            });

            option.link_vote = "https://pollingapi.live/api/v1/options/"+option.id+"/add_vote";
            option.save();
            
            question.options.push(option);
            question.save();

            return res.status(200).json({option, data:{
                "message" : "New Option created Successfully"
            }});
        }
        return res.json({question});

    }catch(err){
        console.log("******* Error in creating option ********* ",err);
        return res.status(500).json({
            data : { message : "Internal Server Error in creating an option" }
        });
    }

};
module.exports.addVote = async function(req,res){
    try{

        let id = req.params.id;

        // check if an option exists for a question, add a new vote by incrementing 1
        await Option.findByIdAndUpdate(id, { $inc : { votes : 1 }});

        return res.status(200).json({
            data : { message : "Voted successfully" }
        });
    }catch(err){
        console.log("******* Error in adding vote ********* ",err);
        return res.status(500).json({
            data : { message : "Internal Server Error in adding vote" }
        });  
    }
}

module.exports.deleteOption = async function(req, res){

    try{

        let id = req.params.id;

        // checking if option exists
        let option = await Option.findById(id);

        //checking if number of votes are > 0, if true, an option should not be deleted
        if(option.votes > 0){
            return res.status(404).json({
                data : { message : "Option can not be deleted, count of votes > 0 " }
            });
        }

        // deleting option from question.options array first
        await Question.findByIdAndUpdate(option.question, {$pull : {options : id}});

        // now deleting the option from the db
        await Option.findByIdAndDelete(id);

        return res.status(200).json({
            data : { message : "Option deleted sucessfully !" }
        });

    }catch(err){
        console.log("******* Error in deleting option ********* ",err);
        return res.status(500).json({
            data : { message : "Internal Server Error in deleting vote" }
        });  
    }

};