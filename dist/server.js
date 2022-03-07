"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.get('/', function (_req, res) {
    res.send('Hello World');
});
app.get('/articles', function (_req, res) {
    try {
        res.send('this is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.get('/articles', function (_req, res) {
    // const weapon: Weapon = {
    //     name: _req.body.name,
    //     quantity: _req.body.quantity,
    //     id: 0,
    //     bullets: false
    // }
    try {
        res.send('this is the CREATE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.get('/articles/:id', function (_req, res) {
    // const article: Article = {
    //     id: req.params.id, 
    //     title: req.body.title,
    //     content: req.body.content
    //   }
    try {
        res.send('this is the EDIT route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.get('/articles/:id', function (_req, res) {
    try {
        res.send('this is the DELETE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.get('/articles/:id', (_req, res) => {
    try {
        res.send('this is the SHOW route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
