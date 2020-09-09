import express from 'express';
import methodOverride from 'method-override';
import expressSanitized from 'express-sanitized';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

import { env } from './env';

const app = express();
mongoose.connect(env.mongoUrl);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitized());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    date: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);




app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { blogs });
        }
    });
});

app.get('/blogs/new', (req, res) => {
    res.render('new');
});

app.post('/blogs', (req, res) => {
    Blog.create(req.body.blog, (err: any, newBlog: any) => {
        if (err) {
            console.log(err);
        } else {
            console.log(newBlog);
            res.redirect('/blogs');
        }
    });
});

app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect('/404');
        } else {
            res.render('show', { foundBlog });
        }
    });
});

app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect('/404');
        } else {
            res.render('edit', { blog: foundBlog });
        }
    });
});

app.put('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err) {
            res.redirect('/404');
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});

app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/404');
        } else {
            res.redirect('/blogs');
        }
    });
});

app.get('/404', (req, res) => {
    res.render('404');
});

app.get('/*', (req, res) => {
    res.redirect('/404');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is Running...!');
});


