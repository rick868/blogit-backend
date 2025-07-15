"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const auth_1 = require("../../utils/auth");
const login = async (req, res) => {
    try {
        const { emailAddressOrUserName, password } = req.body;
        const user = await client_1.default.user.findFirst({
            where: {
                OR: [
                    { emailAddress: emailAddressOrUserName },
                    { userName: emailAddressOrUserName }
                ]
            }
        });
        if (!user || !(await (0, auth_1.comparePasswords)(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = (0, auth_1.generateToken)(user.id);
        res.json({
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
        res.status(500).json({ error: 'Login failed' });
    }
};
exports.login = login;
//# sourceMappingURL=login.js.map