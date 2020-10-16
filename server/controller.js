const db = require('../database/db');

exports.createTodo = (req, res) => {
    const {text} = req.body;
    const newTodo = new db.TodoModel({
        text: text,
        complete : false
    })

    newTodo.save().then(data => {
        console.log('New Todo Created');
        res.status(201).send();
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while Saving to Database."
        })
    })
}

exports.deleteTodo = (req, res) => {
    db.TodoModel.deleteOne({_id: req.params.id}).then(result => {
        if(result.n > 0){
            res.status(200).send();
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while Saving to Database."
        })
    });
}

exports.completeTodo = (req, res) => {
    db.TodoModel.findByIdAndUpdate({_id: req.params.id}, {
        complete: true
    }).then(result => {
        if(result){
            res.status(200).send();
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while Saving to Database."
        })
    });
}

exports.getAllTodos = (req, res) => {
    db.TodoModel.find({}).then(result => {
        if(result.length > 0){
            res.status(200).send(result);
        } else {
            res.status(204).send({
                message : "No Todos found"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while Saving to Database."
        })
    })
}