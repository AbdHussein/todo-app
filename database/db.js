const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<DB_USER>:<PASSWORD>@cluster0.3xayr.mongodb.net/<DB_NAME>?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true }, (err) =>{
    if(err){
        console.log("Error: ", err);
    }
    console.log("Connected To MongoDB Atlas");
 })


const todoSchema = mongoose.Schema({
    text : {type : String},
    complete : {type : Boolean}
});

const TodoModel = mongoose.model('todos', todoSchema);

module.exports.TodoModel = TodoModel;
