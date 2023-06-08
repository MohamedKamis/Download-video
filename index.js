"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
const body_parser_1 = __importDefault(require("body-parser"));
const python_shell_1 = require("python-shell");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = (8000);
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// const HTTPServer = http.createServer(app);
app.use((0, cors_1.default)({
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Methods',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    origin: '*',
}));
app.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const link = _req.body.link as string;
        return res.send({ data: true });
    }
    catch (error) {
        return res.send({ data: null });
    }
}));
app.get('/d', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = _req.query.filter;
        const type = _req.query.type;
        const link = _req.query.link;
        const options = {
            mode: 'text',
            pythonOptions: ['-u'],
            args: [link, type, filter],
        };
        const pyshell = yield new python_shell_1.PythonShell(path.resolve('./') + '/dist/py_download.py', options);
        yield pyshell.on('message', (message) => {
            return res.download(path.resolve('./') + '/dist/donlwdes/' + message);
            // return res.send(message);
        });
        yield pyshell.end((err) => {
            if (err)
                return res.send(err);
        });
        // return res.download(path.resolve('./')+'/src/donlwdes/x.mp4');
    }
    catch (error) {
        return res.send(error);
    }
}));
app.post('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const link = _req.body.link;
        const options = {
            mode: 'text',
            pythonOptions: ['-u'],
            args: link,
        };
        const pyshell = yield new python_shell_1.PythonShell(path.resolve('./') + '/dist/script.py', options);
        yield pyshell.on('message', (message) => {
            const data1 = message.split(' ');
            return res.send({ data: data1 });
        });
        yield pyshell.end((err) => {
            if (err)
                return res.send(null);
        });
        // return res.send('error');
    }
    catch (error) {
        return res.send(error);
    }
}));
app.listen(port, () => {
    console.log(`Your server starting on --> http://localhost:${port}`);
});
exports.default = { app };
