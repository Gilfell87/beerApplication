var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
      mail         : String,
      password     : String

});


score.statics.getUsers = function(callback) {

    User.find(function(err, docs){
        if(!err){
            callback(docs);
        }else{
            callback({}, err);
        }
    });


};

score.statics.registerUser = function(json, callback){

    User.create(
        json,
        function(err, doc){
            if (!err){


            }else{
                callback({}, err);
            }
    });

};





module.exports = User = mongoose.model('User', user);
