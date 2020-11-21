const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let book = {
    title: '',
    author: ''
};

let response = {
    error: false,
    code: 200,
    message: ''
};

app.get('/', function (req, res) {
    response = {
        error: true,
        code: 200,
        message: 'Welcome to Library API'
    };

    res.send(response);
});

app.route('/book')
    .get(function (req, res) {
        response = {
            error: false,
            code: 200,
            message: ''
        };
    
        if (book.title === '' || book.author === '') {
            response = {
                error: true,
                code: 501,
                message: 'The book has not been created.'
            };
        } else {
            response = {
                error: false,
                code: 200,
                message: 'Response of the book',
                response: book
            };
        }
    
        res.send(response);
    })
    .post(function (req, res) {
        if (!req.body.title || !req.body.author) {
            response = {
                error: true,
                code: 502,
                message: 'The title and author fields are required.'
            };
        } else {
            if (book.title !== '' || book.author !== '') {
                response = {
                    error: true,
                    code: 503,
                    message: 'The book was created previously.',
                    response: book
                };
            } else {
                book = {
                    title: req.body.title,
                    author: req.body.author
                };
    
                response = {
                    error: false,
                    code: 200,
                    message: 'Book created.',
                    response: book
                };
            }
        }
    
        res.send(response);
    })
    .put(function (req, res) {
        if (!req.body.title || !req.body.author) {
            response = {
                error: true,
                code: 502,
                message: 'The title and author fields are required.'
            };
        } else {
            if (book.title === '' || book.author === '') {
                response = {
                    error: true,
                    code: 501,
                    message: 'The book has not been created.'
                };
            } else {
                book = {
                    title: req.body.title,
                    author: req.body.author
                };
    
                response = {
                    error: false,
                    code: 200,
                    message: 'Book updated.',
                    response: book
                };
            }
        }
    
        res.send(response);
    })
    .delete(function (req, res) {
        if (book.title === '' || book.author === '') {
            response = {
                error: true,
                code: 501,
                message: 'The book has not been created.'
            };
        } else {        
            response = {
                error: false,
                code: 200,
                message: 'Book deleted.'
            };
    
            book = {
                title: '',
                author: ''
            };
        }
    
        res.send(response);
    });

app.use(function(req, res, next) {
    response = {
        error: true,
        code: 404,
        massage: 'URL not found.'
    }

    res.status(404).send(response);
});

app.listen(8090, () => {
    console.log("Server is listening at 8090 port.");
});