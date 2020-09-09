"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var method_override_1 = __importDefault(require("method-override"));
var express_sanitized_1 = __importDefault(require("express-sanitized"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var env_1 = require("./env");
var app = express_1.default();
mongoose_1.default.connect(env_1.env.mongoUrl);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_sanitized_1.default());
app.set('view engine', 'ejs');
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(method_override_1.default('_method'));
var blogSchema = new mongoose_1.default.Schema({
    title: String,
    image: String,
    body: String,
    date: { type: Date, default: Date.now },
});
var Blog = mongoose_1.default.model('Blog', blogSchema);
app.get('/', function (req, res) {
    res.redirect('/blogs');
});
app.get('/blogs', function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('index', { blogs: blogs });
        }
    });
});
app.get('/blogs/new', function (req, res) {
    res.render('new');
});
app.post('/blogs', function (req, res) {
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(newBlog);
            res.redirect('/blogs');
        }
    });
});
app.get('/blogs/:id', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect('/404');
        }
        else {
            res.render('show', { foundBlog: foundBlog });
        }
    });
});
app.get('/blogs/:id/edit', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect('/404');
        }
        else {
            res.render('edit', { blog: foundBlog });
        }
    });
});
app.put('/blogs/:id', function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            res.redirect('/404');
        }
        else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});
app.delete('/blogs/:id', function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/404');
        }
        else {
            res.redirect('/blogs');
        }
    });
});
app.get('/404', function (req, res) {
    res.render('404');
});
app.get('/*', function (req, res) {
    res.redirect('/404');
});
app.listen(process.env.PORT || 3000, function () {
    console.log('Server is Running...!');
});
