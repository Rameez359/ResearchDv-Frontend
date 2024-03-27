const express = require('express');
var path = require('path');

const app = express();

// view engine setup
app.use(express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=> {
    res.render('index');
})

app.get('/myProjects', (req, res)=> {
    res.render('myProjects');
})
app.get('/createProject', (req, res)=> {
    res.render('createProject');
})
app.get('/projectDetails', (req, res)=> {
    res.render('projectDetails');
})
app.get('/dataSet', (req, res)=> {
    res.render('dataSet');
})
app.get('/traine', (req, res)=> {
    res.render('traine');
})


app.listen('3001',()=>{console.log('Server is running on http://localhost:3000/')})