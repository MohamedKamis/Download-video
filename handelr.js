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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const python_shell_1 = require("python-shell");
const location_file_py = (pathFile) => {
    const f1 = path_1.default.resolve('./') + '/py/' + pathFile;
    const f2 = path_1.default.resolve('./') + '/src/py/' + pathFile;
    if (fs_1.default.existsSync(f1))
        return f1;
    if (fs_1.default.existsSync(f2))
        return f2;
    else
        return 'undfindefile';
};
const model_1 = require("./model");
const user = new model_1.DataUserModel();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user.index();
        res.send(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TU = {
            link_v: 'https://link12.com',
            ip_user: '123.12.5',
            data: '11/6/2023',
            time: '12:24',
        };
        const newuser = yield user.create(TU);
        res.send(newuser);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const scan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const newLink = link;
    const targt = req.body.targt;
    try {
        const options = {
            mode: 'text',
            pythonOptions: ['-u'],
            args: [link, targt],
        };
        const pyshell = yield new python_shell_1.PythonShell(location_file_py('script.py'), options);
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
        return res.send(null);
    }
});
const roter = (app) => {
    app.post('/', scan);
    app.get('/index', index);
    app.get('/create', create);
};
exports.default = roter;
