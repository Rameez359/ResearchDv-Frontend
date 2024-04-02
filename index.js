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
    // const uid = req.params.uid;
    // res.render('myProjects', { uid: uid });
    res.render('myProjects');
})
app.get('/myProjects', (req, res)=> {
    res.render('myProjects');
})
app.get('/createProject', (req, res)=> {
    res.render('createProject');
})
app.get('/dashboard', (req, res)=> {
    res.render('dashboard');
})
app.get('/datasets', (req, res)=> {
    res.render('datasets');
})
app.get('/trainModels', (req, res)=> {
    res.render('trainModels');
})
app.get('/viewDatasets', (req, res)=> {
    res.render('viewDatasets');
})


app.listen('3001',()=>{console.log('Server is running on http://localhost:3001/')})