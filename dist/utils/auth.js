"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.comparePasswords = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const hashPassword = async (password) => {
    return await bcryptjs_1.default.hash(password, config_1.default.SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
const comparePasswords = async (password, hash) => {
    return await bcryptjs_1.default.compare(password, hash);
};
exports.comparePasswords = comparePasswords;
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, config_1.default.JWT_SECRET, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map