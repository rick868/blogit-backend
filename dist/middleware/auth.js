"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const auth_1 = require("../utils/auth");
const client_1 = __importDefault(require("../prisma/client"));
const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        const decoded = (0, auth_1.verifyToken)(token);
        const user = await client_1.default.user.findUnique({
            where: { id: decoded.userId }
        });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        console.error('Authentication error:', err);
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map