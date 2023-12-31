"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const redis = __importStar(require("redis"));
const PORT = 4000;
const LIST_KEY = 'messages';
const createApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const client = redis.createClient({ url: 'redis://localhost:6379' });
    yield client.connect();
    app.use(express_1.default.json());
    app.get('/', (req, res) => {
        res.status(200).send('Hello From Express');
    });
    app.post('/messages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { message } = req.body;
        yield client.lPush(LIST_KEY, message);
        res.status(200).send('Message added to list');
    }));
    app.get('/messages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield client.lRange(LIST_KEY, 0, -1);
        console.log(messages);
        res.status(200).send(messages);
    }));
    return app;
});
exports.createApp = createApp;
(0, exports.createApp)().then((app) => {
    app.listen(PORT, () => {
        console.log(`App listening at port ${PORT}`);
    });
});
