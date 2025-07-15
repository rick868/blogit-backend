"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./types/express.d.ts" />
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config"));
const auth_1 = __importDefault(require("./routes/auth"));
const blogs_1 = __importDefault(require("./routes/blogs"));
const users_1 = __importDefault(require("./routes/users"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/api/auth', auth_1.default);
app.use('/api/blogs', blogs_1.default);
app.use('/api/user', users_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
app.use(errorHandler_1.errorHandler);
app.listen(config_1.default.PORT, () => {
    console.log(`Server running on port ${config_1.default.PORT}`);
});
//# sourceMappingURL=index.js.map