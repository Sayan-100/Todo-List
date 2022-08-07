const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const to_do = require('./models/to-do');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static('assests'));
app.get('/', function(req, res) {

    //res.send('<h1>cool it is running or is it ?</h1>')
    to_do.find({}, function(err, todos) {
        if (err) {
            console.log('Error in fetching todo from db');
            return;
        }

        return res.render('home', {
            title: "My todo List",
            todo_list: todos
        });
    });

});

app.post('/delete-todo', function(req, res) {
    let id = req.query.id;
    Object.keys(req.body).forEach(function(id) {
        to_do.findByIdAndDelete(id, function(err) {
            if (err) {
                console.log('Error in deleting a object form database');
                return;
            }
        });
        return res.redirect('back');
    })
});

//   to_do.findByIdAndDelete(id, function(err) {
//         if (err) {
//             console.log('Error in deleting a object form database');
//             return;
//         }

//         return res.redirect('back');
//})
app.post('/create_todo', function(req, res) {

    let date = req.body.DueDate;
    console.log(date);
    if (date == undefined) {
        date = "NO DEADLINE";
    }

    to_do.create({
        Description: req.body.Description,
        Category: req.body.Category,
        DueDate: date

    }, function(err, newTodo) {

        if (err) {
            console.log('Error in creating a todo');
            return;
        }

        console.log('**********', newTodo);
        return res.redirect('back');

    });
});


app.listen(port, function(err) {
    if (err) {
        console.log('Error in running server');
    }

    console.log('Yup! my server is running on port', port);
});