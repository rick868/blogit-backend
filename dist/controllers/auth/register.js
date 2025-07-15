"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const auth_1 = require("../../utils/auth");
const register = async (req, res) => {
    try {
        const { firstName, lastName, userName, emailAddress, password } = req.body;
        const existingUser = await client_1.default.user.findFirst({
            where: { OR: [{ emailAddress }, { userName }] }
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Email or username already exists' });
        }
        const hashedPassword = await (0, auth_1.hashPassword)(password);
        const user = await client_1.default.user.create({
            data: { firstName, lastName, userName, emailAddress, password: hashedPassword }
        });
        const token = (0, auth_1.generateToken)(user.id);
        res.status(201).json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                emailAddress: user.emailAddress
            },
            token
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};
exports.register = register;
//# sourceMappingURL=register.js.map