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
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
const handelr_1 = __importDefault(require("./handelr"));
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
const location_file_py = (pathFile) => {
    const f1 = path.resolve('./') + '/py/' + pathFile;
    const f2 = path.resolve('./') + '/src/py/' + pathFile;
    if (fs_1.default.existsSync(f1))
        return f1;
    if (fs_1.default.existsSync(f2))
        return f2;
    else
        return 'undfindefile';
};
app.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.send({ data: true });
    }
    catch (error) {
        return res.send({ data: null });
    }
}));
function getLink(videoURL) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = (yield axios_1.default.get(videoURL));
            const link = res.data.split('hd_src:"')[1].split('",')[0];
            return {
                status: 'success',
                link: link,
            };
        }
        catch (error) {
            return {
                status: 'error',
                link: null,
            };
        }
    });
}
const axios_1 = __importDefault(require("axios"));
app.get('/test', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://www.facebook.com/100010375512071/videos/521266869779239/';
    // const url = _req.query.videoURL as string;
    const data = yield getLink(url);
    res.json(data);
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
        const pyshell = new python_shell_1.PythonShell(location_file_py('py_download.py'), options);
        yield pyshell.on('message', (message) => {
            try {
                res.download(path.resolve('./') + '/donlwdes/' + message);
                return;
            }
            catch (error) {
                res.download(path.resolve('./') + '/src/donlwdes/' + message);
                return;
            }
            // return res.send(message);
        });
        yield pyshell.end((err) => {
            if (err)
                return res.sendFile(path.resolve('./') + './err.html');
        });
        // return res.download(path.resolve('./')+'/src/donlwdes/x.mp4');
    }
    catch (error) {
        return res.send(error);
    }
}));
(0, handelr_1.default)(app);
app.listen(port, () => {
    console.log(`Your server starting on --> http://localhost:${port}`);
});
exports.default = app;
