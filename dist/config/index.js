"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/blogit',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    SALT_ROUNDS: 10
};
//# sourceMappingURL=index.js.map