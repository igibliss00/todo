let bodyParser = require('body-parser');
let mongoose = require('mongoose');

mongoose.connect('mlab')
let todoSchema = new mongoose.Schema({
    item: String
});

let Todo = mongoose.model('Todo', todoSchema);

let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {

    app.get('/todo', (req, res) => {
        Todo.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        let newTodo = Todo(req.body).save((err, data) => {
            if (err) throw err;
            res.redirect('todo');
        });
    });

    app.delete('/todo/:id', (req, res) => {
        Todo.findByIdAndDelete(req.params.id, (err) => {
            if(err) throw err;
            res.redirect('/todo');
        });
    });
} 