let Router = require('express').Router();
const controller = require('./controller');

Router.get('/todos', controller.getAllTodos)
.post('/todo', controller.createTodo)
.patch('/complete/:id', controller.completeTodo)
.delete('/todo/:id', controller.deleteTodo);

module.exports = Router;