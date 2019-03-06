let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let methodOverride = require('method-override');
let todoController = require('./controllers/todoController');

let app = express();
let urlendcodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

todoController(app); 

app.listen(3000);

